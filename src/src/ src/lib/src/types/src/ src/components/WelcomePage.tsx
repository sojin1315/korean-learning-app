import { Heart } from 'lucide-react';
import BabyIcon from './BabyIcon';
import { useState, useEffect } from 'react';

interface WelcomePageProps {
  streak: number;
  displayName: string;
  onContinue: () => void;
  onNavigateToHub: () => void;
}

export default function WelcomePage({ streak, displayName, onContinue, onNavigateToHub }: WelcomePageProps) {
  const [isWinking, setIsWinking] = useState(false);

  useEffect(() => {
    const winkInterval = setInterval(() => {
      setIsWinking(true);
      setTimeout(() => {
        setIsWinking(false);
      }, 200);
    }, 3000);

    return () => clearInterval(winkInterval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-800">Tehet!</h1>
          </div>
          <div className="flex flex-col items-center">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500 mb-1" />
            <span className="text-2xl font-bold text-gray-800">{streak}일</span>
          </div>
        </div>

        <p className="text-2xl font-bold text-gray-800 mb-8">
          안녕하세요, {displayName}님!
        </p>

        <div className="flex justify-center mb-12">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center shadow-lg">
            <BabyIcon expression={isWinking ? "winking" : "happy"} size={140} />
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-90 text-white text-2xl font-bold py-6 px-6 rounded-3xl shadow-lg transition-all active:scale-95"
          >
            시작하기
          </button>

          <button
            onClick={onNavigateToHub}
            className="w-full bg-gradient-to-r from-orange-300 to-yellow-300 hover:opacity-90 text-gray-800 text-xl font-bold py-5 px-6 rounded-3xl shadow-lg transition-all active:scale-95"
          >
            홈
          </button>
        </div>
      </div>
    </div>
  );
}
