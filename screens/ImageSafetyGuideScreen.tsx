
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const GuideItem: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm w-full">
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-shrink-0">{icon}</div>
      <h3 className="text-lg font-bold text-[#101828]">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const ImageSafetyGuideScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-[#FFFBEF]">
      <header className="sticky top-0 bg-transparent z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 bg-white/50 rounded-full" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center text-gray-800 flex-grow -ml-4">どうして危ないの？</h1>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 space-y-4">
        <GuideItem
          icon={<div className="bg-blue-100 p-3 rounded-full"><Icon name="user" className="w-6 h-6 text-blue-500" /></div>}
          title="個人情報がバレちゃうかも？"
        >
          写真にうつった制服や、うしろの建物から、キミの家や学校がわかってしまうことがあるんだ。知らない人に伝わると、危ない目にあうかもしれないよ。
        </GuideItem>

        <GuideItem
          icon={<div className="bg-red-100 p-3 rounded-full"><Icon name="shield-alert" className="w-6 h-6 text-red-500" /></div>}
          title="悪いことに使われるかも？"
        >
          キミの顔写真を、悪い人が勝手に保存して、キミのふりをしてウソをついたり、イタズラに使ったりすることがあるんだ。
        </GuideItem>
        
        <GuideItem
          icon={<div className="bg-yellow-100 p-3 rounded-full"><Icon name="info" className="w-6 h-6 text-yellow-500" /></div>}
          title="ずっとネットに残っちゃう？"
        >
          一度インターネットに出した写真は、完全に消すのがとてもむずかしい。「デジタルタトゥー」って言って、ずっと残ってしまうことがあるんだよ。
        </GuideItem>

        <div className="flex-grow"></div>

        <button 
          onClick={() => navigate(-1)}
          className="w-full max-w-sm bg-[#00B39F] text-white text-lg font-bold py-4 rounded-full shadow-lg mb-4"
        >
          わかった！
        </button>
      </main>
    </div>
  );
};

export default ImageSafetyGuideScreen;
