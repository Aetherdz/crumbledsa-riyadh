interface BrandBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-11 h-11',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
} as const;

export function BrandBadge({ size = 'md', className = '' }: BrandBadgeProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label="Crumbled Riyadh emblem"
      className={`${SIZE_MAP[size]} shrink-0 select-none ${className}`}
    >
      {/* Circular Navy Badge (#0F2A44) */}
      <circle cx="60" cy="60" r="58" fill="#0F2A44" />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="#C9A45C"
        strokeWidth="1.5"
        strokeOpacity="0.8"
      />
      <circle
        cx="60"
        cy="60"
        r="48.5"
        fill="none"
        stroke="#C9A45C"
        strokeWidth="0.6"
        strokeOpacity="0.4"
      />

      {/* Simple Minimalist Cake Slice Icon in Gold */}
      <g
        fill="none"
        stroke="#D8B66E"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M46 41 L60 27 L74 41 Z"
          fill="#D8B66E"
          fillOpacity="0.16"
        />
        <rect x="46" y="41" width="28" height="9" rx="1.2" />
        <line x1="46" y1="45.5" x2="74" y2="45.5" strokeOpacity="0.8" />
        <circle cx="60" cy="24" r="2.1" fill="#D8B66E" stroke="none" />
      </g>

      {/* Crumbled in Gold Serif */}
      <text
        x="60"
        y="71.5"
        textAnchor="middle"
        fill="#D8B66E"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="21.5"
        fontWeight="700"
        letterSpacing="0.5"
      >
        Crumbled
      </text>

      {/* Small RIYADH below in Gold */}
      <text
        x="60"
        y="87.5"
        textAnchor="middle"
        fill="#C9A45C"
        fontFamily="'Plus Jakarta Sans', Arial, sans-serif"
        fontSize="8.2"
        fontWeight="600"
        letterSpacing="2.6"
      >
        RIYADH
      </text>
    </svg>
  );
}
