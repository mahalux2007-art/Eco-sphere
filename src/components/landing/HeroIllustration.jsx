export default function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 420" className="h-full w-full" role="img" aria-label="Illustration of a leafy campus with students">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0FAF3" />
          <stop offset="100%" stopColor="#DCFCE7" />
        </linearGradient>
      </defs>
      <rect width="480" height="420" rx="24" fill="url(#skyGrad)" />
      <circle cx="400" cy="70" r="36" fill="#FDE68A" opacity="0.8" />

      {/* Hills */}
      <path d="M0 300 Q 120 250 240 290 T 480 280 V420 H0 Z" fill="#BBF7D0" />
      <path d="M0 340 Q 140 300 260 330 T 480 320 V420 H0 Z" fill="#86EFAC" />

      {/* Big tree left */}
      <circle cx="90" cy="230" r="55" fill="#22C55E" />
      <circle cx="55" cy="260" r="40" fill="#16A34A" />
      <circle cx="130" cy="260" r="42" fill="#16A34A" />
      <rect x="80" y="260" width="20" height="60" rx="6" fill="#166534" />

      {/* Small tree right */}
      <circle cx="400" cy="270" r="34" fill="#4ADE80" />
      <rect x="392" y="295" width="16" height="42" rx="5" fill="#166534" />

      {/* Path */}
      <path d="M160 420 Q 220 340 260 420" fill="#F8FAF7" opacity="0.6" />

      {/* Student 1 */}
      <g transform="translate(190,300)">
        <circle cx="20" cy="18" r="16" fill="#166534" />
        <rect x="6" y="34" width="28" height="48" rx="10" fill="#22C55E" />
        <rect x="6" y="80" width="10" height="36" rx="4" fill="#14532D" />
        <rect x="24" y="80" width="10" height="36" rx="4" fill="#14532D" />
      </g>

      {/* Student 2 holding a leaf/sign */}
      <g transform="translate(250,310)">
        <circle cx="20" cy="18" r="16" fill="#0F3D22" />
        <rect x="6" y="34" width="28" height="46" rx="10" fill="#DCFCE7" stroke="#166534" strokeWidth="2" />
        <rect x="6" y="78" width="10" height="34" rx="4" fill="#166534" />
        <rect x="24" y="78" width="10" height="34" rx="4" fill="#166534" />
        <path d="M44 30 q 18 -8 20 10 q -18 8 -20 -10z" fill="#4ADE80" />
      </g>

      {/* Floating leaves */}
      <path d="M330 150 q 14 -6 16 8 q -14 6 -16 -8z" fill="#4ADE80" />
      <path d="M360 190 q 12 -5 14 7 q -12 5 -14 -7z" fill="#86EFAC" />
      <path d="M60 140 q 12 -5 14 7 q -12 5 -14 -7z" fill="#4ADE80" />
    </svg>
  );
}
