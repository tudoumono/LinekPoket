
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  const SettingItem: React.FC<{ children: React.ReactNode; hasArrow?: boolean; value?: string; isLast?: boolean; onClick?: () => void; className?: string; 'aria-label'?: string; }> = ({ children, hasArrow = true, value, isLast = false, onClick, className, 'aria-label': ariaLabel }) => (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-4 bg-white ${!isLast ? 'border-b border-gray-200' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      aria-label={ariaLabel}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
    >
      <span className="text-gray-800">{children}</span>
      <div className="flex items-center gap-2">
        {value && <span className="text-gray-500">{value}</span>}
        {hasArrow && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-[#101828] text-center">設定</h1>
      </header>
      
      <main className="p-4 space-y-6">
        {/* Notification Section */}
        <div>
          <h2 className="text-xs font-semibold text-[#475467] uppercase tracking-wider px-2 mb-2">通知</h2>
          <div className="rounded-xl shadow-sm overflow-hidden">
            <SettingItem onClick={() => navigate('/settings/notifications-severity')} aria-label="重要度ごとの通知設定画面に移動">重要度ごとの通知</SettingItem>
            <SettingItem onClick={() => navigate('/settings/batch-notifications')} isLast={true} aria-label="深夜はまとめ通知設定画面に移動">深夜はまとめ通知</SettingItem>
          </div>
        </div>

        {/* Detection Settings Section */}
        <div>
          <h2 className="text-xs font-semibold text-[#475467] uppercase tracking-wider px-2 mb-2">検知設定</h2>
          <div className="rounded-xl shadow-sm overflow-hidden">
            <SettingItem onClick={() => navigate('/settings/rules')} isLast={true} aria-label="カスタムルール設定画面に移動">カスタムルール設定</SettingItem>
          </div>
        </div>
        
        {/* Privacy Section */}
        <div>
          <h2 className="text-xs font-semibold text-[#475467] uppercase tracking-wider px-2 mb-2">プライバシー</h2>
          <div className="rounded-xl shadow-sm overflow-hidden">
            <SettingItem onClick={() => navigate('/settings/masking')} value="標準" aria-label="マスク強度設定画面に移動">マスク強度</SettingItem>
            <SettingItem onClick={() => navigate('/settings/retention')} value="30日" isLast={true} aria-label="保持期間設定画面に移動">保持期間</SettingItem>
          </div>
        </div>

        {/* Data Management Section */}
        <div>
          <h2 className="text-xs font-semibold text-[#475467] uppercase tracking-wider px-2 mb-2">データ管理</h2>
          <div className="rounded-xl shadow-sm overflow-hidden">
            <SettingItem onClick={() => navigate('/settings/export')} isLast={true} aria-label="データエクスポート画面に移動">データエクスポート</SettingItem>
          </div>
        </div>

        {/* Account Section */}
        <div>
          <h2 className="text-xs font-semibold text-[#475467] uppercase tracking-wider px-2 mb-2">アカウント</h2>
          <div className="rounded-xl shadow-sm overflow-hidden">
            <SettingItem onClick={() => navigate('/settings/emergency-contacts')} aria-label="緊急連絡先の管理画面に移動">緊急連絡先の管理</SettingItem>
            <SettingItem onClick={() => navigate('/profile')} aria-label="子供のプロフィール管理画面に移動">子供のプロフィール管理</SettingItem>
            <SettingItem className="text-[#E5484D] font-medium" hasArrow={false} isLast={true} aria-label="アカウントを削除する">アカウント削除</SettingItem>
          </div>
        </div>

      </main>
    </div>
  );
};

export default SettingsScreen;
