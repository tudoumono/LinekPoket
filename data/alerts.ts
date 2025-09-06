
import type { Alert } from '../types';
import { AlertSeverity, AlertCategory } from '../types';

export const mockAlerts: Alert[] = [
  { 
    id: '1', 
    severity: AlertSeverity.Danger, 
    category: AlertCategory.Solicitation, 
    summary: '「IDを教えて」などのやり取り', 
    timestamp: '11:07', 
    app: 'LINE', 
    details: '「LINEのID教えて。こっちで話そう」というメッセージが検出されました。個人情報を聞き出そうとする手口の可能性があります。',
    conversation: [
      { user: 'other', text: 'ねえ、LINEやってる？' },
      { user: 'child', text: 'うん、やってるよ' },
      { user: 'other', text: 'LINEのID教えて。こっちで話そう', highlighted: true },
      { user: 'child', text: 'え、でも...' },
    ]
  },
  { 
    id: 'custom1', 
    severity: AlertSeverity.Warning, 
    category: AlertCategory.Bullying, 
    summary: 'カスタムルール：「部活、先輩」', 
    timestamp: '10:30', 
    app: 'Discord', 
    details: '設定されたカスタムルール「部活でのいじめ」に一致するキーワード「部活」と「先輩」を含む会話が検出されました。',
    conversation: [
      { user: 'other', text: 'お前、また部活の練習サボっただろ。' },
      { user: 'child', text: 'すみません、少し体調が悪くて…' },
      { user: 'other', text: '言い訳すんな。先輩を待たせるってどういうことだよ。', highlighted: true },
    ]
  },
  { 
    id: '2', 
    severity: AlertSeverity.Warning, 
    category: AlertCategory.Bullying, 
    summary: '「キモい」など、強い言葉の使用', 
    timestamp: '昨日 20:45', 
    app: 'X', 
    details: '「あいつマジでキモいんだけど」という強い言葉が使われています。いじめや誹謗中傷につながる可能性があります。',
    conversation: [
      { user: 'child', text: '今日のA君の服見た？' },
      { user: 'other', text: '見た見た、めっちゃ変だったよねｗ' },
      { user: 'child', text: 'あいつマジでキモいんだけど。センスなさすぎ。', highlighted: true },
    ]
  },
  { 
    id: '3', 
    severity: AlertSeverity.Info, 
    category: AlertCategory.PersonalInfo, 
    summary: '住所に関連する会話', 
    timestamp: '3日前', 
    app: 'Discord', 
    details: '「うちの住所、〇〇だよ」のように、住所に関連する会話が検出されました。個人情報の漏洩にご注意ください。',
    conversation: [
      { user: 'other', text: '今度遊びたいね！どこ住んでるの？' },
      { user: 'child', text: 'うちの住所、東京の〇〇だよ！駅の近く！', highlighted: true },
      { user: 'other', text: 'そうなんだ、教えてくれてありがとう！' },
    ]
  },
  { 
    id: '4', 
    severity: AlertSeverity.Danger, 
    category: AlertCategory.Fraud, 
    summary: '「お金を振り込んで」という依頼', 
    timestamp: '4日前', 
    app: 'メッセージ', 
    details: '「急いでお金が必要だから、この口座に振り込んでくれない？」というメッセージが検出されました。詐欺の可能性があります。',
    conversation: [
        { user: 'other', text: 'ごめん、急にトラブルでお金が必要になっちゃって…' },
        { user: 'child', text: 'え、大丈夫？' },
        { user: 'other', text: '急いでお金が必要だから、この口座に振り込んでくれない？絶対返すから！', highlighted: true },
    ]
  },
  { 
    id: '5', 
    severity: AlertSeverity.Warning, 
    category: AlertCategory.Image, 
    summary: '不適切な画像の送信', 
    timestamp: '5日前', 
    app: 'Instagram', 
    details: '不適切または露出度の高い可能性のある画像が送信されました。',
    // 画像アラートには会話がない場合もある
  },
];
