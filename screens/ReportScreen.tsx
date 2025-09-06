import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const ReportScreen: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for the report
  const reportData = {
    monthlySummary: {
      danger: 5,
      warning: 12,
      info: 25,
      total: 42,
    },
    categoryBreakdown: [
      { category: '誹謗中傷', count: 15, color: 'bg-yellow-400' },
      { category: '個人情報', count: 10, color: 'bg-blue-400' },
      { category: '出会い誘導', count: 8, color: 'bg-red-400' },
      { category: '詐欺', count: 5, color: 'bg-purple-400' },
      { category: '画像', count: 4, color: 'bg-green-400' },
    ],
    weeklyTrend: [
      { week: '4週間前', count: 8 },
      { week: '3週間前', count: 12 },
      { week: '2週間前', count: 7 },
      { week: '先週', count: 15 },
    ],
  };
  
  const averageDetections = 30; // Mock average for comparison

  const getComparisonText = () => {
    if (reportData.monthlySummary.total > averageDetections * 1.2) {
      return { text: '多い', style: 'text-red-600 font-bold' };
    }
    if (reportData.monthlySummary.total < averageDetections * 0.8) {
      return { text: '少ない', style: 'text-green-600 font-bold' };
    }
    return { text: '平均的', style: 'text-gray-800 font-bold' };
  };

  const comparison = getComparisonText();

  const getRecommendations = () => {
    const topCategory = [...reportData.categoryBreakdown].sort((a, b) => b.count - a.count)[0];

    switch (topCategory.category) {
      case '誹謗中傷':
        return {
          title: '「誹謗中傷」に関する対策',
          description: 'いじめや悪口に関する検知が最も多いようです。お子さんとネット上での言葉遣いについて話し合う良い機会かもしれません。',
          actions: [
            { text: '親子ルールガイドを見る', onClick: () => navigate('/rule-guide') },
            { text: 'いじめに関するルールを追加する', onClick: () => navigate('/settings/rule/new') },
          ],
        };
      case '個人情報':
        return {
          title: '「個人情報」に関する対策',
          description: '個人情報の漏洩に関する検知が多いようです。ネット上で本名や住所を公開する危険性について、改めて話し合ってみましょう。',
          actions: [
            { text: '親子ルールガイドを見る', onClick: () => navigate('/rule-guide') },
          ],
        };
      case '出会い誘導':
        return {
          title: '「出会い誘導」に関する対策',
          description: '知らない人とのやり取りに繋がる検知が多いです。ネットで知り合った人と会うことの危険性について話し合いましょう。',
          actions: [
            { text: '親子ルールガイドを見る', onClick: () => navigate('/rule-guide') },
            { text: '知らない人との連絡を制限するルールを追加', onClick: () => navigate('/settings/rule/new') },
          ],
        };
      default:
        return {
          title: '一般的な対策',
          description: '全体的な傾向を把握し、お子さんと定期的にネットの利用状況について話し合うことをお勧めします。',
          actions: [
            { text: '親子ルールガイドを確認する', onClick: () => navigate('/rule-guide') },
          ],
        };
    }
  };

  const recommendations = getRecommendations();

  const totalCategoryCount = reportData.categoryBreakdown.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
        <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2" aria-label="ダッシュボードに戻る">
          <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-center flex-grow -ml-4">統計・集計レポート</h1>
      </header>

      <main className="p-4 space-y-6 pb-8">
        {/* Monthly Summary */}
        <section className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">今月の検知サマリー</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">合計検知数</p>
              <p className="text-4xl font-bold text-gray-800">{reportData.monthlySummary.total}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-medium"><span className="text-red-500">●</span> 危険: {reportData.monthlySummary.danger}件</p>
              <p className="text-sm font-medium"><span className="text-yellow-500">●</span> 注意: {reportData.monthlySummary.warning}件</p>
              <p className="text-sm font-medium"><span className="text-blue-500">●</span> 情報: {reportData.monthlySummary.info}件</p>
            </div>
          </div>
        </section>

        {/* Comparison with others */}
        <section className="bg-white p-5 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">他ユーザーとの比較</h2>
            <p className="text-gray-700">
                今月の検知数は、同年代のお子様を持つご家庭と比べて 
                <span className={comparison.style}>{comparison.text}</span>
                です。
            </p>
        </section>

        {/* Recommended Actions */}
        <section className="bg-blue-50 p-5 rounded-2xl border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">{recommendations.title}</h2>
          <p className="text-sm text-blue-700 mb-4">{recommendations.description}</p>
          <div className="space-y-2">
              {recommendations.actions.map((action, index) => (
                  <button key={index} onClick={action.onClick} className="w-full text-left text-sm font-semibold text-blue-600 hover:text-blue-800 bg-white p-3 rounded-lg shadow-sm border border-blue-200 flex justify-between items-center">
                      <span>{action.text}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
              ))}
          </div>
        </section>

        {/* Category Breakdown */}
        <section className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">カテゴリ別割合</h2>
          <div className="space-y-3">
            {reportData.categoryBreakdown.map(item => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-500">{item.count}件</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${(item.count / totalCategoryCount) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Trend */}
        <section className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">週ごとの検知数の推移</h2>
          <div className="flex justify-around items-end h-32 px-2 pt-4 border-l border-b border-gray-200">
            {reportData.weeklyTrend.map(item => (
              <div key={item.week} className="flex flex-col items-center flex-grow relative h-full">
                <div className="w-3/5 bg-blue-400 rounded-t-sm" style={{ height: `${Math.min(item.count * 6, 100)}%` }}></div>
                <p className="text-[10px] text-gray-500 mt-1 absolute -bottom-5">{item.week}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default ReportScreen;