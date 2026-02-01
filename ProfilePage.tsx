import { ArrowLeft, Calendar, Users, Award, Mail, Phone } from 'lucide-react';
import BabyIcon from './BabyIcon';

interface ProfilePageProps {
  userName: string;
  email?: string | null;
  phoneNumber?: string | null;
  birthdate?: string | null;
  gender?: string | null;
  streak: number;
  longestStreak: number;
  totalActivities: number;
  onBack: () => void;
}

export default function ProfilePage({
  userName,
  email,
  phoneNumber,
  birthdate,
  gender,
  streak,
  longestStreak,
  totalActivities,
  onBack,
}: ProfilePageProps) {
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return '미입력';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col p-4 pb-8">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">나의 프로필</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative" style={{ minHeight: '70vh' }}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl px-6 py-3 shadow-lg border-4 border-gray-800 z-10">
              <p className="text-xl font-bold text-gray-800 whitespace-nowrap">
                안녕하세요 {userName}!
              </p>
              <div className="absolute bottom-0 left-8 transform translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
            <div style={{ animation: 'wave 1s ease-in-out infinite' }}>
              <BabyIcon expression="happy" size={384} />
            </div>
          </div>
          <style>{`
            @keyframes wave {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-10deg); }
              75% { transform: rotate(10deg); }
            }
          `}</style>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 mt-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {userName}
          </h2>

          <div className="space-y-3 mb-6">
            {email && (
              <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-4">
                <Mail className="w-6 h-6 text-green-500" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm text-gray-600 font-semibold">이메일</p>
                  <p className="text-base text-gray-800 truncate">{email}</p>
                </div>
              </div>
            )}

            {phoneNumber && (
              <div className="bg-orange-50 rounded-2xl p-4 flex items-center gap-4">
                <Phone className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">휴대폰</p>
                  <p className="text-base text-gray-800">{phoneNumber}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-2xl p-4 flex items-center gap-4">
              <Calendar className="w-6 h-6 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">생년월일</p>
                <p className="text-base text-gray-800">{formatDate(birthdate)}</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 flex items-center gap-4">
              <Users className="w-6 h-6 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 font-semibold">성별</p>
                <p className="text-base text-gray-800">{gender || '미입력'}</p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-gray-200 pt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              활동 통계
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-800">{streak}일</p>
                <p className="text-xs text-gray-600 mt-1">현재 연속</p>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-800">{longestStreak}일</p>
                <p className="text-xs text-gray-600 mt-1">최장 연속</p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-gray-800">{totalActivities}</p>
                <p className="text-xs text-gray-600 mt-1">총 활동</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
