import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const RuleGuideScreen: React.FC = () => {
  const navigate = useNavigate();

  const GuideSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="bg-white p-5 rounded-2xl shadow-sm">
      <h2 className="text-lg font-bold text-[#1F56C2] mb-3">{title}</h2>
      <div className="space-y-2 text-gray-700">{children}</div>
    </section>
  );

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">親子ルールガイド</h1>
      </header>

      <main className="p-4 space-y-5 pb-8">
        <GuideSection title="① 個人情報を守る">
          <p>本名、住所、電話番号、学校名などの個人情報は、絶対に教えないように約束しましょう。</p>
          <p className="text-sm p-3 bg-gray-100 rounded-lg"><strong>声かけ例:</strong> 「知らない人に自分の大事な情報を教えると、危ないことに巻き込まれるかもしれないから、絶対に教えないでね。」</p>
        </GuideSection>

        <GuideSection title="② 知らない人と会わない">
          <p>ネットで知り合った人とは、絶対に会わないように伝えましょう。相手が子供でも油断は禁物です。</p>
          <p className="text-sm p-3 bg-gray-100 rounded-lg"><strong>声かけ例:</strong> 「ネットの向こうの人が本当に言っている通りの人かは分からないよ。会おうと言われても、まずはお父さん・お母さんに相談してね。」</p>
        </GuideSection>

        <GuideSection title="③ 悪口や写真を勝手に載せない">
          <p>人が嫌がるような悪口を書いたり、友達の写真を許可なく載せたりしないように教えましょう。</p>
          <p className="text-sm p-3 bg-gray-100 rounded-lg"><strong>声かけ例:</strong> 「自分が言われたら嫌なことは、ネットでも書いちゃだめだよ。お友達の写真を載せるときは、必ず本人に聞いてからにしようね。」</p>
        </GuideSection>
        
        <GuideSection title="④ 困ったときはすぐに相談する">
          <p>何か少しでも「変だな」「怖いな」と感じたら、すぐに保護者に相談するように伝え、安心できる環境を作りましょう。</p>
          <p className="text-sm p-3 bg-gray-100 rounded-lg"><strong>声かけ例:</strong> 「ネットで嫌なことがあったり、困ったりしたら、絶対に一人で悩まないで。どんなことでも、必ず話を聞くからね。」</p>
        </GuideSection>

        <div className="text-center mt-6">
            <button onClick={() => navigate(-1)} className="bg-[#00B39F] text-white py-3 px-8 rounded-lg font-semibold">
                戻る
            </button>
        </div>
      </main>
    </div>
  );
};

export default RuleGuideScreen;