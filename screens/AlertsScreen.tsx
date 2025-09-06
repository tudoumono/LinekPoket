
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockAlerts } from '../data/alerts';
import type { Alert } from '../types';
import { AlertSeverity } from '../types';

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

const AlertsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-[#101828] text-center">アラート一覧</h1>
      </header>

      <main className="p-4 space-y-3">
        {mockAlerts.map(alert => (
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
      </main>
    </div>
  );
};

export default AlertsScreen;
