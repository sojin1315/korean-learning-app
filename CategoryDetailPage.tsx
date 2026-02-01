import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Bolt Database } from '../lib/supabase';
import BabyIcon from './BabyIcon';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

interface CategoryDetailPageProps {
  category: string;
  userName: string;
  userId: string;
  onBack: () => void;
}

interface Completion {
  id: string;
  title: string;
  content: any;
  response: string;
  completed_at: string;
}

export default function CategoryDetailPage({ category, userName, userId, onBack }: CategoryDetailPageProps) {
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryTitles: Record<string, string> = {
    learning: '새로운 정보',
    writing: '시 쓰기',
    mindfulness: '마음 돌보기',
  };

  useEffect(() => {
    fetchCompletions();
  }, [category, userId]);

  const fetchCompletions = async () => {
    const { data, error } = await Bolt Database
      .from('user_activity_completions')
      .select(`
        id,
        response,
        completed_at,
        activity_id,
        activities!inner (title, content, type)
      `)
      .eq('user_id', DEMO_USER_ID)
      .eq('activities.type', category)
      .order('completed_at', { ascending: false });

    if (!error && data) {
      const formatted = data.map((c: any) => ({
        id: c.id,
        title: c.activities.title,
        content: c.activities.content,
        response: c.response || '',
        completed_at: c.completed_at,
      }));
      setCompletions(formatted);
    }
    setLoading(false);
  };

  const renderCompletion = (completion: Completion) => {
    if (category === 'learning') {
      let cards: Array<{ front: string; back: string }> = [];
      let date = '';
      try {
        const parsed = JSON.parse(completion.response);
        cards = parsed.cards || [];
        date = parsed.date || '';
      } catch {
        return null;
      }

      return (
        <div className="space-y-4">
          {date && (
            <div className="text-sm text-gray-500 mb-2">{date}</div>
          )}
          {cards.map((card, idx) => (
            <div key={idx} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">{card.front}</h3>
              <p className="text-gray-700">{card.back}</p>
            </div>
          ))}
        </div>
      );
    } else if (category === 'writing') {
      let theme = '';
      let text = '';
      let date = '';
      try {
        const parsed = JSON.parse(completion.response);
        theme = parsed.theme || '';
        text = parsed.text || '';
        date = parsed.date || '';
      } catch {
        return null;
      }

      return (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5">
          {date && (
            <div className="text-sm text-gray-500 mb-3">{date}</div>
          )}
          <h3 className="font-bold text-gray-800 mb-3 text-lg">{theme}</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{text}</p>
        </div>
      );
    } else if (category === 'mindfulness') {
      let items: string[] = [];
      let date = '';
      try {
        const parsed = JSON.parse(completion.response);
        items = parsed.items || [];
        date = parsed.date || '';
      } catch {
        return null;
      }

      return (
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5">
          {date && (
            <div className="text-sm text-gray-500 mb-3">{date}</div>
          )}
          <h3 className="font-bold text-gray-800 mb-4 text-lg">오늘 내가 잘한 것 3가지!</h3>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="font-bold text-pink-500 text-xl">{idx + 1}</span>
                <p className="text-gray-700 flex-1">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

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
          <h1 className="text-3xl font-bold text-gray-800">{categoryTitles[category] || category}</h1>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <p className="text-gray-600">로딩 중...</p>
            </div>
          ) : completions.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex justify-center mb-6">
                <BabyIcon expression="neutral" size={80} />
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-600">아직 완료한 활동이 없습니다.</p>
                <p className="text-sm text-gray-500 mt-2">활동을 완료하면 여기에 기록이 표시됩니다!</p>
              </div>
            </div>
          ) : (
            completions.map((completion) => (
              <div key={completion.id}>
                {renderCompletion(completion)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
