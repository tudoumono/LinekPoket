
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockChildren, ChildProfile } from '../data/children';

const EditChildProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [avatarSeed, setAvatarSeed] = useState('new-child');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    if (!isNew) {
      const child = mockChildren.find(c => c.id === id);
      if (child) {
        setName(child.name);
        setGrade(child.grade);
        setAvatarSeed(child.avatarSeed);
      }
    }
  }, [id, isNew]);

  const handleSave = () => {
    if (!name || !grade) {
      alert('名前と学年を入力してください。');
      return;
    }

    if (isNew) {
      const newProfile: ChildProfile = {
        id: `child${Date.now()}`,
        name,
        grade,
        avatarSeed: name.toLowerCase(), // simple seed from name
        status: 'offline', // Default status for new profile
      };
      mockChildren.push(newProfile);
    } else {
      const childIndex = mockChildren.findIndex(c => c.id === id);
      if (childIndex > -1) {
        mockChildren[childIndex] = {
          ...mockChildren[childIndex],
          name,
          grade,
          avatarSeed: name.toLowerCase(),
        };
      }
    }
    navigate('/profile');
  };

  const handleDelete = () => {
    setIsConfirmingDelete(true);
  };

  const confirmDelete = () => {
    const childIndex = mockChildren.findIndex(c => c.id === id);
    if (childIndex > -1) {
      mockChildren.splice(childIndex, 1);
    }
    navigate('/profile');
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(false);
  };
  
  const gradeOptions = ['未就学児', '小学校低学年', '小学校中学年', '小学校高学年', '中学生', '高校生'];

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">
          {isNew ? '新しいプロフィール' : 'プロフィールの編集'}
        </h1>
      </header>
      
      <main className="p-4 space-y-6">
        <div className="flex flex-col items-center">
            <img 
                src={`https://picsum.photos/seed/${avatarSeed}/96/96`} 
                alt={`${name}'s avatar`}
                className="w-24 h-24 rounded-full mb-2"
            />
            <button className="text-sm font-semibold text-[#1F56C2]">
                アバターを変更
            </button>
        </div>

        <div>
          <label htmlFor="child-name" className="text-sm font-medium text-gray-700 mb-1 block">名前</label>
          <input 
            type="text"
            id="child-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：ゆうと"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        
        <div>
          <label htmlFor="child-grade" className="text-sm font-medium text-gray-700 mb-1 block">学年</label>
          <select
            id="child-grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm bg-white"
          >
            <option value="" disabled>学年を選択してください</option>
            {gradeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        
        <div className="space-y-3 pt-4">
           <button onClick={handleSave} className="w-full bg-[#00B39F] text-white py-3 rounded-lg text-base font-semibold shadow-sm">
             保存する
           </button>
           {!isNew && !isConfirmingDelete && (
             <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 bg-white text-[#E5484D] py-3 rounded-lg text-base font-semibold border border-gray-300 shadow-sm">
               <Icon name="trash-2" className="w-5 h-5" />
               このプロフィールを削除
             </button>
           )}
           {isConfirmingDelete && (
             <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center space-y-3">
               <p className="font-semibold text-red-800">本当に削除しますか？</p>
               <p className="text-sm text-red-700">この操作は取り消せません。</p>
               <div className="flex gap-3 mt-4">
                 <button onClick={cancelDelete} className="w-full bg-white text-gray-700 py-2 rounded-lg border border-gray-300 font-semibold">キャンセル</button>
                 <button onClick={confirmDelete} className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold">削除する</button>
               </div>
             </div>
           )}
        </div>
      </main>
    </div>
  );
};

export default EditChildProfileScreen;
