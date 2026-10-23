// De illustraties van de productkaarten: vectoren uit de ontwerp-overdracht (design_handoff_helios_producten),
// in tinten paars van donker (Coach) naar licht (Connect). Zonder achtergrond, dus voor licht en donker.
// De wazige grondschaduw (.product-art-shadow) valt in het donker weg: daar geen gloed.

function Shadow({ cx, cy, rx, ry, color, id }: { cx: number; cy: number; rx: number; ry: number; color: string; id: string }) {
  return (
    <>
      <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <ellipse className="product-art-shadow" cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity=".35" filter={`url(#${id})`} />
    </>
  );
}

function Coach() {
  return (
    <>
      <defs>
        <linearGradient id="ilCoRim" x1="140" y1="60" x2="260" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8A6BFF" />
          <stop offset="1" stopColor="#3E17B4" />
        </linearGradient>
        <linearGradient id="ilCoFace" x1="160" y1="70" x2="240" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#D9CEFF" />
        </linearGradient>
        <linearGradient id="ilCoN" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7A55F7" />
          <stop offset="1" stopColor="#3E17B4" />
        </linearGradient>
      </defs>
      <Shadow id="ilCoS" cx={200} cy={196} rx={66} ry={10} color="#4A1FC9" />
      <circle cx="200" cy="124" r="64" fill="#2F0F9E" />
      <circle cx="200" cy="118" r="64" fill="url(#ilCoRim)" />
      <circle cx="200" cy="118" r="50" fill="url(#ilCoFace)" />
      <circle cx="200" cy="118" r="50" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="1.5" />
      <g stroke="#7B66E0" strokeWidth="3" strokeLinecap="round">
        <path d="M200 74v8" />
        <path d="M200 154v8" />
        <path d="M156 118h8" />
        <path d="M236 118h8" />
      </g>
      <path d="M226 92 L207 125 L193 111 Z" fill="url(#ilCoN)" />
      <path d="M174 144 L193 111 L207 125 Z" fill="#A994FF" />
      <circle cx="200" cy="118" r="7" fill="#FFFFFF" stroke="#4A1FC9" strokeWidth="3" />
      <path d="M152 92 A 56 56 0 0 1 186 64" stroke="#FFFFFF" strokeOpacity=".75" strokeWidth="5" strokeLinecap="round" />
    </>
  );
}

function Next() {
  return (
    <>
      <defs>
        <linearGradient id="ilNeTop" x1="130" y1="70" x2="270" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C9BBFF" />
          <stop offset=".5" stopColor="#8E6EFF" />
          <stop offset="1" stopColor="#6639EC" />
        </linearGradient>
        <linearGradient id="ilNeBase" x1="150" y1="0" x2="250" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5A2FE4" />
          <stop offset=".45" stopColor="#8E6EFF" />
          <stop offset="1" stopColor="#5228D8" />
        </linearGradient>
      </defs>
      <Shadow id="ilNeS" cx={200} cy={194} rx={70} ry={10} color="#6639EC" />
      <path d="M150 118 V 160 C 150 178, 250 178, 250 160 V 118 Z" fill="url(#ilNeBase)" />
      <path d="M150 160 C 150 178, 250 178, 250 160" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="2" />
      <path d="M116 106 L200 140 L284 106 L284 112 L200 146 L116 112 Z" fill="#4A22C8" />
      <path d="M200 72 L284 106 L200 140 L116 106 Z" fill="url(#ilNeTop)" />
      <path d="M200 72 L284 106" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
      <path d="M200 106 L258 124 V 160" stroke="#4A22C8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="200" cy="106" rx="9" ry="5" fill="#4A22C8" />
      <path d="M252 158 h12 l3 18 h-18 z" fill="#5A2FE4" />
    </>
  );
}

function Horizon() {
  return (
    <>
      <defs>
        <linearGradient id="ilHoCov" x1="0" y1="80" x2="0" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B19CFF" />
          <stop offset="1" stopColor="#7B5CF0" />
        </linearGradient>
        <linearGradient id="ilHoL" x1="130" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#ECE6FF" />
        </linearGradient>
        <linearGradient id="ilHoR" x1="270" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#ECE6FF" />
        </linearGradient>
      </defs>
      <Shadow id="ilHoS" cx={200} cy={190} rx={78} ry={9} color="#8768F6" />
      <path
        d="M122 82 C 150 76, 185 80, 200 92 C 215 80, 250 76, 278 82 V 176 C 250 170, 215 172, 200 182 C 185 172, 150 170, 122 176 Z"
        fill="url(#ilHoCov)"
      />
      <path d="M130 76 C 156 70, 186 74, 200 86 V 172 C 186 162, 156 160, 130 166 Z" fill="url(#ilHoL)" />
      <path d="M270 76 C 244 70, 214 74, 200 86 V 172 C 214 162, 244 160, 270 166 Z" fill="url(#ilHoR)" />
      <g stroke="#D3C7FD" strokeWidth="3" strokeLinecap="round">
        <path d="M146 98 C 160 95, 174 96, 186 101" />
        <path d="M146 114 C 160 111, 174 112, 186 117" />
        <path d="M146 130 C 160 127, 170 128, 178 131" />
        <path d="M254 98 C 240 95, 226 96, 214 101" />
        <path d="M254 114 C 240 111, 226 112, 214 117" />
        <path d="M254 130 C 240 127, 230 128, 222 131" />
      </g>
      <path d="M200 86 V 172" stroke="#B9A8F8" strokeWidth="2" />
    </>
  );
}

function Connect() {
  return (
    <>
      <defs>
        <linearGradient id="ilCnL" x1="150" y1="80" x2="250" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D2C6FF" />
          <stop offset="1" stopColor="#977EF6" />
        </linearGradient>
        <linearGradient id="ilCnSheet" x1="0" y1="50" x2="0" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F0EBFF" />
        </linearGradient>
      </defs>
      <Shadow id="ilCnS" cx={196} cy={194} rx={70} ry={9} color="#A68FFA" />
      <g transform="rotate(8 262 88)">
        <rect x="226" y="52" width="74" height="72" rx="12" fill="url(#ilCnSheet)" stroke="#DDD3FF" strokeWidth="1.5" />
        <text x="263" y="84" textAnchor="middle" fontFamily="Inter Tight, sans-serif" fontSize="17" fontWeight="800" letterSpacing="1" fill="#8768F6">
          API
        </text>
        <rect x="242" y="96" width="42" height="5" rx="2.5" fill="#DDD3FF" />
        <rect x="242" y="106" width="28" height="5" rx="2.5" fill="#E8E2FF" />
      </g>
      <g transform="rotate(-45 196 128)">
        <rect x="130" y="108" width="80" height="40" rx="20" stroke="#7356E8" strokeWidth="16" transform="translate(0 4)" />
        <rect x="182" y="108" width="80" height="40" rx="20" stroke="#7356E8" strokeWidth="16" transform="translate(0 4)" />
        <rect x="130" y="108" width="80" height="40" rx="20" stroke="url(#ilCnL)" strokeWidth="16" />
        <rect x="182" y="108" width="80" height="40" rx="20" stroke="url(#ilCnL)" strokeWidth="16" />
        <path d="M150 104 H 190" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M202 104 H 242" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </>
  );
}

const ART = { coach: Coach, next: Next, horizon: Horizon, connect: Connect } as const;

export default function ProductArt({ id }: { id: string }) {
  const Art = ART[id as keyof typeof ART];
  if (!Art) return null;

  return (
    <svg className="product-art" width="400" height="232" viewBox="0 0 400 232" fill="none" aria-hidden="true">
      <Art />
    </svg>
  );
}
