import { useState } from 'react';

interface FlipCardProps {
  front: string;
  back: string;
}

export default function FlipCard({ front, back }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-64 mb-6">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-200 to-purple-300 rounded-2xl shadow-lg flex items-center justify-center p-6"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-4">{front}</p>
            <p className="text-sm text-gray-600">탭하여 뒤집기</p>
          </div>
        </div>

        <div
          className="absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-200 to-pink-300 rounded-2xl shadow-lg flex items-center justify-center p-6"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center">
            <p className="text-lg text-gray-800 leading-relaxed">{back}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
