import { ArrowLeft, Save } from 'lucide-react';
import { useState } from 'react';

interface SettingsPageProps {
  currentProfile: {
    displayName: string;
    email?: string;
    phoneNumber?: string;
    birthdate?: string;
    gender?: string;
  };
  onSave: (profile: {
    displayName: string;
    email?: string;
    phoneNumber?: string;
    birthdate?: string;
    gender?: string;
  }) => void;
  onBack: () => void;
}

export default function SettingsPage({ currentProfile, onSave, onBack }: SettingsPageProps) {
  const [formData, setFormData] = useState({
    displayName: currentProfile.displayName || '',
    email: currentProfile.email || '',
    phoneNumber: currentProfile.phoneNumber || '',
    birthdate: currentProfile.birthdate || '',
    gender: currentProfile.gender || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4 pb-8">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">설정</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">이름</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">휴대폰</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">생년월일</label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">성별</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-3 rounded-xl border-2 border-gray-300 focus:outline-none focus:border-purple-500"
              >
                <option value="">선택하세요</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Save className="w-6 h-6" />
              저장하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
