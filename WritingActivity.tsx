import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Activity } from '../types';
import { useState, useEffect } from 'react';
import BabyIcon from './BabyIcon';

interface WritingActivityProps {
  activity: Activity;
  onBack: () => void;
  onComplete: (activityId: string, data?: Record<string, unknown>) => void;
}

export default function WritingActivity({
  activity,
  onBack,
  onComplete,
}: WritingActivityProps) {
  const [userText, setUserText] = useState('');
  const [currentTheme, setCurrentTheme] = useState('');

  const content = activity.content as {
    themes: string[];
  };

  const themes = content.themes || [
    '자연 (Nature)',
    '사랑 (Love)',
    '가족 (Family)',
    '계절 (Seasons)',
    '추억 (Memories)',
    '꿈 (Dreams)',
    '우정 (Friendship)',
    '감사 (Gratitude)',
    '변화 (Change)',
    '희망 (Hope)',
  ];

  useEffect(() => {
    selectRandomTheme();
  }, []);

  const selectRandomTheme = () => {
    const randomIndex = Math.floor(Math.random() * themes.length);
    setCurrentTheme(themes[randomIndex]);
  };

  const handleComplete = () => {
    onComplete(activity.id, { text: userText, theme: currentTheme });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4 pb-8">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{activity.title}</h1>
        </div>

        <div className="bg-cyan-300 rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex justify-center gap-3 mb-8">
            <BabyIcon expression="curious" size={45} />
            <div className="bg-white rounded-2xl px-6 py-4">
              <p className="text-lg font-bold text-gray-800 text-center">
                랜덤 테마
              </p>
            </div>
            <BabyIcon expression="happy" size={45} />
          </div>

          <div className="bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-bold text-gray-800">{currentTheme}</p>
              <button
                onClick={selectRandomTheme}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
                title="다른 테마 선택"
              >
                <RefreshCw className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="bg-cyan-100 rounded-2xl p-6 mb-6">
            <textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="테마에 맞는 시를 작성해보세요..."
              className="w-full p-4 rounded-xl border-2 border-cyan-300 resize-none focus:outline-none focus:border-cyan-500 text-lg bg-white"
              rows={8}
            />
          </div>

          <button
            onClick={handleComplete}
            disabled={!userText.trim()}
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            완성
          </button>
        </div>
      </div>
    </div>
  );
}
