import type { WelfareScheme } from '@/types/welfare';

export const welfareSchemes: WelfareScheme[] = [
  {
    id: 'pmkisan',
    name: 'PM-KISAN Samman Nidhi',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    department: 'Department of Agriculture and Farmers Welfare',
    category: 'Agriculture',
    description:
      'Income support of ₹6,000/year for small and marginal farmer families holding cultivable land.',
    benefit:
      '₹6,000 per year in three equal installments directly to the bank account of eligible farmer families.',
    eligibility: {
      minAge: 18,
      occupations: ['Farmer'],
      maxIncome: 0,
      excludeInstitutionalTaxpayer: true,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Land Records',
      'Income Certificate',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Department verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'https://pmkisan.gov.in/',
    officialSource: 'https://pmkisan.gov.in/',
    tags: ['Farmer', 'Income Support', 'Central Government'],
  },
  {
    id: 'ayushman',
    name: 'Ayushman Bharat (PM-JAY)',
    ministry: 'Ministry of Health and Family Welfare',
    department: 'National Health Authority',
    category: 'Health',
    description:
      'Health coverage of up to ₹5 lakh per family per year for secondary and tertiary hospitalisation.',
    benefit:
      'Up to ₹5,00,000 per year per family for hospitalisation expenses at empanelled hospitals.',
    eligibility: {
      maxIncome: 200000,
      states: [
        'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
        'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
      ],
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Ration Card',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'SECC verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'https://pmjay.gov.in/',
    officialSource: 'https://pmjay.gov.in/',
    tags: ['Health', 'Insurance', 'Central Government'],
  },
  {
    id: 'pmayg',
    name: 'Pradhan Mantri Awas Yojana — Gramin',
    ministry: 'Ministry of Rural Development',
    department: 'Department of Rural Development',
    category: 'Housing',
    description:
      'Financial assistance for construction of a pucca house for houseless households and those in kutcha houses in rural areas.',
    benefit:
      'Up to ₹1,20,000 for construction of a house in rural areas, paid in installments.',
    eligibility: {
      areaTypes: ['Rural'],
      maxIncome: 300000,
      states: [
        'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat',
        'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
        'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      ],
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Land/House Ownership Document',
      'Bank Account Details',
      'Income Certificate',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Gram Sabha verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'https://pmayg.nic.in/',
    officialSource: 'https://pmayg.nic.in/',
    tags: ['Housing', 'Rural', 'Central Government'],
  },
  {
    id: 'pmayu',
    name: 'Pradhan Mantri Awas Yojana — Urban',
    ministry: 'Ministry of Housing and Urban Affairs',
    department: 'Department of Housing and Urban Affairs',
    category: 'Housing',
    description:
      'Credit-linked subsidy for construction, enhancement, or purchase of houses for EWS/LIG families in urban areas.',
    benefit:
      'Interest subsidy of up to ₹2.67 lakh on home loans for EWS/LIG categories.',
    eligibility: {
      areaTypes: ['Urban'],
      maxIncome: 600000,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Income Certificate',
      'Bank Account Details',
      'Property Documents',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Urban local body verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'https://pmaymis.gov.in/',
    officialSource: 'https://pmaymis.gov.in/',
    tags: ['Housing', 'Urban', 'Central Government'],
  },
  {
    id: 'mgnrega',
    name: 'MGNREGA',
    ministry: 'Ministry of Rural Development',
    department: 'Department of Rural Development',
    category: 'Employment',
    description:
      'Guarantee of 100 days of wage employment per year to rural households with adult members willing to do unskilled manual work.',
    benefit:
      'Up to 100 days of wage employment per household per year at notified wage rates.',
    eligibility: {
      minAge: 18,
      areaTypes: ['Rural'],
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Residence Proof',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Job card issuance',
      'Work allocation',
      'Wage payment',
    ],
    applicationUrl: 'https://nrega.nic.in/',
    officialSource: 'https://nrega.nic.in/',
    tags: ['Employment', 'Rural', 'Central Government'],
  },
  {
    id: 'ujjwala',
    name: 'PM Ujjwala Yojana 2.0',
    ministry: 'Ministry of Petroleum and Natural Gas',
    department: 'Indian Oil Corporation / Oil Marketing Companies',
    category: 'Energy',
    description:
      'Free LPG connection to women from BPL households to replace unclean cooking fuels.',
    benefit:
      'Free LPG connection with first refill and stove, plus financial support for cylinder deposit.',
    eligibility: {
      requiresWoman: true,
      requiresBpl: true,
      minAge: 18,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Ration Card',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Distributor verification',
      'Connection release',
      'First refill delivery',
    ],
    applicationUrl: 'https://www.pmuy.gov.in/',
    officialSource: 'https://www.pmuy.gov.in/',
    tags: ['Energy', 'Women', 'Central Government'],
  },
  {
    id: 'svanidhi',
    name: 'PM SVANidhi',
    ministry: 'Ministry of Housing and Urban Affairs',
    department: 'Department of Housing and Urban Affairs',
    category: 'Microfinance',
    description:
      'Collateral-free working capital loan for street vendors to resume or start their business.',
    benefit:
      'Collateral-free working capital loan starting from ₹10,000, up to ₹50,000 in subsequent tranches.',
    eligibility: {
      occupations: ['Street Vendor', 'Small Business'],
      areaTypes: ['Urban'],
      minAge: 18,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Vending Certificate',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Loan processing',
      'Decision',
      'Loan disbursement',
    ],
    applicationUrl: 'https://pmsvanidhi.mohua.gov.in/',
    officialSource: 'https://pmsvanidhi.mohua.gov.in/',
    tags: ['Microfinance', 'Street Vendor', 'Urban', 'Central Government'],
  },
  {
    id: 'vishwakarma',
    name: 'PM Vishwakarma',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    department: 'Ministry of Finance',
    category: 'Skill Development',
    description:
      'Support for traditional artisans and craftspeople to improve quality, scale, and reach of their products.',
    benefit:
      'Recognition, toolkit incentive, skill training, collateral-free loan up to ₹3,00,000, and market linkage support.',
    eligibility: {
      occupations: ['Artisan/Craftsman', 'Self-employed'],
      minAge: 18,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Mobile Number',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Verification',
      'Recognition and training',
      'Loan disbursement',
    ],
    applicationUrl: 'https://pmvishwakarma.gov.in/',
    officialSource: 'https://pmvishwakarma.gov.in/',
    tags: ['Skill Development', 'Artisan', 'Central Government'],
  },
  {
    id: 'fasalbima',
    name: 'PM Fasal Bima Yojana',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    department: 'Department of Agriculture and Farmers Welfare',
    category: 'Insurance',
    description:
      'Comprehensive crop insurance against natural calamities, pests, and diseases.',
    benefit:
      'Crop insurance coverage with subsidized premium rates (up to 2% for kharif, 1.5% for rabi, 5% for horticulture crops).',
    eligibility: {
      occupations: ['Farmer'],
      minAge: 18,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
      'Sowing Certificate',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Loan/bank verification',
      'Premium payment',
      'Policy issuance',
    ],
    applicationUrl: 'https://pmfby.gov.in/',
    officialSource: 'https://pmfby.gov.in/',
    tags: ['Insurance', 'Farmer', 'Agriculture', 'Central Government'],
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card (KCC)',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    department: 'Department of Agriculture and Farmers Welfare',
    category: 'Credit',
    description:
      'Short-term credit for farmers for cultivation, post-harvest expenses, and investment in agricultural assets.',
    benefit:
      'Credit up to ₹3,00,000 at subsidized interest rate, with interest subvention of up to 2% and incentive of 3% for prompt repayment.',
    eligibility: {
      occupations: ['Farmer'],
      minAge: 18,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Land Records',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Bank verification',
      'Decision',
      'Card issuance',
    ],
    applicationUrl: 'https://www.myscheme.gov.in/schemes/kcc',
    officialSource: 'https://www.myscheme.gov.in/schemes/kcc',
    tags: ['Credit', 'Farmer', 'Agriculture', 'Central Government'],
  },
  {
    id: 'soilhealth',
    name: 'Soil Health Card Scheme',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    department: 'Department of Agriculture and Farmers Welfare',
    category: 'Agriculture',
    description:
      'Soil Health Cards to farmers providing nutrient status and recommendations for appropriate fertilizer application.',
    benefit:
      'Free soil testing and a Soil Health Card with crop-wise nutrient recommendations, issued every 2 years.',
    eligibility: {
      occupations: ['Farmer'],
      minAge: 18,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Land Records',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Soil sample collection',
      'Laboratory testing',
      'Card issuance',
    ],
    applicationUrl: 'https://soilhealth.dac.gov.in/',
    officialSource: 'https://soilhealth.dac.gov.in/',
    tags: ['Agriculture', 'Farmer', 'Central Government'],
  },
  {
    id: 'atalpension',
    name: 'Atal Pension Yojana',
    ministry: 'Ministry of Finance',
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    category: 'Pension',
    description:
      'Defined pension scheme for unorganised sector workers, guaranteeing a minimum pension after age 60.',
    benefit:
      'Guaranteed pension of ₹1,000 to ₹5,000 per month starting at age 60, with government co-contribution for eligible subscribers.',
    eligibility: {
      minAge: 18,
      maxAge: 40,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Mobile Number',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Bank/Post office processing',
      'Enrollment',
      'Monthly contribution',
    ],
    applicationUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    officialSource: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    tags: ['Pension', 'Central Government'],
  },
  {
    id: 'pmjjby',
    name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
    ministry: 'Ministry of Finance',
    department: 'Department of Financial Services',
    category: 'Insurance',
    description:
      'Life insurance cover against death for savings bank account holders.',
    benefit:
      'Life insurance cover of ₹2,00,000 at a premium of ₹436/year.',
    eligibility: {
      minAge: 18,
      maxAge: 50,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
      'Nominee Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Bank processing',
      'Premium deduction',
      'Coverage start',
    ],
    applicationUrl: 'https://www.jansuraksha.gov.in/',
    officialSource: 'https://www.jansuraksha.gov.in/',
    tags: ['Insurance', 'Life Cover', 'Central Government'],
  },
  {
    id: 'pmsby',
    name: 'Pradhan Mantri Suraksha Bima Yojana',
    ministry: 'Ministry of Finance',
    department: 'Department of Financial Services',
    category: 'Insurance',
    description:
      'Accidental death and disability cover for savings bank account holders.',
    benefit:
      'Accidental death and full disability cover of ₹2,00,000 at a premium of ₹20/year.',
    eligibility: {
      minAge: 18,
      maxAge: 70,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Bank processing',
      'Premium deduction',
      'Coverage start',
    ],
    applicationUrl: 'https://www.jansuraksha.gov.in/',
    officialSource: 'https://www.jansuraksha.gov.in/',
    tags: ['Insurance', 'Accident Cover', 'Central Government'],
  },
  {
    id: 'sukanya',
    name: 'Sukanya Samriddhi Yojana',
    ministry: 'Ministry of Finance',
    department: 'Department of Financial Services',
    category: 'Savings',
    description:
      'Small savings scheme for the girl child to encourage education and marriage expenses.',
    benefit:
      'Savings account with high interest rate (currently 8.2%), tax deduction under Section 80C, and tax-free maturity.',
    eligibility: {
      minAge: 0,
      maxAge: 10,
      requiresWoman: true,
    },
    requiredDocuments: [
      'Girl Child Birth Certificate',
      'Guardian Aadhaar Card',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Visit post office or bank',
      'Account opening',
      'Deposit',
      'Maturity',
    ],
    applicationUrl: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
    officialSource: 'https://www.india.gov.in/sukanya-samriddhi-yojna',
    tags: ['Savings', 'Girl Child', 'Central Government'],
  },
  {
    id: 'nsp',
    name: 'National Scholarship Portal (NSP)',
    ministry: 'Ministry of Education',
    department: 'Department of Higher Education',
    category: 'Education',
    description:
      'Unified scholarship portal for pre-matric, post-matric, merit-cum-means, and higher education scholarships.',
    benefit:
      'Scholarship amounts varying from ₹1,000 to ₹20,000 per year depending on the scholarship scheme and education level.',
    eligibility: {
      requiresStudent: true,
      maxIncome: 800000,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Income Certificate',
      'Caste Certificate (if applicable)',
      'Educational Certificates',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Register on NSP portal',
      'Fill application',
      'Institute verification',
      'Scholarship disbursal',
    ],
    applicationUrl: 'https://scholarships.gov.in/',
    officialSource: 'https://scholarships.gov.in/',
    tags: ['Education', 'Scholarship', 'Student', 'Central Government'],
  },
  {
    id: 'nsp-up',
    name: 'UP Pre-Matric & Post-Matric Scholarship',
    ministry: 'Government of Uttar Pradesh',
    department: 'Department of Social Welfare, Uttar Pradesh',
    category: 'Education',
    description:
      'Scholarships for SC/ST/OBC/General category students in Uttar Pradesh for pre-matric and post-matric studies.',
    benefit:
      'Scholarship amounts from ₹150 to ₹7,000+ per year depending on category and education level.',
    eligibility: {
      requiresStudent: true,
      states: ['Uttar Pradesh'],
      maxIncome: 200000,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Income Certificate',
      'Caste Certificate (if applicable)',
      'Educational Certificates',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Register on UP scholarship portal',
      'Fill application',
      'Institute verification',
      'Scholarship disbursal',
    ],
    applicationUrl: 'https://scholarship.up.gov.in/',
    officialSource: 'https://scholarship.up.gov.in/',
    tags: ['Education', 'Scholarship', 'Student', 'State Government', 'Uttar Pradesh'],
  },
  {
    id: 'ignoaps',
    name: 'Indira Gandhi National Old Age Pension Scheme (IGNOAPS)',
    ministry: 'Ministry of Rural Development',
    department: 'Department of Rural Development',
    category: 'Pension',
    description:
      'Monthly pension for BPL persons aged 60 years and above under the National Social Assistance Programme.',
    benefit:
      '₹200/month (age 60-79) or ₹500/month (age 80+) from central government, plus state top-up where applicable.',
    eligibility: {
      minAge: 60,
      requiresBpl: true,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Age Proof',
      'BPL Certificate',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'https://nsap.nic.in/',
    officialSource: 'https://nsap.nic.in/',
    tags: ['Pension', 'Senior Citizen', 'Central Government'],
  },
  {
    id: 'ignwps',
    name: 'Indira Gandhi National Widow Pension Scheme (IGNWPS)',
    ministry: 'Ministry of Rural Development',
    department: 'Department of Rural Development',
    category: 'Pension',
    description:
      'Monthly pension for BPL widows aged 40-79 years.',
    benefit:
      '₹300/month from central government, plus state top-up where applicable.',
    eligibility: {
      requiresBpl: true,
      requiresWoman: true,
      minAge: 40,
      maxAge: 79,
    },
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Certificate',
      'Death Certificate of Husband',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'https://nsap.nic.in/',
    officialSource: 'https://nsap.nic.in/',
    tags: ['Pension', 'Widow', 'Women', 'Central Government'],
  },
  {
    id: 'up-oldage',
    name: 'UP Old Age Pension Scheme',
    ministry: 'Government of Uttar Pradesh',
    department: 'Department of Women and Child Welfare, Uttar Pradesh',
    category: 'Pension',
    description:
      'Monthly old age pension for residents of Uttar Pradesh aged 60 years and above.',
    benefit:
      '₹1,000/month (state pension, including central share if applicable).',
    eligibility: {
      minAge: 60,
      states: ['Uttar Pradesh'],
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Age Proof',
      'Residence Proof',
      'Bank Account Details',
    ],
    applicationSteps: [
      'Complete documents',
      'Submit application',
      'Verification',
      'Decision',
      'Benefit delivery',
    ],
    applicationUrl: 'http://oldagepunishment.up.gov.in/',
    officialSource: 'http://oldagepunishment.up.gov.in/',
    tags: ['Pension', 'Senior Citizen', 'State Government', 'Uttar Pradesh'],
  },
];

export const ALL_OCCUPATIONS = [
  'Farmer',
  'Student',
  'Teacher',
  'Street Vendor',
  'Artisan/Craftsman',
  'Self-employed',
  'Small Business Owner',
  'Daily Wage Worker',
  'Private Employee',
  'Government Employee',
  'Unemployed',
  'Homemaker',
  'Other',
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
];

export const EDUCATION_LEVELS = [
  'Below 10th',
  '10th Pass',
  '12th Pass',
  'Graduate',
  'Postgraduate',
  'Diploma',
  'Other',
];

export const LANDHOLDING_TYPES = [
  'Marginal (up to 1 hectare)',
  'Small (1-2 hectares)',
  'Medium (2-4 hectares)',
  'Large (above 4 hectares)',
  'Landless',
  'Tenant Farmer',
];
