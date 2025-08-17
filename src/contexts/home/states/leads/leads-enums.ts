export enum LeadStatus {
  PROSPECT = 'Prospect',
  QUALIFIED = 'Qualified',
  HOT_LEAD = 'Hot Lead',
  CONVERTED = 'Converted',
  LOST = 'Lost'
}

export enum LeadSource {
  WEBSITE = 'Website',
  LINKEDIN = 'LinkedIn',
  REFERRAL = 'Referral',
  COLD_CALL = 'Cold Call',
  EMAIL_CAMPAIGN = 'Email Campaign',
  SOCIAL_MEDIA = 'Social Media'
}

export const LEAD_STATUS_COLORS = {
  [LeadStatus.PROSPECT]: 'bg-gray-100 text-gray-800',
  [LeadStatus.QUALIFIED]: 'bg-blue-100 text-blue-800',
  [LeadStatus.HOT_LEAD]: 'bg-red-100 text-red-800',
  [LeadStatus.CONVERTED]: 'bg-green-100 text-green-800',
  [LeadStatus.LOST]: 'bg-yellow-100 text-yellow-800'
} as const
