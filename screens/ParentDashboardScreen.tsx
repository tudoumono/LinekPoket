
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import type { Alert } from '../types';
import { AlertSeverity } from '../types';
import { mockAlerts } from '../data/alerts';

const recentAlerts = mockAlerts.slice(0, 3);

const SeverityIndicator: React.FC<{ severity: AlertSeverity }> = ({ severity }) => {
  const styles = {
    [AlertSeverity.Danger]: { bg: 'bg-red-100', text: 'text-red-600', icon: 'shield-alert' as const },
    [AlertSeverity.Warning]: { bg: 'bg-yellow-100', text: 'text-yellow-600', icon: 'alert-triangle' as const },
    [AlertSeverity.Info]: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'info' as const },
  };
  const { bg, text, icon } = styles[severity];
  return (
    <div className={`p-3 rounded-full ${bg}`}>
      <Icon name={icon} className={`w-6 h-6 ${text}`} />
    </div>
  );
};

const ParentDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="https://picsum.photos/seed/child1/40/40" alt="child avatar" className="w-10 h-10 rounded-full" />
            <h1 className="text-xl font-bold text-[#101828]">ゆうとさん</h1>
          </div>
          <button onClick={() => navigate('/alerts')} className="relative p-2 -mr-2" aria-label="通知一覧を表示">
            <Icon name="bell" className="w-7 h-7 text-gray-500" />
            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
          </button>
        </div>
      </header>

      <main className="p-4 space-y-6">
        <section className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-sm font-medium text-[#475467]">今週の検知</h2>
          <div className="flex justify-around mt-4 text-center">
            <div>
              <p className="text-3xl font-bold text-[#E5484D]">2</p>
              <p className="text-xs text-[#475467]">危険</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#FFB020]">5</p>
              <p className="text-xs text-[#475467]">注意</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#2E6EE6]">8</p>
              <p className="text-xs text-[#475467]">情報</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#101828] mb-3">レポート</h2>
          <div onClick={() => navigate('/report')} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer" role="button" aria-label="統計・集計レポートを表示">
            <div>
              <p className="font-semibold text-gray-800">統計・集計レポート</p>
              <p className="text-sm text-gray-600">検知傾向をグラフで確認します</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[#101828] mb-3">最近のアラート</h2>
          <div className="space-y-3">
            {recentAlerts.map(alert => (
              <div key={alert.id} onClick={() => navigate(`/alert/${alert.id}`)} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer" role="button" aria-label={`アラート詳細: ${alert.category} - ${alert.summary}`}>
                <SeverityIndicator severity={alert.severity} />
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{alert.category}</p>
                  <p className="text-sm text-gray-600">{alert.summary}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.timestamp} | {alert.app}</p>
                </div>
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            ))}
          </div>
        </section>
        
        {/* Quick actions for demo navigation */}
        <section>
             <h2 className="text-lg font-semibold text-[#101828] mb-3">デモ用画面遷移</h2>
             <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => navigate('/child-intercept-text')} className="bg-[#00B39F] text-white py-3 rounded-lg">子供画面(テキスト)</button>
                 <button onClick={() => navigate('/child-intercept-image')} className="bg-[#00B39F] text-white py-3 rounded-lg">子供画面(画像)</button>
                 <button onClick={() => navigate('/')} className="bg-[#2E6EE6] text-white py-3 rounded-lg col-span-2">スプラッシュ画面を再表示</button>
             </div>
        </section>

      </main>
    </div>
  );
};

export default ParentDashboardScreen;
