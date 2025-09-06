
export enum AlertSeverity {
  Danger = 'Danger',
  Warning = 'Warning',
  Info = 'Info',
}

export enum AlertCategory {
  Bullying = '誹謗中傷',
  PersonalInfo = '個人情報',
  Solicitation = '出会い誘導',
  Fraud = '詐欺',
  Image = '画像',
}

export interface ConversationMessage {
  user: 'child' | 'other';
  text: string;
  highlighted?: boolean;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  summary: string;
  timestamp: string;
  app: string;
  details: string;
  conversation?: ConversationMessage[];
}

export interface CustomRule {
  id: string;
  name: string;
  keywords: string[];
  category: AlertCategory;
  severity: AlertSeverity;
  enabled: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}
