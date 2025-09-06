
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const ConsultParentScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#E6F0FF] text-center">
       <header className="sticky top-0 bg-transparent z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 bg-white/50 rounded-full" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white/80 p-8 rounded-full shadow-lg mb-8">
            <div className="bg-green-100 p-6 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          おうちの人に<br/>そうだんを送ったよ！
        </h1>
        <p className="text-gray-600 mb-12">
          あとでいっしょに<br/>かくにんしてみてね。
        </p>

        <button 
          onClick={() => navigate(-1)}
          className="w-full max-w-sm bg-[#00B39F] text-white text-lg font-bold py-4 rounded-full shadow-lg"
        >
          わかった！
        </button>
      </main>
    </div>
  );
};

export default ConsultParentScreen;