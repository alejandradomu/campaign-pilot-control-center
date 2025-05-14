
export type CampaignType = 'email' | 'sms' | 'mixed';

export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';

export type TargetStatus = 'pending' | 'brushed' | 'loaded' | 'completed' | 'failed';

export interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms';
  subject?: string;
  content: string;
  previewImage?: string;
}

export interface Target {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  status: TargetStatus;
  campaignId: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  referenceCode: string;
  status: CampaignStatus;
  emailTemplateId?: string;
  smsTemplateId?: string;
  scheduledAt?: string;
  targetCount: number;
  successCount: number;
  failCount: number;
  bounceCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Journey {
  id: string;
  name: string;
  campaignId: string;
  steps: JourneyStep[];
  status: 'draft' | 'active' | 'completed' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface JourneyStep {
  id: string;
  type: 'email' | 'sms' | 'wait' | 'condition';
  templateId?: string;
  waitTime?: number;  // in hours
  condition?: string;
  position: number;
}

export interface Metrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalTargets: number;
  successRate: number;
  bounceCount: number;  // Added this property
  failCount: number;    // Added this property
  campaigns: {
    name: string;
    targets: number;
    successRate: number;
  }[];
}
