import React from 'react';
import Icon from './Icon';
import { mockContacts } from '../data/contacts';

interface EmergencyContactModalProps {
  onClose: () => void;
}

const EmergencyContactModal: React.FC<EmergencyContactModalProps> = ({ onClose }) => {
  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-contact-modal-title"
    >
      <div 
        className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center bg-blue-100 rounded-full w-16 h-16 mb-4">
            <Icon name="phone" className="w-8 h-8 text-blue-600" />
        </div>
        <h2 id="emergency-contact-modal-title" className="text-xl font-bold text-gray-800">
          おうちの人に電話する
        </h2>
        <p className="text-sm text-gray-600 mt-1 mb-6">
          困ったときは、すぐに電話して相談しよう。
        </p>

        <div className="w-full space-y-3">
            {mockContacts.map(contact => (
                <a 
                    key={contact.id}
                    href={`tel:${contact.phone}`}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl"
                >
                    <div>
                        <p className="font-semibold text-gray-800">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.relation}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#1F56C2] font-bold">
                        <span>電話をかける</span>
                        <Icon name="phone" className="w-5 h-5" />
                    </div>
                </a>
            ))}
        </div>
        
        <button 
          onClick={onClose} 
          className="w-full mt-6 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default EmergencyContactModal;
