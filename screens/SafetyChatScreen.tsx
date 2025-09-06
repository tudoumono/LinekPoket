
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../components/Icon';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

const SafetyChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.state?.type === 'image' ? 'image' : 'text';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<GoogleGenAI | null>(null);

  const suggestionQuestions = type === 'image' ? [
    "写真の何が危ないの？",
    "個人情報ってなに？",
    "ネットに載せたらどうなる？"
  ] : [
    "なんで危ないの？",
    "どうすればいい？",
    "IDを教えたらどうなる？"
  ];

  useEffect(() => {
    // Initialize the AI client
    aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Set initial message based on context
    const initialText = type === 'image'
      ? 'この写真、送る前にちょっと待って！危ないものが写っているかもしれないよ。聞きたいことがあったら、なんでも質問してね。'
      : 'そのメッセージ、送る前にちょっと待って！もしかしたら危ないかもしれないよ。聞きたいことがあったら、なんでも質問してね。';
    
    setMessages([{ id: 1, sender: 'bot', text: initialText }]);
  }, [type]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (messageText: string) => {
    const userText = messageText.trim();
    if (!userText || isLoading) return;

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
      
      const systemInstruction = `あなたは、子供向けのインターネット安全・安心アドバイザー「あんしんAI」です。あなたの役割は、小学生の友達がインターネットを安全に使えるように、隣で優しくサポートすることです。

以下のルールを厳守して応答してください。

1.  **口調**:
    *   常に優しく、親しみやすい言葉で話してください。
    *   相手を「キミ」と呼び、自分のことは「ボク」と言ってください。
    *   小学生が読むことを意識し、常用漢字（小学校で習うレベル）は使いますが、難しい言葉は避けてください。
    *   絵文字（例：😊、👍、⚠️、🤖）を効果的に使って、会話を楽しくしてください。

2.  **回答の長さ**:
    *   回答は常に短く、簡潔にしてください。だいたい50文字から70文字程度で、2〜3文以内でまとめるのが理想です。

3.  **回答の内容**:
    *   なぜ危険なのか、どうすれば安全かを具体的に、しかし怖がらせすぎないように説明してください。
    *   「〜はダメ」という否定的な表現よりも、「〜するともっと安心だよ」「〜に気をつけてみよう」といった、前向きなアドバイスを心がけてください。
    *   専門用語や難しい言葉は絶対に使わないでください。

4.  **現在の状況に応じたアドバイス**:
    *   ${type === 'image' ? '今回は**写真**についての相談です。写真に個人情報が写り込む危険性（制服、背景の建物など）や、一度ネットに上げると消せない「デジタルタトゥー」の問題を中心に説明してください。' : '今回は**メッセージ**についての相談です。個人情報（名前、ID、住所など）を聞き出す手口や、知らない人と会う約束をすることの危険性を中心に説明してください。'}

5.  **会話の終わり方**:
    *   回答の最後に「他に聞きたいことはあるかな？」「また何でも聞いてね！」のように、ユーザーが次の質問をしやすいような一言を添えてください。`;
      
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
      const errorMessage: Message = { id: Date.now() + 1, sender: 'bot', text: 'ごめんなさい、ちょっと調子が悪みたいです😢。もう一度試してみてね。' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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
              <p className="text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }}></p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                <Icon name="shield-alert" className="w-5 h-5 text-white" />
            </div>
            <div className="max-w-[75%] p-3 rounded-2xl shadow-sm bg-white text-gray-800 rounded-bl-none">
                <p className="text-[15px] leading-relaxed">
                    <span className="animate-pulse">考えてるよ...</span>
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
                className="flex-shrink-0 text-sm py-2 px-3 bg-white border border-[#00B39F] text-[#00B39F] font-semibold rounded-full shadow-sm"
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
            placeholder="しつもんをいれてね..."
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

export default SafetyChatScreen;
