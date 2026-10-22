// De illustraties van de productkaarten in het donkere thema: vectoren uit de ontwerp-overdracht
// (design_handoff_helios_producten), zonder achtergrond. De wazige gekleurde schaduw onder elk voorwerp is
// weggelaten: in het donker geen gloed.

function Coach() {
  return (
    <>
      <defs>
        <linearGradient id="ilCoRim" x1="140" y1="60" x2="260" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A994FF" />
          <stop offset="1" stopColor="#5530F0" />
        </linearGradient>
        <linearGradient id="ilCoFace" x1="160" y1="70" x2="240" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCD2FF" />
        </linearGradient>
        <linearGradient id="ilCoN" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A6BFF" />
          <stop offset="1" stopColor="#4B2BF0" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="124" r="64" fill="#4122D6" />
      <circle cx="200" cy="118" r="64" fill="url(#ilCoRim)" />
      <circle cx="200" cy="118" r="50" fill="url(#ilCoFace)" />
      <circle cx="200" cy="118" r="50" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.5" />
      <g stroke="#8E7BF0" strokeWidth="3" strokeLinecap="round">
        <path d="M200 74v8" />
        <path d="M200 154v8" />
        <path d="M156 118h8" />
        <path d="M236 118h8" />
      </g>
      <path d="M226 92 L207 125 L193 111 Z" fill="url(#ilCoN)" />
      <path d="M174 144 L193 111 L207 125 Z" fill="#B7A6FF" />
      <circle cx="200" cy="118" r="7" fill="#FFFFFF" stroke="#5B3BF0" strokeWidth="3" />
      <path d="M152 92 A 56 56 0 0 1 186 64" stroke="#FFFFFF" strokeOpacity=".75" strokeWidth="5" strokeLinecap="round" />
    </>
  );
}

function Next() {
  return (
    <>
      <defs>
        <linearGradient id="ilNeTop" x1="130" y1="70" x2="270" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A9C6FF" />
          <stop offset=".5" stopColor="#5E93FF" />
          <stop offset="1" stopColor="#2F6BF5" />
        </linearGradient>
        <linearGradient id="ilNeBase" x1="150" y1="0" x2="250" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2A5AE0" />
          <stop offset=".45" stopColor="#5A8CFF" />
          <stop offset="1" stopColor="#2552D8" />
        </linearGradient>
      </defs>
      <path d="M150 118 V 160 C 150 178, 250 178, 250 160 V 118 Z" fill="url(#ilNeBase)" />
      <path d="M150 160 C 150 178, 250 178, 250 160" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="2" />
      <path d="M116 106 L200 140 L284 106 L284 112 L200 146 L116 112 Z" fill="#1E4FD6" />
      <path d="M200 72 L284 106 L200 140 L116 106 Z" fill="url(#ilNeTop)" />
      <path d="M200 72 L284 106" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 106 L258 124 V 160" stroke="#1E4FD6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="200" cy="106" rx="9" ry="5" fill="#1E4FD6" />
      <path d="M252 158 h12 l3 18 h-18 z" fill="#2A5AE0" />
    </>
  );
}

function Horizon() {
  return (
    <>
      <defs>
        <linearGradient id="ilHoCov" x1="0" y1="80" x2="0" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF9A62" />
          <stop offset="1" stopColor="#F0561C" />
        </linearGradient>
        <linearGradient id="ilHoL" x1="130" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFE3D6" />
        </linearGradient>
        <linearGradient id="ilHoR" x1="270" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFE3D6" />
        </linearGradient>
      </defs>
      <path
        d="M122 82 C 150 76, 185 80, 200 92 C 215 80, 250 76, 278 82 V 176 C 250 170, 215 172, 200 182 C 185 172, 150 170, 122 176 Z"
        fill="url(#ilHoCov)"
      />
      <path d="M130 76 C 156 70, 186 74, 200 86 V 172 C 186 162, 156 160, 130 166 Z" fill="url(#ilHoL)" />
      <path d="M270 76 C 244 70, 214 74, 200 86 V 172 C 214 162, 244 160, 270 166 Z" fill="url(#ilHoR)" />
      <g stroke="#FFC9B0" strokeWidth="3" strokeLinecap="round">
        <path d="M146 98 C 160 95, 174 96, 186 101" />
        <path d="M146 114 C 160 111, 174 112, 186 117" />
        <path d="M146 130 C 160 127, 170 128, 178 131" />
        <path d="M254 98 C 240 95, 226 96, 214 101" />
        <path d="M254 114 C 240 111, 226 112, 214 117" />
        <path d="M254 130 C 240 127, 230 128, 222 131" />
      </g>
      <path d="M200 86 V 172" stroke="#F2A585" strokeWidth="2" />
    </>
  );
}

function Connect() {
  return (
    <>
      <defs>
        <linearGradient id="ilCnL" x1="150" y1="80" x2="250" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A68CFF" />
          <stop offset="1" stopColor="#5028F5" />
        </linearGradient>
        <linearGradient id="ilCnSheet" x1="0" y1="50" x2="0" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6DEFF" />
        </linearGradient>
      </defs>
      <g transform="rotate(8 262 88)">
        <rect x="226" y="52" width="74" height="72" rx="12" fill="url(#ilCnSheet)" stroke="#D5CAFF" strokeWidth="1.5" />
        <text x="263" y="84" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="17" fontWeight="800" letterSpacing="1" fill="#6A52F0">
          API
        </text>
        <rect x="242" y="96" width="42" height="5" rx="2.5" fill="#D5CAFF" />
        <rect x="242" y="106" width="28" height="5" rx="2.5" fill="#E2DAFF" />
      </g>
      <g transform="rotate(-45 196 128)">
        <rect x="130" y="108" width="80" height="40" rx="20" stroke="#3A18C8" strokeWidth="16" transform="translate(0 4)" />
        <rect x="182" y="108" width="80" height="40" rx="20" stroke="#3A18C8" strokeWidth="16" transform="translate(0 4)" />
        <rect x="130" y="108" width="80" height="40" rx="20" stroke="url(#ilCnL)" strokeWidth="16" />
        <rect x="182" y="108" width="80" height="40" rx="20" stroke="url(#ilCnL)" strokeWidth="16" />
        <path d="M150 104 H 190" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M202 104 H 242" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </>
  );
}

const ART = { coach: Coach, next: Next, horizon: Horizon, connect: Connect } as const;

export default function ProductArtDark({ id }: { id: string }) {
  const Art = ART[id as keyof typeof ART];
  if (!Art) return null;

  return (
    <svg className="product-art only-dark" width="400" height="232" viewBox="0 0 400 232" fill="none" aria-hidden="true">
      <Art />
    </svg>
  );
}
