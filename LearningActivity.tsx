import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Activity } from '../types';
import FlipCard from './FlipCard';
import BabyIcon from './BabyIcon';

interface LearningActivityProps {
  activity: Activity;
  onBack: () => void;
  onComplete: (activityId: string, data?: Record<string, unknown>) => void;
}

export default function LearningActivity({
  activity,
  onBack,
  onComplete,
}: LearningActivityProps) {
  const [currentCards, setCurrentCards] = useState<Array<{ front: string; back: string }>>([]);

  const cardsByCategory: Record<string, Array<{ front: string; back: string }>> = {
    '건강/안전': [
      { front: '하루에 물을 얼마나 섭취해야될까요?', back: '하루에 물 8잔(약 2리터)을 마시면 건강에 좋아요!' },
      { front: '언제 손을 씻어야 할까요?', back: '밥 먹기 전과 화장실 후에는 꼭 손을 씻어야 해요!' },
      { front: '길을 건널 때 어떻게 해야 할까요?', back: '횡단보도에서 좌우를 살피고 신호를 지켜요!' },
      { front: '하루에 몇 시간 자야 할까요?', back: '하루 7-8시간 이상 자면 건강에 좋아요!' },
      { front: '매일 운동을 얼마나 해야 할까요?', back: '매일 30분 이상 걸으면 건강에 좋아요!' },
      { front: '과일을 먹으면 무엇을 얻을 수 있을까요?', back: '매일 과일을 먹으면 비타민을 얻을 수 있어요!' },
      { front: '낙상을 예방하려면 어떻게 해야 할까요?', back: '미끄럽지 않은 신발을 신고 천천히 걸어요!' },
      { front: '응급 상황에서는 어떻게 해야 할까요?', back: '119에 전화하고 침착하게 상황을 설명해요!' },
      { front: '약을 먹을 때 주의할 점은?', back: '의사나 약사의 지시대로 정확한 시간에 먹어요!' },
    ],
    '돈': [
      { front: '용돈을 받으면 어떻게 해야 할까요?', back: '용돈의 일부를 먼저 저축하는 습관을 들여요!' },
      { front: '필요한 것과 원하는 것의 차이는?', back: '꼭 필요한 것을 먼저 사고, 원하는 것은 나중에 사요!' },
      { front: '물건을 사면 무엇을 확인해야 할까요?', back: '물건을 사면 영수증을 받고 확인하는 습관을 들여요!' },
      { front: '저축을 하면 어떤 점이 좋을까요?', back: '미래를 위해 돈을 모으면 큰 목표를 이룰 수 있어요!' },
      { front: '카드와 현금 중 어떤 게 좋을까요?', back: '지출을 잘 관리하려면 현금을 사용하는 게 좋아요!' },
      { front: '할인이나 세일을 볼 때 주의할 점은?', back: '정말 필요한 물건인지 먼저 생각하고 구매해요!' },
      { front: '연금을 관리하는 좋은 방법은?', back: '통장을 나눠서 생활비, 비상금, 저축을 구분해요!' },
      { front: '사기를 예방하려면 어떻게 해야 할까요?', back: '모르는 사람에게 개인정보나 돈을 주지 않아요!' },
      { front: '월세나 공과금은 언제 내야 할까요?', back: '매달 정해진 날짜에 꼭 납부해요!' },
    ],
    '스마트폰': [
      { front: '카카오톡으로 사진을 어떻게 보낼까요?', back: '채팅방에서 + 버튼을 누르고 사진을 선택해요!' },
      { front: '전화가 왔을 때는 어떻게 할까요?', back: '초록색 버튼을 오른쪽으로 밀어서 받아요!' },
      { front: '문자 메시지는 어떻게 보낼까요?', back: '메시지 앱을 열고 연락처를 선택해 내용을 입력해요!' },
      { front: '스마트폰 배터리를 오래 쓰려면?', back: '사용하지 않는 앱은 종료하고 밝기를 줄여요!' },
      { front: '인터넷을 검색하려면 어떻게 해야 할까요?', back: '네이버나 구글 앱을 열고 검색창에 입력해요!' },
      { front: '앱을 설치하려면 어떻게 해야 할까요?', back: '플레이스토어나 앱스토어에서 검색해 설치해요!' },
      { front: '스마트폰이 느려졌을 때는?', back: '사용하지 않는 앱을 삭제하고 재시작해요!' },
      { front: '알람을 설정하려면 어떻게 할까요?', back: '시계 앱을 열고 알람 추가 버튼을 눌러요!' },
      { front: '스마트폰을 안전하게 사용하려면?', back: '비밀번호를 설정하고 모르는 링크를 클릭하지 않아요!' },
    ],
  };

  const [allCards] = useState<Array<{ front: string; back: string }>>(
    cardsByCategory[activity.subcategory || '건강/안전'] || cardsByCategory['건강/안전']
  );

  useEffect(() => {
    loadRandomCards();
  }, []);

  const loadRandomCards = () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffled.slice(0, 3));
  };

  const handleComplete = () => {
    onComplete(activity.id, { cards: currentCards });
    loadRandomCards();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 p-4 pb-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8 sticky top-4 z-10">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{activity.title}</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex justify-center gap-3 mb-8">
            <BabyIcon expression="curious" size={50} />
            <div className="bg-yellow-200 rounded-2xl px-6 py-4 flex items-center">
              <p className="text-lg font-bold text-gray-800">오늘의 정보는?</p>
            </div>
            <BabyIcon expression="happy" size={50} />
          </div>

          <div className="space-y-6 mb-8">
            {currentCards.map((card, index) => (
              <FlipCard
                key={`${card.front}-${index}`}
                front={card.front}
                back={card.back}
              />
            ))}
          </div>

          <div className="text-center text-sm text-gray-600 mb-6">
            카드를 클릭하여 정보를 확인하세요
          </div>

          <button
            onClick={handleComplete}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
