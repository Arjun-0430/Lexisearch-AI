

export type Role = 
  | 'Platform Super Admin'
  | 'Customer Super Admin'
  | 'Admin'
  | 'Legal Advisor'
  | 'HR Advisor'
  | 'Finance Advisor'
  | 'Purchase Advisor'
  | 'Administrative Advisor'
  | 'User';

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  tenantId: number | null;
  tenant: Tenant | null;
};

export type Tenant = {
  id: number;
  name: string;
  domain: string;
  status: 'Active' | 'Inactive';
  users: number;
};

// Based on the backend response
export type Case = {
  Sr_No: string;
  State: string;
  District: string;
  Establishment: string;
  CNR: string;
  Case_Number: string;
  Party_Name: string;
  Date_of_Registration: string;
  Purpose_Name: string;
  Next_Date: string;
  Disposal_Nature: string;
  Date_of_Decision: string;
  riskLevel?: 'High' | 'Medium' | 'Low';
  riskScore?: number;
  aiInsights?: string;
  aiDecision?: string;
};

export type RiskProfile = {
  id: number;
  subject: string;
  type: 'Individual' | 'Corporate Entity';
  riskScore: number;
  lastUpdated: string;
  factors: {
    name: string;
    level: 'High' | 'Medium' | 'Low';
    score: number;
  }[];
  aiPrediction: string;
  aiDecision: string;
};

export type Invoice = {
  id: number;
  invoiceId: string;
  period: string;
  searchCount: number;
  amount: number;
  status: 'Pending Approval' | 'Approved' | 'Rejected';
  createdBy: string;
  approvedBy: string | null;
  createdAt: string;
};

export type AIModel = {
  id: number;
  name: string;
  type: string;
  status: 'Active' | 'Inactive' | 'Training';
  accuracy: number;
  description: string;
  lastTrained: string;
  version: string;
  performance: {
    precision: number;
    recall: number;
    f1: number;
  };
};

export type SystemMetrics = {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
};
