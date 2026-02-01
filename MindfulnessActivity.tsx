import { ArrowLeft } from 'lucide-react';
import { Activity } from '../types';
import { useState } from 'react';
import BabyIcon from './BabyIcon';

interface MindfulnessActivityProps {
  activity: Activity;
  onBack: () => void;
  onComplete: (activityId: string, data?: Record<string, unknown>) => void;
}

export default function MindfulnessActivity({
  activity,
  onBack,
  onComplete,
}: MindfulnessActivityProps) {
  const [items, setItems] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');

  const handleAddItem = () => {
    if (currentText.trim()) {
      setItems([...items, currentText]);
      setCurrentText('');
    }
  };

  const handleComplete = () => {
    onComplete(activity.id, { items });
  };

  const canComplete = items.length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center p-4 pb-8">
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

        <div className="flex justify-center mb-12">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 flex items-center justify-center shadow-lg">
            <BabyIcon expression="loving" size={90} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-center text-xl font-bold text-gray-800 mb-8">
            마음 돌보기
          </p>

          <div className="bg-yellow-200 rounded-2xl px-6 py-4 mb-8 text-center">
            <p className="text-lg font-bold text-gray-800">오늘 내가 잘한 것 3가지!</p>
          </div>

          <div className="space-y-3 mb-6">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-yellow-100 rounded-xl p-4">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-lg text-gray-800 flex-1">{item}</p>
              </div>
            ))}

            {items.length < 3 && (
              <div className="flex items-center gap-3 bg-yellow-100 rounded-xl p-4">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {items.length + 1}
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="입력하세요"
                    className="flex-1 p-2 rounded-lg border-2 border-yellow-300 focus:outline-none focus:border-yellow-500 text-lg"
                  />
                  <button
                    onClick={handleAddItem}
                    disabled={!currentText.trim()}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    추가
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleComplete}
            disabled={!canComplete}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            완성
          </button>
        </div>
      </div>
    </div>
  );
}
