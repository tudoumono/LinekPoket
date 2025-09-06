
import type { CustomRule } from '../types';
import { AlertCategory, AlertSeverity } from '../types';

export let mockRules: CustomRule[] = [
  { id: 'rule1', name: '部活でのいじめ', keywords: ['部活', '先輩', 'やめて'], category: AlertCategory.Bullying, severity: AlertSeverity.Warning, enabled: true },
  { id: 'rule2', name: '金銭の要求', keywords: ['お金', '貸して', '振り込んで'], category: AlertCategory.Fraud, severity: AlertSeverity.Danger, enabled: true },
  { id: 'rule3', name: '個人情報の特定', keywords: ['学校', 'クラス', '先生の名前'], category: AlertCategory.PersonalInfo, severity: AlertSeverity.Info, enabled: false },
];
