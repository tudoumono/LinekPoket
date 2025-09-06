
import React from 'react';
import Icon from './Icon';

interface ConsultationModalProps {
  onClose: () => void;
}

const consultationSections = [
    {
        title: '今すぐ誰かに話したいとき（緊急）',
        links: [
            { name: 'いのちの電話', url: 'https://www.inochinodenwa.org/', description: '一般社団法人 日本いのちの電話連盟' },
        ]
    },
    {
        title: 'お子様ご本人が相談したいとき',
        links: [
            { name: 'チャイルドライン', url: 'https://childline.or.jp/', description: 'NPO法人 チャイルドライン支援センター' },
            { name: '子どもの人権110番', url: 'http://www.moj.go.jp/JINKEN/jinken112.html', description: '法務省' },
        ]
    },
    {
        title: '保護者の方が相談したいとき',
        links: [
            { name: '24時間子供SOSダイヤル', url: 'https://www.mext.go.jp/a_menu/shotou/seitoshidou/06112210.htm', description: '文部科学省' },
        ]
    }
]

const ConsultationModal: React.FC<ConsultationModalProps> = ({ onClose }) => {
  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div 
        className="bg-white w-full max-w-[420px] rounded-t-3xl p-5 pb-8 shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 id="consultation-modal-title" className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Icon name="message-circle" className="w-6 h-6 text-[#1F56C2]" />
            専門機関に相談する
          </h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-700" aria-label="閉じる">
            <Icon name="x" className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5 flex-shrink-0">
          お子さんとの関わり方や、ネットの危険性について専門家に相談できます。
        </p>

        <div className="overflow-y-auto space-y-5">
            {consultationSections.map(section => (
                 <section key={section.title}>
                    <h3 className="text-sm font-bold text-gray-600 mb-2">{section.title}</h3>
                    <ul className="space-y-3">
                    {section.links.map(link => (
                        <li key={link.name}>
                        <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg"
                        >
                            <p className="font-semibold text-[#1F56C2]">{link.name}</p>
                            <p className="text-xs text-gray-500">{link.description}</p>
                        </a>
                        </li>
                    ))}
                    </ul>
                 </section>
            ))}
        </div>
        
        <button 
          onClick={onClose} 
          className="w-full mt-6 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold flex-shrink-0"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ConsultationModal;