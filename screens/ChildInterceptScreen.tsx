import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import EmergencyContactModal from '../components/EmergencyContactModal';

const ChildInterceptScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full bg-[#FFFBEF] p-6 text-center">
        <header className="w-full flex justify-start">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
              <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
          </button>
        </header>
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-[#475467] mb-6">
            <Icon name="alert-triangle" className="w-8 h-8 text-[#FFB020]" />
            注意！
          </h1>
          
          <div className="bg-white/60 p-6 rounded-2xl shadow-md w-full max-w-sm">
            <div className="inline-block p-3 bg-yellow-100 rounded-full mb-4">
              <Icon name="alert-triangle" className="w-8 h-8 text-[#FFB020]" />
            </div>
            <p className="text-lg font-semibold text-gray-800">
              このメッセージには危険な言葉が含まれているかも
            </p>
            <p className="text-gray-500 mt-2">
              「IDを教えて」や「振込して」など
            </p>
          </div>

          <div className="w-full max-w-sm mt-8 space-y-3">
            <button className="w-full bg-[#00B39F] text-white text-lg font-bold py-4 rounded-full shadow-lg">
              やめる
            </button>
            <button className="w-full bg-white text-gray-700 text-lg font-semibold py-4 rounded-full border border-gray-300 shadow-sm">
              それでも送る
            </button>
          </div>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="inline-flex items-center gap-2 bg-white py-2 px-4 rounded-full text-gray-800 font-semibold border border-gray-300 shadow-sm mb-3"
            >
              <Icon name="phone" className="w-5 h-5 text-[#00B39F]" />
              おうちの人に電話する
            </button>
            <div>
              <button onClick={() => navigate('/safety-chat', { state: { type: 'text' } })} className="text-[#00B39F] underline">
                どうして危ないの？
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <EmergencyContactModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ChildInterceptScreen;
