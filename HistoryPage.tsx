import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import BabyIcon from './BabyIcon';

interface HistoryPageProps {
  totalActivities: number;
  onBack: () => void;
  onSelectCategory: (category: string) => void;
}

export default function HistoryPage({ totalActivities, onBack, onSelectCategory }: HistoryPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-4 pb-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">학습 기록</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <BabyIcon expression="excited" size={80} />
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-teal-100 rounded-full px-6 py-3 mb-4">
              <Sparkles className="w-5 h-5 text-green-600" />
              <p className="text-lg font-bold text-gray-800">
                총 {totalActivities}개의 활동을 완료했어요!
              </p>
            </div>

            <p className="text-gray-600 text-lg">
              정말 대단해요~ 계속 이렇게 열심히 해봐요!
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => onSelectCategory('learning')}
              className="w-full bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg transition-all active:scale-95"
            >
              <BookOpen className="w-6 h-6 text-green-600 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-gray-800 mb-2">새로운 정보</h3>
                <p className="text-sm text-gray-600">
                  건강, 돈, 스마트폰에 대한 유용한 지식을 배웠어요!
                </p>
              </div>
            </button>

            <button
              onClick={() => onSelectCategory('writing')}
              className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg transition-all active:scale-95"
            >
              <BookOpen className="w-6 h-6 text-blue-600 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-gray-800 mb-2">시 쓰기</h3>
                <p className="text-sm text-gray-600">
                  창의적인 글쓰기로 마음을 표현했어요!
                </p>
              </div>
            </button>

            <button
              onClick={() => onSelectCategory('mindfulness')}
              className="w-full bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg transition-all active:scale-95"
            >
              <BookOpen className="w-6 h-6 text-pink-600 mt-1" />
              <div className="text-left">
                <h3 className="font-bold text-gray-800 mb-2">마음 돌보기</h3>
                <p className="text-sm text-gray-600">
                  감사한 마음을 기록하며 긍정적인 에너지를 얻었어요!
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block bg-yellow-100 rounded-2xl px-6 py-4">
              <p className="text-sm text-gray-700">
                앞으로도 함께 배우고 성장해요! 테헷~
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
