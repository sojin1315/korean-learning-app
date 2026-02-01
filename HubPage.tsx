import { ArrowLeft } from 'lucide-react';
import BabyIcon from './BabyIcon';

interface HubPageProps {
  onBack: () => void;
  onNavigate: (page: 'pg5' | 'pg6' | 'pg7') => void;
}

export default function HubPage({ onBack, onNavigate }: HubPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">홈</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            어디로 갈까요?
          </h2>

          <div className="flex justify-center gap-6 mb-12">
            <div className="animate-bounce-slow">
              <BabyIcon expression="happy" size={70} />
            </div>
            <div className="animate-bounce-slow animation-delay-300">
              <BabyIcon expression="excited" size={70} />
            </div>
            <div className="animate-bounce-slow animation-delay-600">
              <BabyIcon expression="curious" size={70} />
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onNavigate('pg5')}
              className="w-full bg-gradient-to-r from-blue-300 to-blue-400 hover:opacity-90 text-gray-800 font-bold text-xl py-5 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              나의 프로필
            </button>

            <button
              onClick={() => onNavigate('pg6')}
              className="w-full bg-gradient-to-r from-green-300 to-green-400 hover:opacity-90 text-gray-800 font-bold text-xl py-5 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              학습 기록
            </button>

            <button
              onClick={() => onNavigate('pg7')}
              className="w-full bg-gradient-to-r from-purple-300 to-purple-400 hover:opacity-90 text-gray-800 font-bold text-xl py-5 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
