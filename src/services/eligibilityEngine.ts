import type { CitizenProfile, WelfareScheme, MatchResult, MatchReason, RequiredDocument } from '@/types/welfare';
import { welfareSchemes } from '@/data/schemes';

const COMMON_DOCUMENTS = ['Aadhaar Card', 'Bank Account Details'];

function checkAge(profile: CitizenProfile, scheme: WelfareScheme): MatchReason {
  const e = scheme.eligibility;
  if (e.minAge === undefined && e.maxAge === undefined) {
    return { label: 'Age requirement', met: true, detail: 'No age restriction for this scheme.' };
  }
  if (e.minAge !== undefined && profile.age < e.minAge) {
    return {
      label: 'Age requirement',
      met: false,
      detail: `Minimum age required is ${e.minAge} years. You are ${profile.age} years old.`,
    };
  }
  if (e.maxAge !== undefined && profile.age > e.maxAge) {
    return {
      label: 'Age requirement',
      met: false,
      detail: `Maximum age limit is ${e.maxAge} years. You are ${profile.age} years old.`,
    };
  }
  const parts: string[] = [];
  if (e.minAge !== undefined) parts.push(`minimum ${e.minAge}`);
  if (e.maxAge !== undefined) parts.push(`maximum ${e.maxAge}`);
  return {
    label: 'Age requirement',
    met: true,
    detail: `You are ${profile.age} years old, within the ${parts.join(' and ')} age range.`,
  };
}

function checkLocation(profile: CitizenProfile, scheme: WelfareScheme): MatchReason {
  const e = scheme.eligibility;
  if (e.states && e.states.length > 0) {
    if (!e.states.includes(profile.state)) {
      return {
        label: 'Location requirement',
        met: false,
        detail: `${scheme.name} is available in ${e.states.length} states. ${profile.state} may not be covered.`,
      };
    }
  }
  if (e.areaTypes && e.areaTypes.length > 0) {
    if (!e.areaTypes.includes(profile.areaType)) {
      return {
        label: 'Area type requirement',
        met: false,
        detail: `This scheme is for ${e.areaTypes.join('/')} areas. Your location is ${profile.areaType}.`,
      };
    }
  }
  if (e.states || e.areaTypes) {
    const parts: string[] = [];
    if (e.states) parts.push(profile.state);
    if (e.areaTypes) parts.push(profile.areaType);
    return {
      label: 'Location requirement',
      met: true,
      detail: `Your location (${parts.join(', ')}) is eligible for this scheme.`,
    };
  }
  return { label: 'Location requirement', met: true, detail: 'No location restriction for this scheme.' };
}

function checkOccupation(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  const e = scheme.eligibility;
  if (!e.occupations || e.occupations.length === 0) return null;
  if (e.occupations.includes(profile.occupation)) {
    return {
      label: 'Occupation match',
      met: true,
      detail: `Your occupation (${profile.occupation}) is one of the target groups for this scheme.`,
    };
  }
  return {
    label: 'Occupation match',
    met: false,
    detail: `This scheme targets: ${e.occupations.join(', ')}. Your occupation is ${profile.occupation}.`,
  };
}

function checkIncome(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  const e = scheme.eligibility;
  if (e.maxIncome === undefined || e.maxIncome === 0) {
    // maxIncome === 0 means "no income limit specified" (used by PM-KISAN where exclusion is institutional taxpayer)
    if (e.excludeInstitutionalTaxpayer) {
      return {
        label: 'Income criterion',
        met: true,
        detail: 'No income ceiling, but institutional landholders and income taxpayers are excluded.',
        requiresVerification: true,
      };
    }
    return null;
  }
  if (profile.householdIncome <= e.maxIncome) {
    return {
      label: 'Income requirement',
      met: true,
      detail: `Your annual household income (₹${profile.householdIncome.toLocaleString('en-IN')}) is within the limit of ₹${e.maxIncome.toLocaleString('en-IN')}.`,
    };
  }
  return {
    label: 'Income requirement',
    met: false,
    detail: `Your annual household income (₹${profile.householdIncome.toLocaleString('en-IN')}) exceeds the limit of ₹${e.maxIncome.toLocaleString('en-IN')}.`,
  };
}

function checkFarmer(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  if (!scheme.eligibility.requiresFarmer) return null;
  if (profile.isFarmer || profile.occupation === 'Farmer') {
    return {
      label: 'Farmer status',
      met: true,
      detail: 'Your profile indicates farmer status, which is required for this scheme.',
      requiresVerification: true,
    };
  }
  return {
    label: 'Farmer status',
    met: false,
    detail: 'This scheme requires farmer status with cultivable landholding.',
  };
}

function checkStudent(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  if (!scheme.eligibility.requiresStudent) return null;
  if (profile.isStudent || profile.occupation === 'Student') {
    return {
      label: 'Student status',
      met: true,
      detail: `Your profile indicates student status${profile.educationLevel ? ` (${profile.educationLevel})` : ''}.`,
    };
  }
  return {
    label: 'Student status',
    met: false,
    detail: 'This scheme is for students pursuing education.',
  };
}

function checkSeniorCitizen(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  if (!scheme.eligibility.requiresSeniorCitizen) return null;
  if (profile.isSeniorCitizen || profile.age >= 60) {
    return {
      label: 'Senior citizen status',
      met: true,
      detail: 'Your profile indicates senior citizen status (age 60+).',
    };
  }
  return {
    label: 'Senior citizen status',
    met: false,
    detail: 'This scheme is for senior citizens (age 60 and above).',
  };
}

function checkDisability(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  if (!scheme.eligibility.requiresDisability) return null;
  if (profile.hasDisability) {
    return {
      label: 'Disability status',
      met: true,
      detail: 'Your profile indicates a person with disability.',
      requiresVerification: true,
    };
  }
  return {
    label: 'Disability status',
    met: false,
    detail: 'This scheme is for persons with disabilities.',
  };
}

function checkWoman(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  if (!scheme.eligibility.requiresWoman) return null;
  if (profile.gender === 'Female' || profile.isWomanHeadedHousehold) {
    return {
      label: 'Women beneficiary criterion',
      met: true,
      detail: 'This scheme is for women applicants or women-headed households.',
    };
  }
  return {
    label: 'Women beneficiary criterion',
    met: false,
    detail: 'This scheme is for women or women-headed households.',
  };
}

function checkBpl(profile: CitizenProfile, scheme: WelfareScheme): MatchReason | null {
  if (!scheme.eligibility.requiresBpl) return null;
  if (profile.hasBplCard) {
    return {
      label: 'BPL status',
      met: true,
      detail: 'Your profile indicates a BPL card, which is required for this scheme.',
      requiresVerification: true,
    };
  }
  return {
    label: 'BPL status',
    met: false,
    detail: 'This scheme requires a BPL card or equivalent eligibility.',
  };
}

function buildDocuments(scheme: WelfareScheme): RequiredDocument[] {
  return scheme.requiredDocuments.map((name) => {
    const isCommon = COMMON_DOCUMENTS.includes(name);
    return {
      name,
      required: true,
      status: isCommon ? 'available' : 'missing',
    };
  });
}

function computeMatchScore(reasons: MatchReason[]): { score: number; level: 'high' | 'potential' | 'low' } {
  const applicable = reasons.filter((r) => r.label !== 'No restriction');
  const met = applicable.filter((r) => r.met).length;
  const total = applicable.length;
  if (total === 0) return { score: 50, level: 'potential' };
  const score = Math.round((met / total) * 100);
  let level: 'high' | 'potential' | 'low';
  if (score >= 75) level = 'high';
  else if (score >= 40) level = 'potential';
  else level = 'low';
  return { score, level };
}

export function checkSchemeEligibility(profile: CitizenProfile, scheme: WelfareScheme): MatchResult | null {
  const reasons: MatchReason[] = [];

  const ageReason = checkAge(profile, scheme);
  reasons.push(ageReason);

  const locReason = checkLocation(profile, scheme);
  reasons.push(locReason);

  const occReason = checkOccupation(profile, scheme);
  if (occReason) reasons.push(occReason);

  const incomeReason = checkIncome(profile, scheme);
  if (incomeReason) reasons.push(incomeReason);

  const farmerReason = checkFarmer(profile, scheme);
  if (farmerReason) reasons.push(farmerReason);

  const studentReason = checkStudent(profile, scheme);
  if (studentReason) reasons.push(studentReason);

  const seniorReason = checkSeniorCitizen(profile, scheme);
  if (seniorReason) reasons.push(seniorReason);

  const disabilityReason = checkDisability(profile, scheme);
  if (disabilityReason) reasons.push(disabilityReason);

  const womanReason = checkWoman(profile, scheme);
  if (womanReason) reasons.push(womanReason);

  const bplReason = checkBpl(profile, scheme);
  if (bplReason) reasons.push(bplReason);

  const { score, level } = computeMatchScore(reasons);

  // Exclude schemes with zero met conditions (unless no conditions apply at all)
  const applicable = reasons.filter((r) => r.label !== 'No restriction');
  const metCount = applicable.filter((r) => r.met).length;
  if (applicable.length > 0 && metCount === 0) return null;

  const missingEvidence = reasons
    .filter((r) => !r.met || r.requiresVerification)
    .map((r) => r.label);

  return {
    schemeId: scheme.id,
    matchLevel: level,
    matchScore: score,
    reasons,
    missingEvidence: missingEvidence.filter((m) => !m.includes('No restriction')),
    requiredDocuments: buildDocuments(scheme),
  };
}

export function findMatchingSchemes(profile: CitizenProfile): { scheme: WelfareScheme; result: MatchResult }[] {
  if (!isProfileComplete(profile)) return [];
  const results: { scheme: WelfareScheme; result: MatchResult }[] = [];
  for (const scheme of welfareSchemes) {
    const result = checkSchemeEligibility(profile, scheme);
    if (result && result.matchLevel !== 'low') {
      results.push({ scheme, result });
    } else if (result && result.matchLevel === 'low' && result.matchScore > 0) {
      // Include low matches in a separate bucket but still returned
      results.push({ scheme, result });
    }
  }
  results.sort((a, b) => b.result.matchScore - a.result.matchScore);
  return results;
}

export function isProfileComplete(profile: CitizenProfile): boolean {
  if (!profile.name.trim()) return false;
  if (!profile.age || profile.age <= 0) return false;
  if (!profile.gender) return false;
  if (!profile.state.trim()) return false;
  if (!profile.district.trim()) return false;
  if (!profile.areaType) return false;
  if (!profile.maritalStatus) return false;
  if (!profile.occupation.trim()) return false;
  if (!profile.familyMembers || profile.familyMembers < 1) return false;
  if (profile.householdIncome === undefined || profile.householdIncome === null || profile.householdIncome < 0) return false;
  if (profile.dependents === undefined || profile.dependents === null || profile.dependents < 0) return false;
  if (!profile.consent) return false;
  // Conditional validation
  if (profile.isFarmer && !profile.landholding) return false;
  if (profile.isStudent && !profile.educationLevel) return false;
  return true;
}

export function getSchemeById(id: string): WelfareScheme | undefined {
  return welfareSchemes.find((s) => s.id === id);
}

export function getMatchResultForScheme(profile: CitizenProfile, schemeId: string): MatchResult | null {
  const scheme = getSchemeById(schemeId);
  if (!scheme) return null;
  return checkSchemeEligibility(profile, scheme);
}
