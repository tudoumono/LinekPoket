import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import EmergencyContactModal from '../components/EmergencyContactModal';

const ChildImageInterceptScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full bg-[#E6F0FF]">
        <header className="sticky top-0 bg-transparent z-10 px-4 pt-8 pb-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 bg-white/50 rounded-full" aria-label="前に戻る">
            <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-center text-gray-800 flex-grow -ml-4">画像・動画チェック</h1>
        </header>
        
        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
              <Icon name="alert-triangle" className="w-12 h-12 text-[#FFB020]" />
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            この画像には危険な情報が<br />含まれている可能性があります
          </h2>
          <p className="text-[#475467] mt-2">
            制服や住所が映り込んでいるかもしれません
          </p>

          <div className="my-6">
            <img 
              src="https://picsum.photos/seed/childselfie/200/200" 
              alt="Checked image" 
              className="w-32 h-32 object-cover rounded-lg shadow-lg"
              style={{ filter: 'blur(4px)' }}
            />
          </div>

          <div className="w-full max-w-sm space-y-3">
            <button className="w-full bg-[#00B39F] text-white text-lg font-bold py-4 rounded-full shadow-lg">
              送信をやめる
            </button>
            <button className="w-full bg-white text-gray-700 text-lg font-semibold py-4 rounded-full border border-gray-300 shadow-sm">
              それでも送る
            </button>
          </div>

          <div className="mt-6 text-center">
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="inline-flex items-center gap-2 bg-white/80 py-2 px-4 rounded-full text-gray-800 font-semibold border border-gray-300 shadow-sm mb-3"
            >
                <Icon name="phone" className="w-5 h-5 text-[#2E6EE6]" />
                おうちの人に電話する
            </button>
            <div className="flex justify-center gap-4">
                <button onClick={() => navigate('/safety-chat', { state: { type: 'image' } })} className="text-[#2E6EE6] underline">
                    どうして危ないの？
                </button>
                <button onClick={() => navigate('/consult-parent')} className="text-[#2E6EE6] underline">
                    親に相談する
                </button>
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && <EmergencyContactModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ChildImageInterceptScreen;
