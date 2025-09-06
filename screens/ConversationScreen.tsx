import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockAlerts } from '../data/alerts';

const ConversationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const alert = mockAlerts.find(a => a.id === id);

  if (!alert || !alert.conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
        <Icon name="message-circle" className="w-12 h-12 text-gray-400 mb-4" />
        <h1 className="text-xl font-bold text-gray-800">会話が見つかりません</h1>
        <p className="text-gray-600 mt-2">このアラートに関連する会話のサンプルはありません。</p>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-6 bg-[#00B39F] text-white py-2 px-4 rounded-lg font-semibold"
        >
          前に戻る
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-100 min-h-full flex flex-col">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">会話の詳細</h1>
      </header>
      
      <main className="flex-grow p-4 space-y-4">
        {alert.conversation.map((message, index) => (
          <div key={index} className={`flex items-end gap-2 ${message.user === 'child' ? 'justify-end' : 'justify-start'}`}>
            {message.user === 'other' && (
                <img src={`https://picsum.photos/seed/other${id}/40/40`} alt="other user avatar" className="w-8 h-8 rounded-full" />
            )}
            <div className={`max-w-[70%] p-3 rounded-2xl ${
                message.user === 'child' 
                    ? 'bg-[#00B39F] text-white rounded-br-lg' 
                    : 'bg-white text-gray-800 rounded-bl-lg'
            } ${message.highlighted ? 'bg-yellow-200 text-yellow-900 border border-yellow-400' : ''}`}>
              <p className="text-[15px]">{message.text}</p>
            </div>
             {message.user === 'child' && (
                <img src={`https://picsum.photos/seed/child1/40/40`} alt="child avatar" className="w-8 h-8 rounded-full" />
            )}
          </div>
        ))}
      </main>
      <footer className="sticky bottom-0 bg-white p-2 border-t">
         <p className="text-xs text-center text-gray-400">これは検知された会話のサンプルです。</p>
      </footer>
    </div>
  );
};

export default ConversationScreen;