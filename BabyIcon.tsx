interface BabyIconProps {
  expression?: 'happy' | 'neutral' | 'excited' | 'thinking' | 'winking' | 'curious';
  size?: number;
}

export default function BabyIcon({ expression = 'neutral', size = 60 }: BabyIconProps) {
  const getEyeExpression = () => {
    switch (expression) {
      case 'happy':
        return { size: size * 0.18, eyeHeight: size * 0.17, sparkleSize: size * 0.035, pupilSize: size * 0.07 };
      case 'excited':
        return { size: size * 0.2, eyeHeight: size * 0.19, sparkleSize: size * 0.04, pupilSize: size * 0.08 };
      case 'thinking':
        return { size: size * 0.16, eyeHeight: size * 0.15, sparkleSize: size * 0.03, pupilSize: size * 0.06 };
      case 'winking':
        return { size: size * 0.18, eyeHeight: size * 0.17, sparkleSize: size * 0.035, pupilSize: size * 0.07 };
      case 'curious':
        return { size: size * 0.19, eyeHeight: size * 0.18, sparkleSize: size * 0.037, pupilSize: size * 0.075 };
      default:
        return { size: size * 0.18, eyeHeight: size * 0.17, sparkleSize: size * 0.035, pupilSize: size * 0.07 };
    }
  };

  const getMouth = () => {
    const centerX = size / 2;
    const mouthY = size * 0.76;

    switch (expression) {
      case 'happy':
        return {
          path: `M ${centerX - size * 0.05} ${mouthY} Q ${centerX} ${mouthY + size * 0.045} ${centerX + size * 0.05} ${mouthY}`,
          lipPath: `M ${centerX - size * 0.05} ${mouthY} Q ${centerX} ${mouthY + size * 0.045} ${centerX + size * 0.05} ${mouthY} Q ${centerX} ${mouthY + size * 0.022} ${centerX - size * 0.05} ${mouthY}`
        };
      case 'excited':
        return {
          path: `M ${centerX} ${mouthY} m ${-size * 0.045} 0 a ${size * 0.045} ${size * 0.065} 0 1 0 ${size * 0.09} 0 a ${size * 0.045} ${size * 0.065} 0 1 0 ${-size * 0.09} 0`,
          lipPath: `M ${centerX} ${mouthY} m ${-size * 0.045} 0 a ${size * 0.045} ${size * 0.065} 0 1 0 ${size * 0.09} 0 a ${size * 0.045} ${size * 0.065} 0 1 0 ${-size * 0.09} 0`
        };
      case 'thinking':
        return {
          path: `M ${centerX - size * 0.035} ${mouthY} Q ${centerX - size * 0.008} ${mouthY - size * 0.008} ${centerX + size * 0.008} ${mouthY} Q ${centerX + size * 0.025} ${mouthY + size * 0.008} ${centerX + size * 0.035} ${mouthY}`,
          lipPath: ``
        };
      default:
        return {
          path: `M ${centerX - size * 0.04} ${mouthY} Q ${centerX} ${mouthY + size * 0.018} ${centerX + size * 0.04} ${mouthY}`,
          lipPath: `M ${centerX - size * 0.04} ${mouthY} Q ${centerX} ${mouthY + size * 0.018} ${centerX + size * 0.04} ${mouthY} Q ${centerX} ${mouthY + size * 0.009} ${centerX - size * 0.04} ${mouthY}`
        };
    }
  };

  const eyes = getEyeExpression();
  const mouth = getMouth();

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="faceGradient">
          <stop offset="0%" stopColor="#FFF5E6" />
          <stop offset="60%" stopColor="#FFEAD4" />
          <stop offset="100%" stopColor="#FFE0C2" />
        </radialGradient>
        <radialGradient id="eyeGradient">
          <stop offset="0%" stopColor="#6B4E3D" />
          <stop offset="50%" stopColor="#4A3428" />
          <stop offset="100%" stopColor="#2D1F19" />
        </radialGradient>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3A2A20" />
          <stop offset="50%" stopColor="#2A1A10" />
          <stop offset="100%" stopColor="#1A0A08" />
        </linearGradient>
        <radialGradient id="hairHighlight">
          <stop offset="0%" stopColor="#6B5B51" opacity="0.8" />
          <stop offset="100%" stopColor="#3A2A20" opacity="0" />
        </radialGradient>
      </defs>

      <circle cx={size / 2} cy={size / 2} r={size * 0.47} fill="url(#faceGradient)" />

      <path
        d={`M ${size * 0.5} ${size * 0.03} L ${size * 0.5} ${size * -0.05}`}
        stroke="#2A1A10"
        strokeWidth={size * 0.015}
        fill="none"
        strokeLinecap="round"
      />

      {expression === 'winking' ? (
        <>
          <path
            d={`M ${size * 0.24} ${size * 0.48} Q ${size * 0.32} ${size * 0.46} ${size * 0.40} ${size * 0.48}`}
            stroke="#4A3428"
            strokeWidth={size * 0.015}
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx={size * 0.68}
            cy={size * 0.48}
            rx={eyes.size}
            ry={eyes.eyeHeight}
            fill="#FFFFFF"
          />
        </>
      ) : (
        <>
          <ellipse
            cx={size * 0.32}
            cy={size * 0.48}
            rx={eyes.size}
            ry={eyes.eyeHeight}
            fill="#FFFFFF"
          />
          <ellipse
            cx={size * 0.68}
            cy={size * 0.48}
            rx={eyes.size}
            ry={eyes.eyeHeight}
            fill="#FFFFFF"
          />
        </>
      )}

      {expression !== 'winking' && (
        <>
          <ellipse
            cx={size * 0.32}
            cy={size * 0.5}
            rx={eyes.size * 0.8}
            ry={eyes.eyeHeight * 0.85}
            fill="url(#eyeGradient)"
          />
          <circle
            cx={size * 0.32}
            cy={size * 0.52}
            r={eyes.pupilSize}
            fill="#1A0A08"
          />
          <circle
            cx={size * 0.28}
            cy={size * 0.46}
            r={eyes.sparkleSize * 1.8}
            fill="#FFFFFF"
          />
          <circle
            cx={size * 0.33}
            cy={size * 0.49}
            r={eyes.sparkleSize * 1}
            fill="#FFFFFF"
            opacity="0.95"
          />
          <ellipse
            cx={size * 0.35}
            cy={size * 0.54}
            rx={eyes.sparkleSize * 0.7}
            ry={eyes.sparkleSize * 0.5}
            fill="#FFFFFF"
            opacity="0.7"
          />
          <circle
            cx={size * 0.36}
            cy={size * 0.52}
            r={eyes.sparkleSize * 0.4}
            fill="#FFFFFF"
            opacity="0.5"
          />
        </>
      )}

      <ellipse
        cx={size * 0.68}
        cy={size * 0.5}
        rx={eyes.size * 0.8}
        ry={eyes.eyeHeight * 0.85}
        fill="url(#eyeGradient)"
      />
      <circle
        cx={size * 0.68}
        cy={size * 0.52}
        r={eyes.pupilSize}
        fill="#1A0A08"
      />
      <circle
        cx={size * 0.64}
        cy={size * 0.46}
        r={eyes.sparkleSize * 1.8}
        fill="#FFFFFF"
      />
      <circle
        cx={size * 0.69}
        cy={size * 0.49}
        r={eyes.sparkleSize * 1}
        fill="#FFFFFF"
        opacity="0.95"
      />
      <ellipse
        cx={size * 0.71}
        cy={size * 0.54}
        rx={eyes.sparkleSize * 0.7}
        ry={eyes.sparkleSize * 0.5}
        fill="#FFFFFF"
        opacity="0.7"
      />
      <circle
        cx={size * 0.72}
        cy={size * 0.52}
        r={eyes.sparkleSize * 0.4}
        fill="#FFFFFF"
        opacity="0.5"
      />

      <path
        d={`M ${size * 0.22} ${size * 0.4} Q ${size * 0.26} ${size * 0.38} ${size * 0.31} ${size * 0.39} Q ${size * 0.35} ${size * 0.4} ${size * 0.39} ${size * 0.41}`}
        stroke="#4A3428"
        strokeWidth={size * 0.011}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M ${size * 0.61} ${size * 0.41} Q ${size * 0.65} ${size * 0.4} ${size * 0.69} ${size * 0.39} Q ${size * 0.74} ${size * 0.38} ${size * 0.78} ${size * 0.4}`}
        stroke="#4A3428"
        strokeWidth={size * 0.011}
        fill="none"
        strokeLinecap="round"
      />

      <ellipse cx={size * 0.5} cy={size * 0.66} rx={size * 0.012} ry={size * 0.01} fill="#FFB8A8" opacity="0.7" />

      {mouth.lipPath && (
        <path
          d={mouth.lipPath}
          fill="#FF9BB0"
          opacity="0.75"
        />
      )}
      <path
        d={mouth.path}
        stroke="#FF6B8A"
        strokeWidth={size * 0.01}
        fill="none"
        strokeLinecap="round"
      />

      <ellipse cx={size * 0.16} cy={size * 0.6} rx={size * 0.15} ry={size * 0.13} fill="#FFB8C8" opacity="0.7" />
      <ellipse cx={size * 0.84} cy={size * 0.6} rx={size * 0.15} ry={size * 0.13} fill="#FFB8C8" opacity="0.7" />
      <ellipse cx={size * 0.14} cy={size * 0.62} rx={size * 0.11} ry={size * 0.1} fill="#FFA0B0" opacity="0.5" />
      <ellipse cx={size * 0.86} cy={size * 0.62} rx={size * 0.11} ry={size * 0.1} fill="#FFA0B0" opacity="0.5" />
      <ellipse cx={size * 0.13} cy={size * 0.63} rx={size * 0.06} ry={size * 0.055} fill="#FF8098" opacity="0.35" />
      <ellipse cx={size * 0.87} cy={size * 0.63} rx={size * 0.06} ry={size * 0.055} fill="#FF8098" opacity="0.35" />

      {expression === 'happy' || expression === 'excited' ? (
        <>
          <path
            d={`M ${size * 0.88} ${size * 0.35} l ${size * 0.02} ${-size * 0.025} l ${size * 0.02} ${size * 0.025} l ${size * 0.025} ${size * 0.02} l ${-size * 0.025} ${size * 0.02} l ${-size * 0.02} ${size * 0.025} l ${-size * 0.02} ${-size * 0.025} l ${-size * 0.025} ${-size * 0.02} Z`}
            fill="#FFE5A0"
            opacity="0.8"
          />
          <path
            d={`M ${size * 0.15} ${size * 0.28} l ${size * 0.015} ${-size * 0.02} l ${size * 0.015} ${size * 0.02} l ${size * 0.02} ${size * 0.015} l ${-size * 0.02} ${size * 0.015} l ${-size * 0.015} ${size * 0.02} l ${-size * 0.015} ${-size * 0.02} l ${-size * 0.02} ${-size * 0.015} Z`}
            fill="#FFE5A0"
            opacity="0.8"
          />
          <circle
            cx={size * 0.88}
            cy={size * 0.65}
            r={size * 0.02}
            fill="#FFF0C8"
            opacity="0.7"
          />
          <circle
            cx={size * 0.12}
            cy={size * 0.7}
            r={size * 0.015}
            fill="#FFF0C8"
            opacity="0.7"
          />
        </>
      ) : null}
    </svg>
  );
}
