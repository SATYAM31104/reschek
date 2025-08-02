const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 30;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // Color based on score - better contrast for white background
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: '#10b981', text: '#047857' }; // Green
    if (score >= 60) return { bg: '#f59e0b', text: '#d97706' }; // Yellow/Orange
    return { bg: '#ef4444', text: '#dc2626' }; // Red
  };

  const colors = getScoreColor(score);

  return (
    <div className="relative" style={{ width: '70px', height: '70px' }}>
      <svg
        width="70"
        height="70"
        viewBox="0 0 70 70"
        className="absolute top-0 left-0"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx="35"
          cy="35"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx="35"
          cy="35"
          r={normalizedRadius}
          stroke={colors.bg}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
          }}
        />
      </svg>
      
      {/* Score number - positioned absolutely in center */}
      <div 
        className="absolute flex flex-col items-center justify-center"
        style={{ 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%'
        }}
      >
        <span 
          className="font-bold leading-none"
          style={{ 
            color: colors.text,
            fontSize: '16px'
          }}
        >
          {score}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;