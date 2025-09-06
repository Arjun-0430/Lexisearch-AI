
import type { Case, Tenant, User, RiskProfile, Invoice, AIModel, SystemMetrics, Role } from './types';

// Mock Data
const tenants: Tenant[] = [
  { id: 1, name: 'TATA Motors', domain: 'tata.com', status: 'Active', users: 1500 },
  { id: 2, name: 'Reliance', domain: 'reliance.com', status: 'Active', users: 2500 },
  { id: 3, name: 'Mahindra', domain: 'mahindra.com', status: 'Active', users: 1200 },
  { id: 4, name: 'Birla', domain: 'birla.com', status: 'Inactive', users: 800 },
  { id: 5, name: 'Apple', domain: 'apple.com', status: 'Active', users: 10000 },
  { id: 6, name: 'Virgin', domain: 'virgin.com', status: 'Active', users: 3000 },
  { id: 7, name: 'Oracle', domain: 'oracle.com', status: 'Active', users: 5000 },
  { id: 8, name: 'Microsoft', domain: 'microsoft.com', status: 'Active', users: 12000 },
  { id: 9, name: 'Nvidia', domain: 'nvidia.com', status: 'Active', users: 4000 },
];

const users: Omit<User, 'tenant'>[] = [
  // Platform Super Admin (no tenant)
  { id: 1, name: 'Platform Super Admin', email: 'super.admin@lexisearch.ai', role: 'Platform Super Admin', avatar: 'PA', tenantId: null },
  
  // TATA Motors Tenant
  { id: 2, name: 'TATA Admin', email: 'admin@tata.com', role: 'Customer Super Admin', avatar: 'TA', tenantId: 1 },
  { id: 3, name: 'Legal Advisor TATA', email: 'legal@tata.com', role: 'Legal Advisor', avatar: 'LL', tenantId: 1 },

  // Reliance Tenant
  { id: 4, name: 'Reliance HR', email: 'hr@reliance.com', role: 'HR Advisor', avatar: 'RH', tenantId: 2 },
  
  // Apple Tenant
  { id: 5, name: 'Apple User', email: 'user@apple.com', role: 'User', avatar: 'AU', tenantId: 5 },
];

export const passwords: Record<string, string> = {
    'super.admin@lexisearch.ai': 'superpass',
    'admin@tata.com': 'tatapass',
    'legal@tata.com': 'legalpass',
    'hr@reliance.com': 'hrpass',
    'user@apple.com': 'userpass'
};


export const getTenants = (): Tenant[] => tenants;

export const getUsers = (): User[] => {
    return users.map(u => {
        const tenant = u.tenantId ? tenants.find(t => t.id === u.tenantId) : null;
        return { ...u, tenant: tenant! }; // Using non-null assertion because we control the mock data
    });
}

export const findUserByEmail = (email: string): User | undefined => {
  const user = users.find(u => u.email === email);
  if (!user) return undefined;
  
  const tenant = user.tenantId ? tenants.find(t => t.id === user.tenantId) : null;
  return { ...user, tenant: tenant! };
};

const cases: Case[] = [
  {
    "Sr_No": "1",
    "State": "Andaman and Nicobar",
    "District": "Port Blair",
    "Establishment": "Chief Judicial Magistrate, Port Blair, Andaman",
    "CNR": "ANPB020004652024",
    "Case_Number": "/710/2024",
    "Party_Name": "STATE Vs AMIT TIGGA",
    "Date_of_Registration": "06-05-2024",
    "Purpose_Name": "HEARING",
    "Next_Date": "11-06-2025",
    "Disposal_Nature": "PLEAD GUILTY",
    "Date_of_Decision": "11-06-2025",
    riskLevel: 'High',
    riskScore: 92,
    aiInsights: 'High probability of recidivism based on pattern analysis',
    aiDecision: 'Recommendation: High-risk individual. Recommend enhanced monitoring and potential preventive measures.',
  },
  {
    "Sr_No": "2",
    "State": "California",
    "District": "Los Angeles",
    "Establishment": "CA Superior Court",
    "CNR": "USCA01008922023",
    "Case_Number": "2023-CV-892",
    "Party_Name": "Johnson vs. Property LLC",
    "Date_of_Registration": "22-04-2023",
    "Purpose_Name": "HEARING",
    "Next_Date": "15-08-2024",
    "Disposal_Nature": "Contested",
    "Date_of_Decision": "",
    riskLevel: 'Medium',
    riskScore: 65,
    aiInsights: 'Settlement likely within 60 days based on historical data',
    aiDecision: 'Recommendation: Mediation approach preferred. Settlement probability 73%.',
  },
  {
    "Sr_No": "3",
    "State": "New York",
    "District": "New York",
    "Establishment": "NY Supreme Court",
    "CNR": "USNY01005672023",
    "Case_Number": "2023-CR-567",
    "Party_Name": "STATE vs. TechCorp Securities",
    "Date_of_Registration": "18-03-2023",
    "Purpose_Name": "JUDGEMENT",
    "Next_Date": "",
    "Disposal_Nature": "Convicted",
    "Date_of_Decision": "20-11-2023",
    riskLevel: 'High',
    riskScore: 88,
    aiInsights: 'Complex financial fraud pattern detected with 94% confidence',
    aiDecision: 'Recommendation: Comprehensive compliance audit required. Potential regulatory violations identified.',
  },
  {
    "Sr_No": "4",
    "State": "Maharashtra",
    "District": "Mumbai",
    "Establishment": "High Court of Bombay",
    "CNR": "INMH01001232022",
    "Case_Number": "CR-123/2022",
    "Party_Name": "Global Exports vs. Tax Authority",
    "Date_of_Registration": "10-01-2022",
    "Purpose_Name": "ARGUMENTS",
    "Next_Date": "25-09-2024",
    "Disposal_Nature": "Contested",
    "Date_of_Decision": "",
    riskLevel: 'Low',
    riskScore: 34,
    aiInsights: 'Standard tax dispute. Low probability of significant penalties.',
    aiDecision: 'Recommendation: Standard legal procedure. No immediate red flags.',
  },
];

export const getCases = (): Case[] => cases;
export const getCaseByCnr = (cnr: string): Case | undefined => cases.find(c => c.CNR === cnr);

export const getRiskProfiles = (): RiskProfile[] => [
  {
    id: 1,
    subject: 'John Smith',
    type: 'Individual',
    riskScore: 85,
    lastUpdated: '2023-08-15',
    factors: [
      { name: 'Criminal Record', level: 'High', score: 92 },
      { name: 'Financial Irregularities', level: 'Medium', score: 65 },
      { name: 'PEP Connection', level: 'Medium', score: 60 },
    ],
    aiPrediction: '78% chance of future legal issues within 18 months',
    aiDecision: 'Recommendation: Enhanced due diligence and quarterly risk assessments.',
  },
  {
    id: 2,
    subject: 'Global Finance Corp',
    type: 'Corporate Entity',
    riskScore: 72,
    lastUpdated: '2023-08-12',
    factors: [
      { name: 'Compliance Violations', level: 'Medium', score: 68 },
      { name: 'Sanction List Match', level: 'Low', score: 25 },
      { name: 'AML Concerns', level: 'High', score: 82 },
    ],
    aiPrediction: 'Potential regulatory action expected in Q2 2024',
    aiDecision: 'Recommendation: Immediate compliance review and policy updates required.',
  },
];

export const getInvoices = (): Invoice[] => [
  {
    id: 1,
    invoiceId: 'INV-2023-08-001',
    period: 'Aug 2023',
    searchCount: 456,
    amount: 912.00,
    status: 'Pending Approval',
    createdBy: 'John Doe',
    approvedBy: null,
    createdAt: '2023-08-01',
  },
  {
    id: 2,
    invoiceId: 'INV-2023-08-002',
    period: 'Aug 2023',
    searchCount: 791,
    amount: 1582.00,
    status: 'Pending Approval',
    createdBy: 'Jane Smith',
    approvedBy: null,
    createdAt: '2023-08-02',
  },
  {
    id: 3,
    invoiceId: 'INV-2023-07-015',
    period: 'Jul 2023',
    searchCount: 1247,
    amount: 2494.00,
    status: 'Approved',
    createdBy: 'Mike Johnson',
    approvedBy: 'Sarah Wilson',
    createdAt: '2023-07-31',
  },
];

export const getAIModels = (): AIModel[] => [
  { id: 1, name: 'Legal Risk Predictor', type: 'NLP', status: 'Active', accuracy: 94.2, description: 'Analyzes legal documents to predict risk factors', lastTrained: '2024-01-15', version: 'v2.3.1', performance: { precision: 92, recall: 89, f1: 90 } },
  { id: 2, name: 'Case Outcome Forecaster', type: 'ML', status: 'Active', accuracy: 87.6, description: 'Predicts case outcomes based on historical data', lastTrained: '2024-01-10', version: 'v1.8.4', performance: { precision: 85, recall: 90, f1: 87 } },
  { id: 3, name: 'Fraud Detection Engine', type: 'Deep Learning', status: 'Training', accuracy: 91.8, description: 'Identifies fraudulent patterns in financial records', lastTrained: '2024-01-12', version: 'v3.0.2', performance: { precision: 93, recall: 90, f1: 91 } },
  { id: 4, name: 'Compliance Analyzer', type: 'Rule-Based AI', status: 'Active', accuracy: 96.3, description: 'Ensures compliance with regulatory requirements', lastTrained: '2024-01-08', version: 'v1.5.7', performance: { precision: 97, recall: 95, f1: 96 } },
];

export const getSystemMetrics = (): SystemMetrics => ({
    cpu: 45, memory: 62, disk: 38, network: 78
});
