import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { mockAlerts } from '../data/alerts';
import { AlertSeverity } from '../types';
import ConsultationModal from '../components/ConsultationModal';

const AlertDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const alert = mockAlerts.find(a => a.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!alert) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-50 p-6 text-center">
        <Icon name="alert-triangle" className="w-12 h-12 text-yellow-500 mb-4" />
        <h1 className="text-xl font-bold text-gray-800">アラートが見つかりません</h1>
        <p className="text-gray-600 mt-2">このアラートは削除されたか、存在しない可能性があります。</p>
        <button 
          onClick={() => navigate('/dashboard')} 
          className="mt-6 bg-[#00B39F] text-white py-2 px-4 rounded-lg font-semibold"
        >
          ダッシュボードに戻る
        </button>
      </div>
    );
  }

  const severityStyles = {
    [AlertSeverity.Danger]: {
      icon: 'shield-alert' as const,
      iconColor: 'text-[#E5484D]',
      bgColor: 'bg-red-100',
      title: '危険なメッセージを検知しました'
    },
    [AlertSeverity.Warning]: {
      icon: 'alert-triangle' as const,
      iconColor: 'text-[#FFB020]',
      bgColor: 'bg-yellow-100',
      title: '注意が必要なやり取りを検知しました'
    },
    [AlertSeverity.Info]: {
      icon: 'info' as const,
      iconColor: 'text-[#2E6EE6]',
      bgColor: 'bg-blue-100',
      title: '情報提供'
    },
  }

  const currentSeverity = severityStyles[alert.severity];
  const hasConversation = alert.conversation && alert.conversation.length > 0;

  return (
    <>
      <div className="bg-[#F9FAFB] min-h-full">
        <header className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 px-4 pt-8 pb-4 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2" aria-label="前に戻る">
            <Icon name="chevron-left" className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-center flex-grow -ml-4">検知通知</h1>
        </header>

        <main className="p-5">
          <div className="text-center">
            <div className={`inline-block p-4 ${currentSeverity.bgColor} rounded-full`}>
              <Icon name={currentSeverity.icon} className={`w-12 h-12 ${currentSeverity.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4" dangerouslySetInnerHTML={{ __html: currentSeverity.title.replace('を検知しました', 'を<br />検知しました') }}></h2>
            <p className="text-gray-600 mt-2 font-semibold">{alert.summary}</p>
            <p className="text-sm text-gray-400 mt-1">{alert.timestamp} | {alert.app}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl mt-6 border border-gray-200">
              <h3 className="font-bold text-gray-800">検知内容の詳細</h3>
              <p className="mt-2 text-gray-600 text-[15px]">{alert.details}</p>
          </div>

          <div className="bg-[#E6F0FF] p-5 rounded-2xl mt-6">
            <h3 className="font-bold text-[#1F56C2]">お子さんへの声かけのヒント</h3>
            <ol className="list-decimal list-inside mt-3 space-y-3 text-gray-700 text-[15px]">
              <li>まずは叱らずに「どんなやり取りだったの？」と話を聞く</li>
              <li>危険な相手から守るために一緒に内容を確認する</li>
              <li>「困ったときはすぐ相談していいんだよ」と安心させる</li>
            </ol>
            <button onClick={() => navigate('/rule-guide')} className="text-[#1F56C2] font-semibold mt-4 block text-sm">詳しい親子ルールガイドを見る</button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => hasConversation && navigate(`/alert/${alert.id}/conversation`)}
              disabled={!hasConversation}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-lg text-gray-800 font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="eye" className="w-5 h-5" />
              詳細を見る
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-lg text-gray-800 font-semibold shadow-sm"
            >
              <Icon name="message-circle" className="w-5 h-5" />
              相談する
            </button>
          </div>
          <button onClick={() => navigate('/settings')} className="w-full text-center py-3 mt-4 text-sm text-[#2E6EE6] font-semibold">
            通知設定を変更
          </button>
        </main>
      </div>
      {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default AlertDetailScreen;