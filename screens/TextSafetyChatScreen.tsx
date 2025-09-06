
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

interface QaPair {
  question: string;
  answer: string;
}

const qaPairs: QaPair[] = [
  {
    question: 'なんで危ないの？',
    answer: '「IDを教えて」は、キミの個人情報を知ろうとしているのかもしれないんだ。知らない人に大事な情報を教えると、キミになりすまして悪いことをしたり、しつこく連絡してきたりすることがあるから危ないんだよ。'
  },
  {
    question: 'IDを教えたらどうなるの？',
    answer: 'もしIDを教えたら、知らない人から変なメッセージがたくさん来たり、キミの写真や名前を勝手に使われたりするかもしれないんだ。怖い思いをすることがあるから、絶対に教えちゃダメだよ。'
  },
  {
    question: 'どうすればいい？',
    answer: 'こういうメッセージが来たら、まずは「やめる」ボタンを押して送るのをやめよう。そして、おうちの人に「こんなメッセージが来たよ」ってすぐに相談するのが一番だよ。ひとりで悩まないでね。'
  }
];

const TextSafetyChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'bot', text: 'このメッセージ、ちょっと待って！もしかしたら危ないかもしれないよ。' },
    { id: 2, sender: 'bot', text: '何か気になることはあるかな？下のボタンから選んでみてね。' }
  ]);
  const [showQuestions, setShowQuestions] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleQuestionSelect = (qa: QaPair) => {
    const userMessage: Message = { id: Date.now(), sender: 'user', text: qa.question };
    const botMessage: Message = { id: Date.now() + 1, sender: 'bot', text: qa.answer };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot thinking time
    setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setShowQuestions(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F4F8]">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">あんしんAIチャット</h1>
      </header>
      
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                <Icon name="shield-alert" className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                message.sender === 'user' 
                    ? 'bg-[#00B39F] text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-[15px] leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer className="bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200">
        {showQuestions ? (
          <div className="space-y-2">
            {qaPairs.map(qa => (
              <button
                key={qa.question}
                onClick={() => handleQuestionSelect(qa)}
                className="w-full text-left p-3 bg-white border border-[#00B39F] text-[#00B39F] font-semibold rounded-lg shadow-sm"
              >
                {qa.question}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-[#00B39F] text-white py-3 rounded-lg font-semibold shadow-sm"
          >
            わかった！
          </button>
        )}
      </footer>
    </div>
  );
};

export default TextSafetyChatScreen;