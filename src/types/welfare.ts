export type AreaType = 'Rural' | 'Urban';
export type Gender = 'Male' | 'Female' | 'Other';

export interface CitizenProfile {
  name: string;
  age: number;
  gender: Gender;
  state: string;
  district: string;
  areaType: AreaType;
  occupation: string;
  maritalStatus: string;
  familyMembers: number;
  householdIncome: number;
  dependents: number;
  existingBenefits: string;
  categories: string[];
  // Conditional fields
  isFarmer: boolean;
  landholding?: string;
  isStudent: boolean;
  educationLevel?: string;
  hasDisability: boolean;
  isSeniorCitizen: boolean;
  isWomanHeadedHousehold: boolean;
  hasBplCard: boolean;
  consent: boolean;
}

export type MatchLevel = 'high' | 'potential' | 'low';

export interface MatchReason {
  label: string;
  met: boolean;
  detail: string;
  requiresVerification?: boolean;
}

export interface MatchResult {
  schemeId: string;
  matchLevel: MatchLevel;
  matchScore: number;
  reasons: MatchReason[];
  missingEvidence: string[];
  requiredDocuments: RequiredDocument[];
}

export interface RequiredDocument {
  name: string;
  required: boolean;
  status: 'available' | 'missing' | 'pending';
}

export interface WelfareScheme {
  id: string;
  name: string;
  ministry: string;
  department?: string;
  category: string;
  description: string;
  benefit: string;
  eligibility: {
    minAge?: number;
    maxAge?: number;
    occupations?: string[];
    states?: string[];
    areaTypes?: AreaType[];
    maxIncome?: number;
    requiresFarmer?: boolean;
    requiresStudent?: boolean;
    requiresSeniorCitizen?: boolean;
    requiresDisability?: boolean;
    requiresWoman?: boolean;
    requiresBpl?: boolean;
    excludeInstitutionalTaxpayer?: boolean;
    minFamilyMembers?: number;
  };
  requiredDocuments: string[];
  applicationSteps: string[];
  applicationUrl?: string;
  officialSource: string;
  tags: string[];
}

export interface CitizenApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  citizenName: string;
  status: 'Submitted' | 'Document Verification' | 'Department Review' | 'Decision' | 'Benefit Delivery';
  currentStep: number;
  steps: { label: string; status: 'done' | 'current' | 'pending'; detail: string }[];
  lastUpdated: string;
  nextAction: string;
  hasIssue: boolean;
  issueDetail: string;
  submittedDate: string;
}

export interface CitizenComplaint {
  id: string;
  type: string;
  description: string;
  status: 'Under Review' | 'Resolved' | 'Escalated';
  lastUpdate: string;
  assignedDepartment: string;
  date: string;
}
