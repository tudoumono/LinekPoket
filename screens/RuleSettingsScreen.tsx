
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import ToggleSwitch from '../components/ToggleSwitch';
import { mockRules } from '../data/rules';
import { AlertSeverity } from '../types';

const SeverityBadge: React.FC<{ severity: AlertSeverity }> = ({ severity }) => {
  const styles = {
    [AlertSeverity.Danger]: { bg: 'bg-red-100', text: 'text-red-700' },
    [AlertSeverity.Warning]: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    [AlertSeverity.Info]: { bg: 'bg-blue-100', text: 'text-blue-700' },
  };
  const severityText = {
    [AlertSeverity.Danger]: '危険',
    [AlertSeverity.Warning]: '注意',
    [AlertSeverity.Info]: '情報',
  }
  const { bg, text } = styles[severity];

  return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${bg} ${text}`}>{severityText[severity]}</span>;
};


const RuleSettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  // In a real app, state would be managed with useState/useEffect or a state management library
  const [rules, setRules] = React.useState(mockRules);

  const handleToggle = (id: string, enabled: boolean) => {
    const rule = rules.find(r => r.id === id);
    if(rule) {
        rule.enabled = enabled;
        setRules([...rules]);
    }
  };

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate('/settings')} className="p-2 -ml-2" aria-label="設定画面に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">カスタムルール設定</h1>
      </header>
      
      <main className="flex-grow p-4 space-y-3">
        {rules.map(rule => (
          <div 
            key={rule.id}
            onClick={() => navigate(`/settings/rule/${rule.id}`)}
            className="bg-white p-4 rounded-xl shadow-sm cursor-pointer"
            role="button"
            aria-label={`ルール「${rule.name}」を編集`}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/settings/rule/${rule.id}`)}
          >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-800">{rule.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                        キーワード: {rule.keywords.join(', ')}
                    </p>
                </div>
                <ToggleSwitch 
                  enabled={rule.enabled} 
                  onChange={(enabled) => handleToggle(rule.id, enabled)} 
                  aria-label={`ルール「${rule.name}」を${rule.enabled ? '無効化' : '有効化'}する`} 
                />
            </div>
            <div className="mt-3 flex gap-2 items-center">
                <SeverityBadge severity={rule.severity} />
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{rule.category}</span>
            </div>
          </div>
        ))}
        {rules.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">カスタムルールがありません。</p>
            <p className="text-gray-500 text-sm mt-1">下のボタンから新しいルールを追加してください。</p>
          </div>
        )}
      </main>
      
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <button 
          onClick={() => navigate('/settings/rule/new')}
          className="w-full flex items-center justify-center gap-2 bg-[#00B39F] text-white py-3 rounded-lg text-base font-semibold shadow-sm"
        >
          <Icon name="plus" className="w-5 h-5" />
          新しいルールを追加
        </button>
      </div>
    </div>
  );
};

export default RuleSettingsScreen;
