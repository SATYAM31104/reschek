import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Floating Resume Icon Animation
export const FloatingResumeIcon = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    // Floating animation
    tl.to(containerRef.current, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(containerRef.current, {
      y: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    // Rotate pages
    gsap.to(".resume-page", {
      rotationY: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2,
    });

    // Glow effect
    gsap.to(".resume-glow", {
      opacity: 0.8,
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Glow effect */}
      <circle
        className="resume-glow"
        cx="60"
        cy="60"
        r="50"
        fill="url(#resumeGlow)"
        opacity="0.3"
      />
      
      {/* Resume pages */}
      <rect
        className="resume-page"
        x="35"
        y="25"
        width="50"
        height="70"
        rx="4"
        fill="url(#resumeGradient)"
        stroke="url(#resumeBorder)"
        strokeWidth="2"
      />
      <rect
        className="resume-page"
        x="32"
        y="22"
        width="50"
        height="70"
        rx="4"
        fill="url(#resumeGradient2)"
        stroke="url(#resumeBorder)"
        strokeWidth="2"
        opacity="0.8"
      />
      
      {/* Text lines */}
      <line x1="40" y1="35" x2="70" y2="35" stroke="#06ffa5" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="42" x2="75" y2="42" stroke="#06ffa5" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="40" y1="49" x2="65" y2="49" stroke="#06ffa5" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="40" y1="56" x2="72" y2="56" stroke="#06ffa5" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="40" y1="63" x2="68" y2="63" stroke="#06ffa5" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      
      {/* Sparkles */}
      <circle className="sparkle-1" cx="90" cy="30" r="2" fill="#06ffa5" opacity="0.8" />
      <circle className="sparkle-2" cx="25" cy="45" r="1.5" fill="#00c1ff" opacity="0.6" />
      <circle className="sparkle-3" cx="95" cy="80" r="1" fill="#c137ff" opacity="0.7" />
      
      <defs>
        <radialGradient id="resumeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06ffa5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06ffa5" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="resumeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="resumeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="resumeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06ffa5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00c1ff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// AI Brain Animation
export const AIBrainIcon = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pulsing brain
    gsap.to(".brain-main", {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Neural connections animation
    gsap.to(".neural-line", {
      strokeDashoffset: 0,
      duration: 2,
      repeat: -1,
      ease: "power2.inOut",
      stagger: 0.3,
    });

    // Synapses glow
    gsap.to(".synapse", {
      opacity: 1,
      scale: 1.2,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2,
    });

    return () => {
      gsap.killTweensOf([".brain-main", ".neural-line", ".synapse"]);
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain outline */}
      <path
        className="brain-main"
        d="M50 15C35 15 25 25 25 40C25 45 27 50 30 54C28 58 30 62 35 65C40 68 45 70 50 70C55 70 60 68 65 65C70 62 72 58 70 54C73 50 75 45 75 40C75 25 65 15 50 15Z"
        fill="url(#brainGradient)"
        stroke="url(#brainBorder)"
        strokeWidth="2"
      />
      
      {/* Neural pathways */}
      <path
        className="neural-line"
        d="M35 35 Q45 30 55 35"
        stroke="#06ffa5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="10 5"
        strokeDashoffset="15"
        opacity="0.8"
      />
      <path
        className="neural-line"
        d="M40 45 Q50 40 60 45"
        stroke="#00c1ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 4"
        strokeDashoffset="12"
        opacity="0.7"
      />
      <path
        className="neural-line"
        d="M38 55 Q48 50 58 55"
        stroke="#c137ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 3"
        strokeDashoffset="9"
        opacity="0.6"
      />
      
      {/* Synapses */}
      <circle className="synapse" cx="35" cy="35" r="3" fill="#06ffa5" opacity="0.5" />
      <circle className="synapse" cx="55" cy="35" r="3" fill="#06ffa5" opacity="0.5" />
      <circle className="synapse" cx="40" cy="45" r="2.5" fill="#00c1ff" opacity="0.5" />
      <circle className="synapse" cx="60" cy="45" r="2.5" fill="#00c1ff" opacity="0.5" />
      <circle className="synapse" cx="38" cy="55" r="2" fill="#c137ff" opacity="0.5" />
      <circle className="synapse" cx="58" cy="55" r="2" fill="#c137ff" opacity="0.5" />
      
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="brainBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06ffa5" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#00c1ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c137ff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Analytics Chart Animation
export const AnalyticsIcon = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate bars growing
    gsap.fromTo(".chart-bar", 
      { scaleY: 0, transformOrigin: "bottom" },
      { 
        scaleY: 1, 
        duration: 1.5, 
        ease: "back.out(1.7)",
        stagger: 0.2,
        repeat: -1,
        repeatDelay: 3
      }
    );

    // Animate line chart
    gsap.fromTo(".chart-line",
      { strokeDashoffset: 200 },
      {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 2
      }
    );

    // Animate data points
    gsap.to(".data-point", {
      scale: 1.3,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3,
    });

    return () => {
      gsap.killTweensOf([".chart-bar", ".chart-line", ".data-point"]);
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      className={className}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Chart background */}
      <rect x="15" y="15" width="70" height="70" rx="8" fill="url(#chartBg)" stroke="url(#chartBorder)" strokeWidth="2" />
      
      {/* Grid lines */}
      <line x1="20" y1="25" x2="80" y2="25" stroke="#334155" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="35" x2="80" y2="35" stroke="#334155" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="45" x2="80" y2="45" stroke="#334155" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="55" x2="80" y2="55" stroke="#334155" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="65" x2="80" y2="65" stroke="#334155" strokeWidth="0.5" opacity="0.5" />
      <line x1="20" y1="75" x2="80" y2="75" stroke="#334155" strokeWidth="0.5" opacity="0.5" />
      
      {/* Bar chart */}
      <rect className="chart-bar" x="25" y="55" width="8" height="20" rx="2" fill="#06ffa5" />
      <rect className="chart-bar" x="38" y="45" width="8" height="30" rx="2" fill="#00c1ff" />
      <rect className="chart-bar" x="51" y="35" width="8" height="40" rx="2" fill="#c137ff" />
      <rect className="chart-bar" x="64" y="25" width="8" height="50" rx="2" fill="#06ffa5" />
      
      {/* Line chart */}
      <path
        className="chart-line"
        d="M25 65 L35 55 L45 45 L55 35 L65 25 L75 30"
        stroke="#fbbf24"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="100"
        strokeDashoffset="100"
        fill="none"
      />
      
      {/* Data points */}
      <circle className="data-point" cx="25" cy="65" r="3" fill="#fbbf24" />
      <circle className="data-point" cx="35" cy="55" r="3" fill="#fbbf24" />
      <circle className="data-point" cx="45" cy="45" r="3" fill="#fbbf24" />
      <circle className="data-point" cx="55" cy="35" r="3" fill="#fbbf24" />
      <circle className="data-point" cx="65" cy="25" r="3" fill="#fbbf24" />
      <circle className="data-point" cx="75" cy="30" r="3" fill="#fbbf24" />
      
      <defs>
        <linearGradient id="chartBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="chartBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06ffa5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00c1ff" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Sparkle Animation Component
export const SparkleField = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate sparkles
    gsap.to(".sparkle", {
      scale: 1.5,
      opacity: 1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Rotate sparkles
    gsap.to(".sparkle", {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: "none",
      stagger: {
        amount: 1,
        from: "random"
      }
    });

    return () => {
      gsap.killTweensOf(".sparkle");
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      className={className}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Generate random sparkles */}
      {Array.from({ length: 20 }, (_, i) => {
        const x = Math.random() * 180 + 10;
        const y = Math.random() * 180 + 10;
        const size = Math.random() * 3 + 1;
        const color = ['#06ffa5', '#00c1ff', '#c137ff', '#fbbf24'][Math.floor(Math.random() * 4)];
        
        return (
          <g key={i} className="sparkle" opacity="0.3">
            <path
              d={`M${x},${y-size} L${x+size*0.3},${y-size*0.3} L${x+size},${y} L${x+size*0.3},${y+size*0.3} L${x},${y+size} L${x-size*0.3},${y+size*0.3} L${x-size},${y} L${x-size*0.3},${y-size*0.3} Z`}
              fill={color}
            />
          </g>
        );
      })}
    </svg>
  );
};