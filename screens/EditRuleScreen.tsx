import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { AlertCategory, AlertSeverity, CustomRule } from '../types';
import { mockRules } from '../data/rules';

const EditRuleScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState<AlertCategory>(AlertCategory.Bullying);
  const [severity, setSeverity] = useState<AlertSeverity>(AlertSeverity.Warning);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isNew) {
      try {
        const rule = mockRules.find(r => r.id === id);
        if (rule) {
          setName(rule.name);
          setKeywords(rule.keywords.join(', '));
          setCategory(rule.category);
          setSeverity(rule.severity);
        } else {
          throw new Error('Rule not found');
        }
      } catch (e) {
        setError('ルールの読み込みに失敗しました。');
      }
    }
  }, [id, isNew]);

  const handleSave = () => {
    try {
      setError(null); // Clear previous errors
      const keywordsArray = keywords.split(',').map(k => k.trim()).filter(Boolean);
      if (!name || keywordsArray.length === 0) {
        alert('ルール名とキーワードを入力してください。');
        return;
      }

      if (isNew) {
        const newRule: CustomRule = {
          id: `rule${Date.now()}`,
          name,
          keywords: keywordsArray,
          category,
          severity,
          enabled: true,
        };
        mockRules.push(newRule);
      } else {
        const ruleIndex = mockRules.findIndex(r => r.id === id);
        if (ruleIndex > -1) {
          mockRules[ruleIndex] = {
            ...mockRules[ruleIndex],
            name,
            keywords: keywordsArray,
            category,
            severity,
          };
        } else {
           throw new Error("Rule not found for saving");
        }
      }
      navigate(-1);
    } catch (e) {
        setError('ルールの保存に失敗しました。もう一度お試しください。');
    }
  };

  const handleDelete = () => {
    try {
      setError(null); // Clear previous errors
      if (window.confirm('このルールを本当に削除しますか？')) {
        const ruleIndex = mockRules.findIndex(r => r.id === id);
        if (ruleIndex > -1) {
          mockRules.splice(ruleIndex, 1);
        } else {
          throw new Error("Rule not found for deletion");
        }
        navigate('/settings/rules');
      }
    } catch (e) {
      setError('ルールの削除に失敗しました。もう一度お試しください。');
    }
  };

  const OptionButton: React.FC<{ value: string; selectedValue: string; onClick: (value: any) => void; children: React.ReactNode; className?: string }> = 
    ({ value, selectedValue, onClick, children, className }) => (
    <button
      onClick={() => onClick(value)}
      className={`py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${selectedValue === value ? 'bg-[#E6F0FF] border-[#2E6EE6] text-[#1F56C2]' : 'bg-white border-gray-300 text-gray-700'} ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">
          {isNew ? '新しいルール' : 'ルールの編集'}
        </h1>
      </header>
      
      <main className="p-4 space-y-6">
        <div>
          <label htmlFor="rule-name" className="text-sm font-medium text-gray-700 mb-1 block">ルール名</label>
          <input 
            type="text"
            id="rule-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：部活でのいじめ"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            disabled={!!error && !isNew}
          />
        </div>
        
        <div>
          <label htmlFor="keywords" className="text-sm font-medium text-gray-700 mb-1 block">キーワード</label>
          <textarea
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            rows={3}
            placeholder="カンマ(,)区切りで入力"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            disabled={!!error && !isNew}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">カテゴリ</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(AlertCategory).map(cat => (
              <OptionButton key={cat} value={cat} selectedValue={category} onClick={setCategory}>{cat}</OptionButton>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">重要度</h3>
          <div className="grid grid-cols-3 gap-2">
            <OptionButton value={AlertSeverity.Danger} selectedValue={severity} onClick={setSeverity}>危険</OptionButton>
            <OptionButton value={AlertSeverity.Warning} selectedValue={severity} onClick={setSeverity}>注意</OptionButton>
            <OptionButton value={AlertSeverity.Info} selectedValue={severity} onClick={setSeverity}>情報</OptionButton>
          </div>
        </div>
        
        <div className="space-y-3">
           {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
                <p><span className="font-bold">エラー:</span> {error}</p>
              </div>
           )}
           <button onClick={handleSave} className="w-full bg-[#00B39F] text-white py-3 rounded-lg text-base font-semibold shadow-sm disabled:opacity-50" disabled={!!error && !isNew}>
             保存する
           </button>
           {!isNew && (
             <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 bg-white text-[#E5484D] py-3 rounded-lg text-base font-semibold border border-gray-300 shadow-sm disabled:opacity-50" disabled={!!error && !isNew}>
               <Icon name="trash-2" className="w-5 h-5" />
               このルールを削除
             </button>
           )}
        </div>
      </main>
    </div>
  );
};

export default EditRuleScreen;