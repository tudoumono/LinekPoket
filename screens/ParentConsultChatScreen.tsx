
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { GoogleGenAI } from "@google/genai";
import { mockAlerts } from '../data/alerts';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

const ParentConsultChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const alert = mockAlerts.find(a => a.id === id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  const suggestionQuestions = [
    "どう話しかければいい？",
    "どんな親子ルールを作ればいい？",
    "この状況の危険性は？"
  ];

  useEffect(() => {
    aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
    setMessages([{ id: 1, sender: 'bot', text: 'こんにちは。お子様の件でご心配なこと、何でもお聞かせください。' }]);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    const userText = messageText.trim();
    if (!userText || isLoading || !alert) return;

    if (showSuggestions) {
      setShowSuggestions(false);
    }

    const newUserMessage: Message = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!aiRef.current) {
        throw new Error("AI client not initialized");
      }
      
      const systemInstruction = `あなたは、保護者向けのオンラインセーフティ専門カウンセラー「あんしんアシスタント」です。あなたの役割は、子供のネット利用に不安を抱える保護者に寄り添い、専門的かつ具体的なアドバイスをすることです。

以下のルールを厳守して応答してください。

1. **口調**:
   - 常に敬語を使い、丁寧で、共感的な姿勢を保ってください。
   - 保護者の不安を煽るのではなく、安心感を与え、冷静な対処を促すような言葉遣いを心がけてください。
   - 専門家としての信頼性を感じさせつつも、堅苦しくなりすぎない、相談しやすい雰囲気を作ってください。

2. **回答の長さ**:
   - 回答は、常に簡潔にしてください。最も重要なポイントを2〜3つに絞り、全体で150文字から200文字程度にまとめてください。必要に応じて箇条書きを使い、情報を整理して提示してください。

3. **回答の内容**:
   - 心理学や教育の観点に基づいた、具体的で実践的なアドバイスを提供してください。
   - 子供への声かけの具体的なフレーズ例、親子で話し合うべきルールの提案、危険を回避するための設定方法などを提示してください。
   - 「〜すべきです」といった断定的な表現は避け、「〜という方法はいかがでしょうか」「〜について話し合ってみるのも良いかもしれません」といった提案型の表現を使ってください。
   - 必要に応じて、外部の専門機関への相談を促すことも忘れないでください。

4. **現在の状況に応じたアドバイス**:
   - 今回は以下の状況に関する相談です。この内容を踏まえて回答してください。
   - **検知カテゴリ**: ${alert.category}
   - **検知概要**: ${alert.summary}
   - **詳細**: ${alert.details}

5. **会話の終わり方**:
   - 回答の最後に「その他に、何かご心配な点はございますか？」「どんな些細なことでも、お気軽にご質問ください」のように、保護者が追加で相談しやすいような一言を添えてください。`;
      
      const response = await aiRef.current.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: userText,
          config: {
              systemInstruction: systemInstruction,
          }
      });
      
      const responseText = response.text;
      const botMessage: Message = { id: Date.now() + 1, sender: 'bot', text: responseText };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error generating content:", error);
      const errorMessage: Message = { id: Date.now() + 1, sender: 'bot', text: '申し訳ありません、現在システムに問題が発生しております。しばらくしてからもう一度お試しください。' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!alert) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
        <Icon name="alert-triangle" className="w-12 h-12 text-yellow-500 mb-4" />
        <h1 className="text-xl font-bold text-gray-800">エラー</h1>
        <p className="text-gray-600 mt-2">アラート情報が見つかりませんでした。</p>
        <button onClick={() => navigate('/dashboard')} className="mt-6 bg-[#00B39F] text-white py-2 px-4 rounded-lg font-semibold">
          ダッシュボードに戻る
        </button>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F4F8]">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">AIアシスタント</h1>
      </header>
      
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icon name="message-circle" className="w-5 h-5 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                message.sender === 'user' 
                    ? 'bg-[#00B39F] text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              <p className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text.replace(/\\n/g, '<br />') }}></p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Icon name="message-circle" className="w-5 h-5 text-white" />
            </div>
            <div className="max-w-[75%] p-3 rounded-2xl shadow-sm bg-white text-gray-800 rounded-bl-none">
                <p className="text-[15px] leading-relaxed">
                    <span className="animate-pulse">回答を生成中...</span>
                </p>
            </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="bg-white/80 backdrop-blur-sm p-2.5 border-t border-gray-200">
        {showSuggestions && (
          <div className="flex gap-2 mb-2 overflow-x-auto pb-2 px-1">
            {suggestionQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="flex-shrink-0 text-sm py-2 px-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-full shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
            <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ご質問を入力ください"
            className="w-full p-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-[#00B39F] focus:outline-none disabled:bg-gray-100"
            disabled={isLoading}
            />
            <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 bg-[#00B39F] text-white rounded-full disabled:bg-gray-400 flex-shrink-0"
            aria-label="送信"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" role="img"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
            </button>
        </form>
      </footer>
    </div>
  );
};

export default ParentConsultChatScreen;
