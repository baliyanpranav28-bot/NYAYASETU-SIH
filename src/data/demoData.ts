export interface DemoScheme {
  id: string;
  name: string;
  department: string;
  category: string;
  shortDescription: string;
  benefit: string;
  matchLevel: 'high' | 'potential' | 'low';
  matchScore: number;
  matchReasons: { label: string; met: boolean; detail: string }[];
  missingEvidence: string[];
  documentsRequired: { name: string; required: boolean; uploaded: boolean; verified: boolean }[];
  applicationSteps: string[];
  tags: string[];
}

export const demoSchemes: DemoScheme[] = [
  {
    id: 'pmkisan',
    name: 'PM-KISAN Samman Nidhi',
    department: 'Ministry of Agriculture',
    category: 'Agriculture',
    shortDescription: 'Income support of ₹6,000/year for small and marginal farmer families holding cultivable land.',
    benefit: '₹6,000 per year in three equal installments directly to your bank account.',
    matchLevel: 'high',
    matchScore: 92,
    matchReasons: [
      { label: 'Age requirement', met: true, detail: 'You are 42, eligible as an adult landholder.' },
      { label: 'Income requirement', met: true, detail: 'Your household income ₹1,80,000/year is within the limit.' },
      { label: 'Location requirement', met: true, detail: 'Uttar Pradesh is a covered state.' },
      { label: 'Occupation: Farmer', met: true, detail: 'Your occupation matches the target group.' },
    ],
    missingEvidence: ['Income certificate'],
    documentsRequired: [
      { name: 'Aadhaar Card', required: true, uploaded: true, verified: true },
      { name: 'Bank Account Details', required: true, uploaded: true, verified: true },
      { name: 'Land Records', required: true, uploaded: true, verified: false },
      { name: 'Income Certificate', required: true, uploaded: false, verified: false },
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Department verification',
      'Decision',
      'Benefit delivery',
    ],
    tags: ['Farmer', 'Income Support', 'Central Government'],
  },
  {
    id: 'ayushman',
    name: 'Ayushman Bharat (PM-JAY)',
    department: 'Ministry of Health & Family Welfare',
    category: 'Health',
    shortDescription: 'Health coverage of up to ₹5 lakh per family per year for secondary and tertiary hospitalisation.',
    benefit: 'Up to ₹5,00,000 per year per family for hospitalisation at empanelled hospitals.',
    matchLevel: 'high',
    matchScore: 88,
    matchReasons: [
      { label: 'Income requirement', met: true, detail: 'Your household income qualifies under SECC criteria.' },
      { label: 'Location requirement', met: true, detail: 'Uttar Pradesh is a covered state.' },
      { label: 'Household size', met: true, detail: 'Family of 4 is eligible for coverage.' },
    ],
    missingEvidence: ['Ration card (for SECC verification)'],
    documentsRequired: [
      { name: 'Aadhaar Card', required: true, uploaded: true, verified: true },
      { name: 'Ration Card', required: true, uploaded: false, verified: false },
      { name: 'Bank Account Details', required: false, uploaded: true, verified: true },
      { name: 'Family ID', required: false, uploaded: false, verified: false },
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'SECC verification',
      'Decision',
      'Benefit delivery',
    ],
    tags: ['Health', 'Insurance', 'Central Government'],
  },
  {
    id: 'pmay',
    name: 'PM Awas Yojana — Gramin',
    department: 'Ministry of Rural Development',
    category: 'Housing',
    shortDescription: 'Financial assistance for construction of a pucca house for houseless households and those in kutcha houses.',
    benefit: 'Up to ₹1,20,000 for construction of a house in rural areas.',
    matchLevel: 'potential',
    matchScore: 71,
    matchReasons: [
      { label: 'Location requirement', met: true, detail: 'Rural Uttar Pradesh is eligible.' },
      { label: 'Income requirement', met: true, detail: 'Your income is within the eligibility threshold.' },
      { label: 'House ownership', met: false, detail: 'Verification needed — do you own a kutcha house or are houseless?' },
    ],
    missingEvidence: ['House ownership proof', 'Caste/income certificate'],
    documentsRequired: [
      { name: 'Aadhaar Card', required: true, uploaded: true, verified: true },
      { name: 'Land/House Ownership Document', required: true, uploaded: false, verified: false },
      { name: 'Bank Account Details', required: true, uploaded: true, verified: true },
      { name: 'Caste/Income Certificate', required: true, uploaded: false, verified: false },
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Gram Sabha verification',
      'Decision',
      'Benefit delivery',
    ],
    tags: ['Housing', 'Rural', 'Central Government'],
  },
  {
    id: 'mgnrega',
    name: 'MGNREGA',
    department: 'Ministry of Rural Development',
    category: 'Employment',
    shortDescription: 'Guarantee of 100 days of wage employment per year to rural households with adult members willing to do unskilled manual work.',
    benefit: 'Up to 100 days of wage employment per household per year at notified wage rates.',
    matchLevel: 'high',
    matchScore: 85,
    matchReasons: [
      { label: 'Location requirement', met: true, detail: 'Rural Uttar Pradesh is covered.' },
      { label: 'Age requirement', met: true, detail: 'You are 42 and eligible for wage employment.' },
      { label: 'Willingness for manual work', met: true, detail: 'Registered as willing worker.' },
    ],
    missingEvidence: [],
    documentsRequired: [
      { name: 'Aadhaar Card', required: true, uploaded: true, verified: true },
      { name: 'Bank Account Details', required: true, uploaded: true, verified: true },
      { name: 'Residence Proof', required: true, uploaded: true, verified: true },
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Job card issuance',
      'Work allocation',
      'Wage payment',
    ],
    tags: ['Employment', 'Rural', 'Central Government'],
  },
  {
    id: 'oldage',
    name: 'Indira Gandhi National Old Age Pension Scheme',
    department: 'Ministry of Rural Development',
    category: 'Pension',
    shortDescription: 'Monthly pension for BPL persons aged 60 years and above.',
    benefit: '₹200/month (age 60-79) or ₹500/month (age 80+) from central government, plus state contribution.',
    matchLevel: 'low',
    matchScore: 15,
    matchReasons: [
      { label: 'Age requirement', met: false, detail: 'You are 42, minimum age is 60.' },
      { label: 'Income requirement', met: true, detail: 'Your income may qualify under BPL criteria.' },
    ],
    missingEvidence: ['Age proof', 'BPL certificate'],
    documentsRequired: [
      { name: 'Aadhaar Card', required: true, uploaded: true, verified: true },
      { name: 'Age Proof', required: true, uploaded: true, verified: true },
      { name: 'BPL Certificate', required: true, uploaded: false, verified: false },
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Verification',
      'Decision',
      'Benefit delivery',
    ],
    tags: ['Pension', 'Senior Citizen', 'Central Government'],
  },
];

export interface DemoCitizen {
  name: string;
  age: number;
  gender: string;
  state: string;
  district: string;
  areaType: 'Rural' | 'Urban';
  occupation: string;
  maritalStatus: string;
  familyMembers: number;
  householdIncome: number;
  dependents: number;
  existingBenefits: string;
  categories: string[];
  documents: { name: string; required: boolean; uploaded: boolean; verified: boolean }[];
}

export const demoCitizen: DemoCitizen = {
  name: 'Ravi Kumar',
  age: 42,
  gender: 'Male',
  state: 'Uttar Pradesh',
  district: 'Varanasi',
  areaType: 'Rural',
  occupation: 'Farmer',
  maritalStatus: 'Married',
  familyMembers: 4,
  householdIncome: 180000,
  dependents: 3,
  existingBenefits: 'Ration card (PDS)',
  categories: ['Farmer'],
  documents: [
    { name: 'Identity document (Aadhaar)', required: true, uploaded: true, verified: true },
    { name: 'Bank details', required: true, uploaded: true, verified: true },
    { name: 'Address proof', required: true, uploaded: true, verified: true },
    { name: 'Income certificate', required: true, uploaded: false, verified: false },
  ],
};

export interface DemoApplication {
  id: string;
  schemeId: string;
  schemeName: string;
  status: 'Submitted' | 'Document Verification' | 'Department Review' | 'Decision' | 'Benefit Delivery';
  currentStep: number;
  steps: { label: string; status: 'done' | 'current' | 'pending'; detail: string }[];
  lastUpdated: string;
  nextAction: string;
  hasIssue: boolean;
  issueDetail: string;
  submittedDate: string;
}

export const demoApplications: DemoApplication[] = [
  {
    id: 'NY-2026-00125',
    schemeId: 'pmkisan',
    schemeName: 'PM-KISAN Samman Nidhi',
    status: 'Document Verification',
    currentStep: 1,
    steps: [
      { label: 'Application Submitted', status: 'done', detail: 'Submitted on 28 Aug 2026' },
      { label: 'Document Verification', status: 'current', detail: 'Your submitted income certificate is being verified.' },
      { label: 'Department Review', status: 'pending', detail: 'Awaiting document verification completion.' },
      { label: 'Decision', status: 'pending', detail: 'Pending' },
      { label: 'Benefit Delivery', status: 'pending', detail: 'Pending' },
    ],
    lastUpdated: 'Today',
    nextAction: 'Your submitted income certificate is being verified.',
    hasIssue: false,
    issueDetail: '',
    submittedDate: '28 Aug 2026',
  },
  {
    id: 'NY-2026-00131',
    schemeId: 'ayushman',
    schemeName: 'Ayushman Bharat (PM-JAY)',
    status: 'Document Verification',
    currentStep: 1,
    steps: [
      { label: 'Application Submitted', status: 'done', detail: 'Submitted on 30 Aug 2026' },
      { label: 'Document Verification', status: 'current', detail: 'Ration card could not be verified.' },
      { label: 'SECC Verification', status: 'pending', detail: 'Awaiting document verification.' },
      { label: 'Decision', status: 'pending', detail: 'Pending' },
      { label: 'Benefit Delivery', status: 'pending', detail: 'Pending' },
    ],
    lastUpdated: 'Yesterday',
    nextAction: 'Your ration card could not be verified. Please re-upload or fix the issue.',
    hasIssue: true,
    issueDetail: 'Income certificate could not be verified. The document uploaded was unclear or incomplete. Please re-upload a clear, complete copy.',
    submittedDate: '30 Aug 2026',
  },
];

export interface DemoComplaint {
  id: string;
  type: string;
  description: string;
  status: 'Under Review' | 'Resolved' | 'Escalated';
  lastUpdate: string;
  assignedDepartment: string;
  date: string;
}

export const demoComplaints: DemoComplaint[] = [
  {
    id: 'NY-COMP-2026-0042',
    type: 'Application delayed',
    description: 'My PM-KISAN application has been in document verification for over 15 days. No update has been provided.',
    status: 'Under Review',
    lastUpdate: '1 Sep 2026',
    assignedDepartment: 'Department of Agriculture, Varanasi',
    date: '30 Aug 2026',
  },
];

export interface CoverageGapRow {
  district: string;
  schemeId: string;
  schemeName: string;
  potentiallyEligible: number;
  applied: number;
  beneficiaries: number;
  gap: number;
}

export const coverageGapData: CoverageGapRow[] = [
  { district: 'Varanasi', schemeId: 'pmkisan', schemeName: 'PM-KISAN Samman Nidhi', potentiallyEligible: 1250, applied: 1002, beneficiaries: 960, gap: 248 },
  { district: 'Varanasi', schemeId: 'ayushman', schemeName: 'Ayushman Bharat (PM-JAY)', potentiallyEligible: 850, applied: 710, beneficiaries: 680, gap: 140 },
  { district: 'Gorakhpur', schemeId: 'pmay', schemeName: 'PM Awas Yojana — Gramin', potentiallyEligible: 980, applied: 620, beneficiaries: 540, gap: 360 },
  { district: 'Lucknow', schemeId: 'mgnrega', schemeName: 'MGNREGA', potentiallyEligible: 2100, applied: 1850, beneficiaries: 1820, gap: 250 },
  { district: 'Prayagraj', schemeId: 'oldage', schemeName: 'IGNOAPS', potentiallyEligible: 640, applied: 410, beneficiaries: 390, gap: 230 },
  { district: 'Kanpur', schemeId: 'pmkisan', schemeName: 'PM-KISAN Samman Nidhi', potentiallyEligible: 1520, applied: 1100, beneficiaries: 1050, gap: 420 },
];

export interface OverlapCase {
  id: string;
  householdId: string;
  schemeA: string;
  schemeB: string;
  reason: string;
  status: 'Review Required' | 'Reviewed';
}

export const overlapCases: OverlapCase[] = [
  {
    id: 'OV-001',
    householdId: 'HH-XX-3471',
    schemeA: 'PM-KISAN Samman Nidhi (Active)',
    schemeB: 'PM Awas Yojana — Gramin (Active)',
    reason: 'Both schemes list the same primary beneficiary. Possible overlapping income-support benefit rule.',
    status: 'Review Required',
  },
  {
    id: 'OV-002',
    householdId: 'HH-XX-5023',
    schemeA: 'Ayushman Bharat (Active)',
    schemeB: 'State Health Insurance Scheme (Active)',
    reason: 'Two health insurance benefits active for the same household. Possible duplicate health coverage.',
    status: 'Review Required',
  },
  {
    id: 'OV-003',
    householdId: 'HH-XX-6108',
    schemeA: 'MGNREGA (Active)',
    schemeB: 'PM-KISAN Samman Nidhi (Active)',
    reason: 'Wage employment and income support both active. Verify if landholding criteria are met.',
    status: 'Review Required',
  },
];

export interface OfficerStats {
  coverageGaps: number;
  pendingApplications: number;
  possibleOverlaps: number;
  openProblems: number;
  processingBottlenecks: number;
}

export const officerStats: OfficerStats = {
  coverageGaps: 248,
  pendingApplications: 156,
  possibleOverlaps: 12,
  openProblems: 34,
  processingBottlenecks: 73,
};

export interface OfficerBottleneck {
  stage: string;
  count: number;
  avgDays: number;
}

export const bottleneckData: OfficerBottleneck[] = [
  { stage: 'Document Verification', count: 73, avgDays: 12 },
  { stage: 'Department Review', count: 52, avgDays: 18 },
  { stage: 'Field Verification', count: 31, avgDays: 25 },
];
