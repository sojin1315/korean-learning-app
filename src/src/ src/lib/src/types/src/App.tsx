import { useState, useEffect } from 'react';
import SignUpPage from './components/SignUpPage';
import WelcomePage from './components/WelcomePage';
import CategoryPage from './components/CategoryPage';
import HomePage from './components/HomePage';
import HubPage from './components/HubPage';
import LearningActivity from './components/LearningActivity';
import WritingActivity from './components/WritingActivity';
import MindfulnessActivity from './components/MindfulnessActivity';
import CompletionScreen from './components/CompletionScreen';
import HistoryPage from './components/HistoryPage';
import ProfilePage from './components/ProfilePage';
import CategoryDetailPage from './components/CategoryDetailPage';
import SettingsPage from './components/SettingsPage';
import { CategoryType, Activity } from './types';
import { Bolt Database } from './lib/supabase';

const DEMO_USER_ID = '00000000-0000-0000-0000-000000000001';

type PageType = 'signup' | 'welcome' | 'category' | 'home' | 'hub' | 'activity' | 'completion' | 'history' | 'profile' | 'categoryDetail' | 'settings';

const mockActivities: Record<string, Activity> = {
  'health': {
    id: 'health-1',
    title: '건강/안전',
    category: 'learning',
    subcategory: '건강/안전',
    content: {
      cards: [
        { front: '하루 물 섭취량', back: '하루에 물 8잔(약 2리터)을 마시면 건강에 좋아요!' },
        { front: '손 씻기', back: '밥 먹기 전과 화장실 후에는 꼭 손을 씻어야 해요!' },
        { front: '안전한 길 건너기', back: '횡단보도에서 좌우를 살피고 신호를 지켜요!' },
      ]
    },
    points: 10,
    difficulty: 1,
  },
  'money': {
    id: 'money-1',
    title: '돈',
    category: 'learning',
    subcategory: '돈',
    content: {
      cards: [
        { front: '저축하기', back: '용돈을 받으면 일부를 저축하는 습관을 들여요!' },
        { front: '필요한 것과 원하는 것', back: '꼭 필요한 것을 먼저 사고, 원하는 것은 나중에 사요!' },
        { front: '영수증 확인', back: '물건을 사면 영수증을 확인하는 습관을 들여요!' },
      ]
    },
    points: 10,
    difficulty: 1,
  },
  'smartphone': {
    id: 'smartphone-1',
    title: '스마트폰',
    category: 'learning',
    subcategory: '스마트폰',
    content: {
      cards: [
        { front: '스마트폰 사용 시간', back: '하루 2시간 이내로 사용하는 것이 좋아요!' },
        { front: '개인정보 보호', back: '모르는 사람에게 전화번호나 주소를 알려주면 안 돼요!' },
        { front: '앱 다운로드', back: '앱을 다운받을 때는 보호자와 상의해요!' },
      ]
    },
    points: 10,
    difficulty: 1,
  },
  'writing': {
    id: 'writing-1',
    title: '시 쓰기',
    category: 'writing',
    subcategory: '랜덤 테마',
    content: {
      themes: ['자연', '사랑', '가족', '계절', '추억', '꿈', '우정', '감사', '변화', '희망'],
    },
    points: 15,
    difficulty: 2,
  },
  'mindfulness': {
    id: 'mindfulness-1',
    title: '마음 돌보기',
    category: 'mindfulness',
    subcategory: '마음 돌보기',
    content: {},
    points: 10,
    difficulty: 1,
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('learning');
  const [selectedDetailCategory, setSelectedDetailCategory] = useState<string>('');
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [isFirstActivityToday, setIsFirstActivityToday] = useState(true);
  const [userProfile, setUserProfile] = useState({
    displayName: '',
    streak: 0,
    lastActivityDate: '',
    email: '',
    phoneNumber: '',
    birthdate: '',
    gender: '',
  });

  useEffect(() => {
    const hasSignedUp = localStorage.getItem('hasSignedUp');
    const savedProfile = localStorage.getItem('userProfile');
    const savedCount = localStorage.getItem('completedCount');

    if (hasSignedUp && savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
      setCurrentPage('home');
    } else {
      setCurrentPage('welcome');
    }

    if (savedCount) {
      setCompletedCount(parseInt(savedCount, 10));
    }
  }, []);

  const handleSignUpComplete = async (profileData: {
    display_name: string;
    email?: string;
    password?: string;
    phone_number?: string;
    birthdate?: string;
    gender?: string;
  }) => {
    const profile = {
      displayName: profileData.display_name,
      streak: 0,
      lastActivityDate: '',
    };

    setUserProfile(profile);
    localStorage.setItem('hasSignedUp', 'true');
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setCurrentPage('welcome');
  };

  const handleContinue = () => {
    const hasSignedUp = localStorage.getItem('hasSignedUp');
    if (!hasSignedUp) {
      setCurrentPage('signup');
    } else {
      setCurrentPage('home');
    }
  };

  const handleSelectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setCurrentPage('category');
  };

  const handleSelectSubcategory = (subcategory: string) => {
    let activityKey = '';

    if (subcategory === '건강/안전') activityKey = 'health';
    else if (subcategory === '돈') activityKey = 'money';
    else if (subcategory === '스마트폰') activityKey = 'smartphone';
    else if (subcategory === '랜덤 테마') activityKey = 'writing';
    else if (subcategory === '마음 돌보기') activityKey = 'mindfulness';

    if (activityKey && mockActivities[activityKey]) {
      setCurrentActivity(mockActivities[activityKey]);
      setCurrentPage('activity');
    }
  };

  const handleActivityComplete = async (activityId: string, data?: Record<string, unknown>) => {
    const today = new Date().toDateString();
    const lastDate = userProfile.lastActivityDate;

    let newStreak = userProfile.streak;
    let isFirstToday = false;

    if (lastDate !== today) {
      isFirstToday = true;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      if (lastDate === yesterdayStr) {
        newStreak += 1;
      } else if (lastDate === '') {
        newStreak = 1;
      } else {
        newStreak = 1;
      }
    }

    const newProfile = {
      ...userProfile,
      streak: newStreak,
      lastActivityDate: today
    };
    setUserProfile(newProfile);
    localStorage.setItem('userProfile', JSON.stringify(newProfile));

    const newCount = completedCount + 1;
    setCompletedCount(newCount);
    localStorage.setItem('completedCount', newCount.toString());

    if (currentActivity) {
      let query = Bolt Database
        .from('activities')
        .select('id')
        .eq('type', currentActivity.category);

      if (currentActivity.subcategory) {
        query = query.eq('subcategory', currentActivity.subcategory);
      }

      const { data: activityData } = await query.maybeSingle();

      if (activityData) {
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

        let response = '';
        if (data?.text) {
          response = JSON.stringify({ date: dateStr, theme: data.theme, text: data.text });
        } else if (data?.items && Array.isArray(data.items)) {
          response = JSON.stringify({ date: dateStr, items: data.items });
        } else if (data?.cards && Array.isArray(data.cards)) {
          response = JSON.stringify({ date: dateStr, cards: data.cards });
        } else {
          response = 'Completed';
        }

        await Bolt Database
          .from('user_activity_completions')
          .insert({
            user_id: DEMO_USER_ID,
            activity_id: activityData.id,
            response: response,
          });
      }
    }

    setIsFirstActivityToday(isFirstToday);
    setCurrentPage('completion');
  };

  const handleHubNavigate = (page: 'pg5' | 'pg6' | 'pg7') => {
    if (page === 'pg5') {
      setCurrentPage('profile');
    } else if (page === 'pg6') {
      setCurrentPage('history');
    } else if (page === 'pg7') {
      setCurrentPage('settings');
    }
  };

  const handleSaveSettings = (profile: any) => {
    const updatedProfile = { ...userProfile, ...profile };
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setCurrentPage('hub');
  };

  return (
    <>
      {currentPage === 'signup' && (
        <SignUpPage
          userId="temp-user-id"
          onComplete={handleSignUpComplete}
        />
      )}

      {currentPage === 'welcome' && (
        <WelcomePage
          streak={userProfile.streak}
          displayName={userProfile.displayName}
          onContinue={handleContinue}
          onNavigateToHub={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'home' && (
        <HomePage
          onSelectCategory={handleSelectCategory}
          onBack={() => setCurrentPage('welcome')}
        />
      )}

      {currentPage === 'category' && (
        <CategoryPage
          category={selectedCategory}
          onBack={() => setCurrentPage('home')}
          onSelectSubcategory={handleSelectSubcategory}
        />
      )}

      {currentPage === 'activity' && currentActivity && (
        <>
          {currentActivity.category === 'learning' && (
            <LearningActivity
              activity={currentActivity}
              onBack={() => setCurrentPage('category')}
              onComplete={handleActivityComplete}
            />
          )}
          {currentActivity.category === 'writing' && (
            <WritingActivity
              activity={currentActivity}
              onBack={() => setCurrentPage('category')}
              onComplete={handleActivityComplete}
            />
          )}
          {currentActivity.category === 'mindfulness' && (
            <MindfulnessActivity
              activity={currentActivity}
              onBack={() => setCurrentPage('category')}
              onComplete={handleActivityComplete}
            />
          )}
        </>
      )}

      {currentPage === 'completion' && (
        <CompletionScreen
          streak={userProfile.streak}
          isFirstActivityToday={isFirstActivityToday}
          onGoHome={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'hub' && (
        <HubPage
          onBack={() => setCurrentPage('welcome')}
          onNavigate={handleHubNavigate}
        />
      )}

      {currentPage === 'history' && (
        <HistoryPage
          totalActivities={completedCount}
          onBack={() => setCurrentPage('hub')}
          onSelectCategory={(category) => {
            setSelectedDetailCategory(category);
            setCurrentPage('categoryDetail');
          }}
        />
      )}

      {currentPage === 'categoryDetail' && (
        <CategoryDetailPage
          category={selectedDetailCategory}
          userName={userProfile.displayName}
          userId="temp-user-id"
          onBack={() => setCurrentPage('history')}
        />
      )}

      {currentPage === 'profile' && (
        <ProfilePage
          userName={userProfile.displayName}
          email={userProfile.email}
          phoneNumber={userProfile.phoneNumber}
          birthdate={userProfile.birthdate}
          gender={userProfile.gender}
          streak={userProfile.streak}
          longestStreak={userProfile.streak}
          totalActivities={completedCount}
          onBack={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'settings' && (
        <SettingsPage
          currentProfile={{
            displayName: userProfile.displayName,
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber,
            birthdate: userProfile.birthdate,
            gender: userProfile.gender,
          }}
          onSave={handleSaveSettings}
          onBack={() => setCurrentPage('hub')}
        />
      )}
    </>
  );
}
