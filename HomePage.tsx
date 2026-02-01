import { CategoryType } from '../types';
import { ArrowLeft } from 'lucide-react';
import BabyIcon from './BabyIcon';

interface HomePageProps {
  onSelectCategory: (category: CategoryType) => void;
  onBack: () => void;
}

export default function HomePage({ onSelectCategory, onBack }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <BabyIcon expression="neutral" size={80} />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-12">
          오늘은 무엇을 배울까요?
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => onSelectCategory('learning')}
            className="w-full bg-purple-300 hover:bg-purple-400 text-gray-800 font-bold text-2xl py-6 px-6 rounded-3xl shadow-lg transition-all active:scale-95"
          >
            새로운 정보
          </button>

          <button
            onClick={() => onSelectCategory('writing')}
            className="w-full bg-blue-400 hover:bg-blue-500 text-gray-800 font-bold text-2xl py-6 px-6 rounded-3xl shadow-lg transition-all active:scale-95"
          >
            시 쓰기
          </button>

          <button
            onClick={() => onSelectCategory('mindfulness')}
            className="w-full bg-pink-400 hover:bg-pink-500 text-gray-800 font-bold text-2xl py-6 px-6 rounded-3xl shadow-lg transition-all active:scale-95"
          >
            마음 돌보기
          </button>
        </div>
      </div>
    </div>
  );
}
