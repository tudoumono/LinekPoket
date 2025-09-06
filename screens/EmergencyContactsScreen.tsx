import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockContacts } from '../data/contacts';

const EmergencyContactsScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-full flex flex-col">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate('/settings')} className="p-2 -ml-2" aria-label="設定画面に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">緊急連絡先の管理</h1>
      </header>
      
      <main className="flex-grow p-4 space-y-3">
        {mockContacts.map(contact => (
          <div 
            key={contact.id}
            onClick={() => navigate(`/settings/emergency-contact/${contact.id}`)}
            className="bg-white p-4 rounded-xl shadow-sm cursor-pointer flex justify-between items-center"
            role="button"
            aria-label={`連絡先「${contact.name}」を編集`}
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(`/settings/emergency-contact/${contact.id}`)}
          >
            <div>
                <p className="font-semibold text-gray-800">{contact.name} <span className="text-sm font-normal text-gray-500">({contact.relation})</span></p>
                <p className="text-sm text-gray-600 mt-1">{contact.phone}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        ))}
        {mockContacts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">緊急連絡先が登録されていません。</p>
            <p className="text-gray-500 text-sm mt-1">下のボタンから連絡先を追加してください。</p>
          </div>
        )}
      </main>
      
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <button 
          onClick={() => navigate('/settings/emergency-contact/new')}
          className="w-full flex items-center justify-center gap-2 bg-[#00B39F] text-white py-3 rounded-lg text-base font-semibold shadow-sm"
        >
          <Icon name="plus" className="w-5 h-5" />
          新しい連絡先を追加
        </button>
      </div>
    </div>
  );
};

export default EmergencyContactsScreen;
