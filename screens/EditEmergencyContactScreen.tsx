import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { EmergencyContact } from '../types';
import { mockContacts } from '../data/contacts';

const EditEmergencyContactScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  
  useEffect(() => {
    if (!isNew) {
      const contact = mockContacts.find(c => c.id === id);
      if (contact) {
        setName(contact.name);
        setRelation(contact.relation);
        setPhone(contact.phone);
      }
    }
  }, [id, isNew]);

  const handleSave = () => {
    if (!name || !relation || !phone) {
      alert('すべての項目を入力してください。');
      return;
    }

    if (isNew) {
      const newContact: EmergencyContact = {
        id: `contact${Date.now()}`,
        name,
        relation,
        phone,
      };
      mockContacts.push(newContact);
    } else {
      const contactIndex = mockContacts.findIndex(c => c.id === id);
      if (contactIndex > -1) {
        mockContacts[contactIndex] = {
          ...mockContacts[contactIndex],
          name,
          relation,
          phone,
        };
      }
    }
    navigate(-1);
  };

  const handleDelete = () => {
    if (window.confirm('この連絡先を本当に削除しますか？')) {
      const contactIndex = mockContacts.findIndex(c => c.id === id);
      if (contactIndex > -1) {
        mockContacts.splice(contactIndex, 1);
      }
      navigate('/settings/emergency-contacts');
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">
          {isNew ? '新しい連絡先' : '連絡先の編集'}
        </h1>
      </header>
      
      <main className="p-4 space-y-6">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 mb-1 block">名前</label>
          <input 
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例：お父さん"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        
        <div>
          <label htmlFor="contact-relation" className="text-sm font-medium text-gray-700 mb-1 block">続柄</label>
          <input 
            type="text"
            id="contact-relation"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            placeholder="例：父"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="text-sm font-medium text-gray-700 mb-1 block">電話番号</label>
          <input 
            type="tel"
            id="contact-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="090-1234-5678"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        
        <div className="space-y-3 pt-4">
           <button onClick={handleSave} className="w-full bg-[#00B39F] text-white py-3 rounded-lg text-base font-semibold shadow-sm">
             保存する
           </button>
           {!isNew && (
             <button onClick={handleDelete} className="w-full flex items-center justify-center gap-2 bg-white text-[#E5484D] py-3 rounded-lg text-base font-semibold border border-gray-300 shadow-sm">
               <Icon name="trash-2" className="w-5 h-5" />
               この連絡先を削除
             </button>
           )}
        </div>
      </main>
    </div>
  );
};

export default EditEmergencyContactScreen;
