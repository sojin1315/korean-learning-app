import { Heart } from 'lucide-react';
import BabyIcon from './BabyIcon';

interface CompletionScreenProps {
  streak: number;
  isFirstActivityToday: boolean;
  onGoHome: () => void;
}

export default function CompletionScreen({ streak, isFirstActivityToday, onGoHome }: CompletionScreenProps) {
  const compliments = [
    '야호! 오늘도 열심히 하네요!',
    '대단해요! 계속 이렇게 해봐요!',
    '와! 정말 멋져요!',
    '최고예요! 한 번 더 해볼까요?',
    '훌륭해요! 계속 힘내세요!',
  ];

  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-7xl animate-bounce">🎉</span>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          완료했어요!
        </h1>

        {isFirstActivityToday ? (
          <>
            <p className="text-2xl text-gray-700 mb-12">
              아주 잘하셨어요
            </p>

            <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                <span className="text-5xl font-bold text-gray-800">{streak}일</span>
              </div>
              <p className="text-lg text-gray-700 font-bold">연속 달성!</p>
            </div>
          </>
        ) : (
          <p className="text-2xl text-gray-700 mb-12">
            {randomCompliment}
          </p>
        )}

        <div className="flex justify-center gap-8 mb-12">
          <div className="animate-bounce" style={{ animationDelay: '0s' }}>
            <BabyIcon expression="laughing" size={70} />
          </div>
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <BabyIcon expression="happy" size={70} />
          </div>
        </div>

        <button
          onClick={onGoHome}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white text-2xl font-bold py-6 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
