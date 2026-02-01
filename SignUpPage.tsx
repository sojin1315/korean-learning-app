import { useState } from 'react';
import BabyIcon from './BabyIcon';

interface SignUpPageProps {
  userId: string;
  onComplete: (profileData: {
    display_name: string;
    email?: string;
    password?: string;
    phone_number?: string;
    birthdate?: string;
    gender?: string;
  }) => void;
}

const profanityList = [
  '바보', '멍청', '병신', '씨발', '개새', '지랄', '닥쳐', '꺼져',
  '시발', 'fuck', 'shit', 'damn', 'ass', 'bitch', 'bastard'
];

export default function SignUpPage({ userId, onComplete }: SignUpPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('미선택');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const containsProfanity = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return profanityList.some(word => lowerText.includes(word));
  };

  const hasRepeatingChars = (text: string): boolean => {
    const pattern = /(.)\1{2,}/;
    return pattern.test(text);
  };

  const validateUsername = (name: string): string | null => {
    if (name.length < 2) {
      return '닉네임은 최소 2글자 이상이어야 해요!';
    }
    if (name.length > 12) {
      return '닉네임은 최대 12글자까지 가능해요!';
    }
    if (containsProfanity(name)) {
      return '부적절한 단어가 포함되어 있어요!';
    }
    if (hasRepeatingChars(name)) {
      return '같은 글자를 3번 이상 반복할 수 없어요!';
    }
    return null;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return '비밀번호는 최소 8자 이상이어야 해요!';
    }
    if (!/[A-Za-z]/.test(password)) {
      return '비밀번호에 영문자가 포함되어야 해요!';
    }
    if (!/[0-9]/.test(password)) {
      return '비밀번호에 숫자가 포함되어야 해요!';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    const usernameError = validateUsername(username);
    if (usernameError) {
      setError(usernameError);
      setIsChecking(false);
      return;
    }

    if (email && !validateEmail(email)) {
      setError('올바른 이메일 형식을 입력해주세요!');
      setIsChecking(false);
      return;
    }

    if (password) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        setIsChecking(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않아요!');
        setIsChecking(false);
        return;
      }
    }

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      setError('올바른 휴대폰 번호를 입력해주세요! (예: 010-1234-5678)');
      setIsChecking(false);
      return;
    }

    try {
      const { Bolt Database } = await import('../lib/supabase');

      const { data: existingUsers } = await Bolt Database
        .from('user_profiles')
        .select('display_name, email')
        .or(`display_name.ilike.${username}${email ? `,email.eq.${email}` : ''}`);

      if (existingUsers && existingUsers.length > 0) {
        const hasUsername = existingUsers.some(u => u.display_name.toLowerCase() === username.toLowerCase());
        const hasEmail = existingUsers.some(u => u.email === email);

        if (hasUsername) {
          setError('이미 사용 중인 닉네임이에요! 다른 이름을 선택해주세요~');
        } else if (hasEmail) {
          setError('이미 사용 중인 이메일이에요! 다른 이메일을 사용해주세요~');
        }
        setIsChecking(false);
        return;
      }

      onComplete({
        display_name: username,
        email: email || undefined,
        password: password || undefined,
        phone_number: phoneNumber || undefined,
        birthdate: birthdate || undefined,
        gender: gender === '미선택' ? undefined : gender,
      });
    } catch (err) {
      console.error('Error checking username:', err);
      setError('정보 확인 중 오류가 발생했어요!');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <BabyIcon expression="excited" size={100} />
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          환영해요!
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          당신에 대해 알려주세요~
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                닉네임 <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="귀여운 닉네임을 지어주세요!"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:outline-none text-base"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                2-12글자, 욕설 및 반복 문자 불가
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:outline-none text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                선택사항이에요
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="영문, 숫자 포함 8자 이상"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:outline-none text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                선택사항 (영문 + 숫자 조합, 8자 이상)
              </p>
            </div>

            {password && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:outline-none text-base"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                휴대폰 번호
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="010-1234-5678"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:outline-none text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                선택사항이에요
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                생년월일
              </label>
              <input
                type="text"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                placeholder="YYYY-MM-DD"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:outline-none text-base"
              />
              <p className="text-xs text-gray-500 mt-1">
                선택사항이에요 (예: 2000-01-15)
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                성별
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['남성', '여성', '기타', '미선택'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGender(option)}
                    className={`py-3 px-4 rounded-xl font-bold transition-all ${
                      gender === option
                        ? 'bg-purple-400 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-300 rounded-xl p-3">
                <p className="text-red-700 text-sm font-bold text-center">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isChecking || !username}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:opacity-90 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isChecking ? '확인 중...' : '시작하기 테헷!'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          입력하신 정보는 안전하게 보관됩니다
        </p>
      </div>
    </div>
  );
}
