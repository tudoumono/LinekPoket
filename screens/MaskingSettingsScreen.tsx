import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const MaskingSettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">マスク強度</h1>
      </header>
      
      <main className="p-6 text-center">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Icon name="eye" className="w-12 h-12 text-[#2E6EE6] mx-auto mb-4" />
            <p className="text-gray-700">
                検知したメッセージの伏字の強度（例：一部を隠す、全てを隠す）を設定できます。
            </p>
             <p className="text-sm text-gray-500 mt-2">
                （これはサンプル画面です）
            </p>
        </div>
      </main>
    </div>
  );
};

export default MaskingSettingsScreen;