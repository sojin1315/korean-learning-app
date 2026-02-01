import { ArrowLeft } from 'lucide-react';
import { CategoryType } from '../types';
import BabyIcon from './BabyIcon';

interface CategoryPageProps {
  category: CategoryType;
  onBack: () => void;
  onSelectSubcategory: (subcategory: string) => void;
}

const subcategories: Record<CategoryType, Array<{ label: string; color: string }>> = {
  learning: [
    { label: '건강/안전', color: 'bg-pink-300' },
    { label: '돈', color: 'bg-pink-300' },
    { label: '스마트폰', color: 'bg-pink-300' },
  ],
  writing: [
    { label: '랜덤 테마', color: 'bg-blue-300' },
  ],
  mindfulness: [
    { label: '마음 돌보기', color: 'bg-pink-300' },
  ],
};

const categoryTitles: Record<CategoryType, string> = {
  learning: '새로운 정보',
  writing: '시 쓰기',
  mindfulness: '마음 돌보기',
};

const categoryBgColors: Record<CategoryType, string> = {
  learning: 'bg-gradient-to-br from-purple-100 to-purple-200',
  writing: 'bg-gradient-to-br from-blue-100 to-blue-200',
  mindfulness: 'bg-gradient-to-br from-pink-100 to-pink-200',
};

export default function CategoryPage({
  category,
  onBack,
  onSelectSubcategory,
}: CategoryPageProps) {
  const items = subcategories[category] || [];
  const bgColor = categoryBgColors[category];

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col items-center justify-center p-4 pb-8`}>
      <div className="w-full max-w-md">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {categoryTitles[category]}
          </h1>
        </div>

        <div className="flex justify-center mb-12">
          <BabyIcon expression="curious" size={70} />
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <button
              key={item.label}
              onClick={() => onSelectSubcategory(item.label)}
              className={`w-full ${item.color} hover:opacity-90 text-gray-800 font-bold text-2xl py-6 px-6 rounded-2xl shadow-lg transition-all active:scale-95`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
