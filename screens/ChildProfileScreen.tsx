
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChildren, Status } from '../data/children';

const StatusIndicator: React.FC<{ status: Status }> = ({ status }) => {
  const statusConfig = {
    online: { text: 'オンライン', color: 'bg-green-500' },
    offline: { text: 'オフライン', color: 'bg-gray-400' },
    permission_needed: { text: '権限不足', color: 'bg-orange-500' },
  };
  const { text, color } = statusConfig[status];
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`}></span>
      <span className="text-sm text-gray-600">{text}</span>
    </div>
  );
};

const ChildProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4">
        <h1 className="text-xl font-bold text-[#101828] text-center">子供のプロフィール</h1>
      </header>
      
      <main className="p-4 space-y-4">
        {mockChildren.map(child => (
          <div key={child.id} onClick={() => navigate(`/profile/${child.id}`)} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer" role="button" aria-label={`${child.name}さんのプロフィールを編集`}>
            <img 
              src={`https://picsum.photos/seed/${child.avatarSeed}/64/64`} 
              alt={`${child.name}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex-grow">
              <p className="text-lg font-bold text-gray-800">{child.name}さん</p>
              <p className="text-sm text-gray-500 mb-1">{child.grade}</p>
              <StatusIndicator status={child.status} />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-300" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        ))}

        <button onClick={() => navigate('/profile/new')} className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-lg text-[#1F56C2] font-semibold shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          新しいプロフィールを追加
        </button>
      </main>
    </div>
  );
};

export default ChildProfileScreen;
