import { ComicDialogues } from '../types/invitation';

/** Hand-drawn SVG doodle assets matching Andi & Sinta wedding invitation */


export function FloralSprig({ className = "w-10 h-24", flipped = false }: { className?: string; flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${flipped ? "-scale-x-100" : ""}`}
    >
      <path
        d="M30 155 C28 120 32 80 28 5"
        stroke="#4a5240"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M29 130 C15 125 10 115 12 108 C20 106 28 118 29 125"
        fill="#8a9a7b"
        stroke="#4a5240"
        strokeWidth="2"
      />
      <path
        d="M31 115 C45 110 50 100 48 93 C40 91 32 103 30 110"
        fill="#8a9a7b"
        stroke="#4a5240"
        strokeWidth="2"
      />
      <path
        d="M28 85 C14 80 11 68 15 62 C22 62 27 73 28 80"
        fill="#8a9a7b"
        stroke="#4a5240"
        strokeWidth="2"
      />
      <path
        d="M30 70 C44 65 47 53 43 47 C36 47 31 58 30 65"
        fill="#8a9a7b"
        stroke="#4a5240"
        strokeWidth="2"
      />
      {/* Flowers */}
      <g transform="translate(20, 10)">
        <circle cx="8" cy="8" r="4" fill="#faf6f0" stroke="#4a5240" strokeWidth="2" />
        <circle cx="8" cy="2" r="3.5" fill="#faf6f0" stroke="#4a5240" strokeWidth="1.8" />
        <circle cx="14" cy="8" r="3.5" fill="#faf6f0" stroke="#4a5240" strokeWidth="1.8" />
        <circle cx="8" cy="14" r="3.5" fill="#faf6f0" stroke="#4a5240" strokeWidth="1.8" />
        <circle cx="2" cy="8" r="3.5" fill="#faf6f0" stroke="#4a5240" strokeWidth="1.8" />
        <circle cx="8" cy="8" r="2.5" fill="#e8c872" />
      </g>
    </svg>
  );
}

export function HeartFlourish() {
  return (
    <div className="flex items-center justify-center gap-2 text-stone-700 my-1">
      <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
        <path
          d="M12 18 C12 18 2 12 2 6 C2 3 4.5 1 7.5 1 C9.5 1 11.2 2 12 3.5 C12.8 2 14.5 1 16.5 1 C19.5 1 22 3 22 6 C22 12 12 18 12 18 Z"
          fill="#d97a68"
          stroke="#333"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center my-6">
      <div className="flex items-center justify-center gap-2">
        <span className="text-stone-500 font-mono text-sm tracking-widest">`\ -</span>
        <h2 className="text-xl md:text-2xl font-bold tracking-wider font-hand text-stone-900 uppercase">
          {title}
        </h2>
        <span className="text-stone-500 font-mono text-sm tracking-widest">- /`</span>
      </div>
      {subtitle && (
        <p className="text-xs md:text-sm font-hand text-stone-600 tracking-wide mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function getBubblePositionClass(pos?: string) {
  switch (pos) {
    case 'top-right':
      return 'self-end mb-auto';
    case 'bottom-left':
      return 'self-start mt-auto';
    case 'bottom-right':
      return 'self-end mt-auto';
    case 'top-left':
    default:
      return 'self-start mb-auto';
  }
}

function getTailPositionClass(pos?: string) {
  switch (pos) {
    case 'top-right':
      return 'absolute -bottom-2 right-6 w-3 h-3 bg-white border-r-2 border-b-2 border-stone-800 transform rotate-45';
    case 'bottom-left':
      return 'absolute -top-2 left-6 w-3 h-3 bg-white border-l-2 border-t-2 border-stone-800 transform rotate-45';
    case 'bottom-right':
      return 'absolute -top-2 right-6 w-3 h-3 bg-white border-r-2 border-t-2 border-stone-800 transform rotate-45';
    case 'top-left':
    default:
      return 'absolute -bottom-2 left-6 w-3 h-3 bg-white border-r-2 border-b-2 border-stone-800 transform rotate-45';
  }
}

export interface ComicPanelCustomData {
  imageUrl?: string;
  text?: string;
  bubblePos?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface ComicStripProps {
  dialogues?: ComicDialogues;
  panel1?: ComicPanelCustomData;
  panel2?: ComicPanelCustomData;
  panel3?: ComicPanelCustomData;
  panel4?: ComicPanelCustomData;
  extraPanels?: Array<{
    id: string;
    imageUrl?: string;
    text?: string;
    bubblePos?: string;
  }>;
}

/** 4-Panel Comic Strip SVG Graphics with full custom photo/illustration & position support */
export function ComicStrip({ dialogues, panel1, panel2, panel3, panel4, extraPanels }: ComicStripProps) {
  const p1Text = panel1?.text ?? dialogues?.panel1 ?? "munduran dikit bisa mba?";
  const p1Image = panel1?.imageUrl;
  const p1Pos = panel1?.bubblePos || 'top-left';

  const p2Text = panel2?.text ?? dialogues?.panel2 ?? "iya Kenapa mas?";
  const p2Image = panel2?.imageUrl;
  const p2Pos = panel2?.bubblePos || 'top-right';

  const p3Text = panel3?.text ?? dialogues?.panel3 ?? "cantik e kelewatan.";
  const p3Image = panel3?.imageUrl;
  const p3Pos = panel3?.bubblePos || 'top-left';

  const p4Text = panel4?.text ?? dialogues?.panel4 ?? "Nikah yuk mas.";
  const p4Image = panel4?.imageUrl;
  const p4Pos = panel4?.bubblePos || 'top-right';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 p-3.5 bg-stone-900/5 rounded-2xl border-2 border-stone-800 shadow-[3px_4px_0px_#231f1d]">
      {/* Panel 1 */}
      <div className="relative bg-[#fdfbf7] border-2 border-stone-800 rounded-xl overflow-hidden p-3 aspect-4/3 flex flex-col justify-between shadow-xs group">
        {p1Image ? (
          <div className="absolute inset-0 w-full h-full">
            <img src={p1Image} alt="Panel 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          </div>
        ) : null}

        {/* Dialogue Bubble */}
        <div className={`${getBubblePositionClass(p1Pos)} relative bg-white/95 backdrop-blur-xs border-2 border-stone-800 rounded-2xl px-3.5 py-1.5 max-w-[85%] shadow-[2px_3px_0px_#231f1d] z-10`}>
          <p className="font-hand text-sm md:text-base font-bold text-stone-900 leading-snug">
            {p1Text}
          </p>
          <div className={getTailPositionClass(p1Pos)}></div>
        </div>

        {/* Characters Panel 1 (rendered only if no custom image) */}
        {!p1Image && (
          <svg viewBox="0 0 300 180" className="w-full h-auto mt-auto">
            <rect x="0" y="0" width="300" height="180" fill="#f8f5ee" />
            <rect x="150" y="10" width="60" height="90" fill="#e5dfd2" stroke="#444" strokeWidth="2" rx="2" />
            <path d="M150 55 L210 55 M180 10 L180 100" stroke="#444" strokeWidth="2" />
            <path d="M10 80 Q25 40 15 20 Q5 50 10 80" fill="#889d7d" stroke="#333" strokeWidth="1.5" />
            <path d="M20 90 Q40 60 45 40 Q30 70 20 90" fill="#98ad8d" stroke="#333" strokeWidth="1.5" />
            <rect x="0" y="145" width="300" height="35" fill="#d9cfbe" stroke="#333" strokeWidth="2" />
            <rect x="135" y="115" width="22" height="32" rx="3" fill="#ffffff" stroke="#333" strokeWidth="2" />
            <rect x="138" y="125" width="16" height="19" fill="#c49b66" opacity="0.8" />
            <line x1="144" y1="100" x2="140" y2="128" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="175" y="122" width="22" height="25" rx="3" fill="#ffffff" stroke="#333" strokeWidth="2" />

            <g transform="translate(10, 20)">
              <path d="M20 150 C20 105 50 95 85 95 C120 95 140 105 140 150 Z" fill="#2d3136" stroke="#222" strokeWidth="2.5" />
              <rect x="85" y="110" width="20" height="32" rx="4" fill="#1e2024" stroke="#222" strokeWidth="2" transform="rotate(-10 95 125)" />
              <ellipse cx="80" cy="130" rx="10" ry="8" fill="#ffd5be" stroke="#222" strokeWidth="2" />
              <rect x="65" y="80" width="20" height="25" fill="#ffd5be" stroke="#222" strokeWidth="2" />
              <ellipse cx="75" cy="65" rx="32" ry="30" fill="#ffd5be" stroke="#222" strokeWidth="2.5" />
              <path d="M42 62 C38 40 55 25 80 25 C105 25 115 45 110 70 C108 55 98 48 88 48 C78 48 70 58 60 52 C50 56 46 65 42 62 Z" fill="#282220" stroke="#222" strokeWidth="2.5" />
              <circle cx="68" cy="66" r="3.5" fill="#222" />
              <circle cx="88" cy="66" r="3.5" fill="#222" />
              <circle cx="60" cy="74" r="5" fill="#ffb4a2" opacity="0.6" />
              <circle cx="95" cy="74" r="5" fill="#ffb4a2" opacity="0.6" />
              <path d="M74 74 Q78 78 82 74" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M64 58 Q70 56 74 58" stroke="#222" strokeWidth="1.8" fill="none" />
              <path d="M84 58 Q88 56 94 58" stroke="#222" strokeWidth="1.8" fill="none" />
            </g>

            <g transform="translate(145, 25)">
              <path d="M45 145 C45 105 70 95 100 95 C130 95 150 105 150 145 Z" fill="#f5eee6" stroke="#222" strokeWidth="2.5" />
              <rect x="88" y="80" width="18" height="22" fill="#ffe0cf" stroke="#222" strokeWidth="2" />
              <ellipse cx="96" cy="68" rx="28" ry="26" fill="#ffe0cf" stroke="#222" strokeWidth="2.5" />
              <path d="M66 65 C64 35 80 28 105 28 C130 28 138 42 135 85 C125 90 120 75 120 60 C110 50 90 50 82 60 C76 68 70 85 66 65 Z" fill="#4d3326" stroke="#222" strokeWidth="2.5" />
              <circle cx="86" cy="68" r="3.5" fill="#222" />
              <circle cx="104" cy="68" r="3.5" fill="#222" />
              <circle cx="80" cy="74" r="4.5" fill="#ffb4a2" opacity="0.6" />
              <circle cx="110" cy="74" r="4.5" fill="#ffb4a2" opacity="0.6" />
              <path d="M92 75 Q96 78 100 75" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M60 140 Q85 130 105 132" stroke="#222" strokeWidth="2.5" fill="none" />
            </g>
          </svg>
        )}
      </div>

      {/* Panel 2 */}
      <div className="relative bg-[#fdfbf7] border-2 border-stone-800 rounded-xl overflow-hidden p-3 aspect-4/3 flex flex-col justify-between shadow-xs group">
        {p2Image ? (
          <div className="absolute inset-0 w-full h-full">
            <img src={p2Image} alt="Panel 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          </div>
        ) : null}

        {/* Dialogue Bubble */}
        <div className={`${getBubblePositionClass(p2Pos)} relative bg-white/95 backdrop-blur-xs border-2 border-stone-800 rounded-2xl px-3.5 py-1.5 max-w-[85%] shadow-[2px_3px_0px_#231f1d] z-10`}>
          <p className="font-hand text-sm md:text-base font-bold text-stone-900 leading-snug">
            {p2Text}
          </p>
          <div className={getTailPositionClass(p2Pos)}></div>
        </div>

        {!p2Image && (
          <svg viewBox="0 0 300 180" className="w-full h-auto mt-auto">
            <rect x="0" y="0" width="300" height="180" fill="#f8f5ee" />
            <path d="M260 90 Q290 60 295 20 Q270 50 260 90" fill="#889d7d" stroke="#333" strokeWidth="1.5" />
            <g transform="translate(45, 10)">
              <path d="M30 170 C30 120 70 110 110 110 C150 110 180 120 185 170 Z" fill="#f5eee6" stroke="#222" strokeWidth="2.5" />
              <rect x="96" y="92" width="26" height="30" fill="#ffe0cf" stroke="#222" strokeWidth="2" />
              <ellipse cx="108" cy="74" rx="42" ry="38" fill="#ffe0cf" stroke="#222" strokeWidth="2.5" />
              <path d="M60 75 C58 30 85 20 120 20 C155 20 165 40 162 105 C150 110 144 85 144 70 C130 54 100 54 90 68 C80 80 72 105 60 75 Z" fill="#4d3326" stroke="#222" strokeWidth="2.5" />
              <circle cx="94" cy="72" r="6" fill="#222" />
              <circle cx="92" cy="70" r="2" fill="#fff" />
              <circle cx="124" cy="72" r="6" fill="#222" />
              <circle cx="122" cy="70" r="2" fill="#fff" />
              <path d="M86 60 Q94 54 102 60" stroke="#222" strokeWidth="2" fill="none" />
              <path d="M118 60 Q126 56 134 62" stroke="#222" strokeWidth="2" fill="none" />
              <circle cx="84" cy="82" r="6" fill="#ffb4a2" opacity="0.6" />
              <circle cx="132" cy="82" r="6" fill="#ffb4a2" opacity="0.6" />
              <path d="M104 84 Q108 90 114 84 Z" fill="#d97a68" stroke="#222" strokeWidth="1.8" />
            </g>
          </svg>
        )}
      </div>

      {/* Panel 3 */}
      <div className="relative bg-[#fdfbf7] border-2 border-stone-800 rounded-xl overflow-hidden p-3 aspect-4/3 flex flex-col justify-between shadow-xs group">
        {p3Image ? (
          <div className="absolute inset-0 w-full h-full">
            <img src={p3Image} alt="Panel 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          </div>
        ) : null}

        {/* Dialogue Bubble */}
        <div className={`${getBubblePositionClass(p3Pos)} relative bg-white/95 backdrop-blur-xs border-2 border-stone-800 rounded-2xl px-3.5 py-1.5 max-w-[85%] shadow-[2px_3px_0px_#231f1d] z-10`}>
          <p className="font-hand text-sm md:text-base font-bold text-stone-900 leading-snug">
            {p3Text}
          </p>
          <div className={getTailPositionClass(p3Pos)}></div>
        </div>

        {!p3Image && (
          <svg viewBox="0 0 300 180" className="w-full h-auto mt-auto">
            <rect x="0" y="0" width="300" height="180" fill="#f8f5ee" />
            <path d="M20 90 Q35 50 30 20 Q15 60 20 90" fill="#889d7d" stroke="#333" strokeWidth="1.5" />
            <line x1="220" y1="70" x2="235" y2="68" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <line x1="220" y1="85" x2="238" y2="88" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(45, 10)">
              <path d="M25 170 C25 120 65 110 110 110 C155 110 185 120 185 170 Z" fill="#2d3136" stroke="#222" strokeWidth="2.5" />
              <rect x="130" y="115" width="25" height="42" rx="4" fill="#1e2024" stroke="#222" strokeWidth="2" transform="rotate(-15 140 135)" />
              <ellipse cx="120" cy="140" rx="14" ry="10" fill="#ffd5be" stroke="#222" strokeWidth="2" />
              <rect x="96" y="90" width="28" height="28" fill="#ffd5be" stroke="#222" strokeWidth="2" />
              <ellipse cx="110" cy="72" rx="44" ry="40" fill="#ffd5be" stroke="#222" strokeWidth="2.5" />
              <path d="M65 65 C60 30 85 15 120 15 C155 15 168 38 162 75 C158 52 144 45 130 45 C116 45 106 58 92 50 C78 55 72 68 65 65 Z" fill="#282220" stroke="#222" strokeWidth="2.5" />
              <circle cx="94" cy="70" r="5" fill="#222" />
              <circle cx="126" cy="70" r="5" fill="#222" />
              <circle cx="84" cy="80" r="6" fill="#ffb4a2" opacity="0.6" />
              <circle cx="134" cy="80" r="6" fill="#ffb4a2" opacity="0.6" />
              <path d="M102 80 Q110 92 118 80 Z" fill="#d97a68" stroke="#222" strokeWidth="2" />
            </g>
          </svg>
        )}
      </div>

      {/* Panel 4 */}
      <div className="relative bg-[#fdfbf7] border-2 border-stone-800 rounded-xl overflow-hidden p-3 aspect-4/3 flex flex-col justify-between shadow-xs group">
        {p4Image ? (
          <div className="absolute inset-0 w-full h-full">
            <img src={p4Image} alt="Panel 4" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
          </div>
        ) : null}

        {/* Dialogue Bubble */}
        <div className={`${getBubblePositionClass(p4Pos)} relative bg-white/95 backdrop-blur-xs border-2 border-stone-800 rounded-2xl px-3.5 py-1.5 max-w-[85%] shadow-[2px_3px_0px_#231f1d] z-10`}>
          <p className="font-hand text-sm md:text-base font-bold text-stone-900 leading-snug">
            {p4Text}
          </p>
          <div className={getTailPositionClass(p4Pos)}></div>
        </div>

        {!p4Image && (
          <svg viewBox="0 0 300 180" className="w-full h-auto mt-auto">
            <rect x="0" y="0" width="300" height="180" fill="#f8f5ee" />
            <line x1="20" y1="40" x2="35" y2="48" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="58" x2="32" y2="60" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <line x1="265" y1="40" x2="250" y2="48" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <line x1="268" y1="58" x2="252" y2="60" stroke="#222" strokeWidth="2" strokeLinecap="round" />
            <g transform="translate(50, 10)">
              <path d="M30 170 C30 125 70 115 100 115 C130 115 170 125 170 170 Z" fill="#f5eee6" stroke="#222" strokeWidth="2.5" />
              <rect x="88" y="90" width="24" height="26" fill="#ffe0cf" stroke="#222" strokeWidth="2" />
              <ellipse cx="100" cy="70" rx="42" ry="38" fill="#ffe0cf" stroke="#222" strokeWidth="2.5" />
              <path d="M56 70 C54 28 80 18 112 18 C145 18 155 38 152 105 C140 110 134 85 134 70 C120 54 90 54 80 68 C72 80 66 105 56 70 Z" fill="#4d3326" stroke="#222" strokeWidth="2.5" />
              <circle cx="84" cy="65" r="11" fill="#ffffff" stroke="#222" strokeWidth="2.5" />
              <circle cx="84" cy="65" r="3.5" fill="#222" />
              <circle cx="116" cy="65" r="11" fill="#ffffff" stroke="#222" strokeWidth="2.5" />
              <circle cx="116" cy="65" r="3.5" fill="#222" />
              <path d="M74 48 Q84 44 94 48" stroke="#222" strokeWidth="2" fill="none" />
              <path d="M106 48 Q116 44 126 48" stroke="#222" strokeWidth="2" fill="none" />
              <path d="M76 130 C75 100 78 88 88 84 C95 80 100 90 100 105" fill="#ffe0cf" stroke="#222" strokeWidth="2.2" />
              <path d="M124 130 C125 100 122 88 112 84 C105 80 100 90 100 105" fill="#ffe0cf" stroke="#222" strokeWidth="2.2" />
              <path d="M86 86 L86 104 M92 85 L92 106 M108 85 L108 106 M114 86 L114 104" stroke="#222" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </svg>
        )}
      </div>

      {/* Extra Added Panels (if user added more items) */}
      {extraPanels && extraPanels.length > 0 && extraPanels.map((extra, idx) => {
        const extraPos = (extra.bubblePos as any) || (idx % 2 === 0 ? 'top-left' : 'top-right');
        return (
          <div
            key={extra.id || idx}
            className="relative bg-[#fdfbf7] border-2 border-stone-800 rounded-xl overflow-hidden p-3 aspect-4/3 flex flex-col justify-between shadow-xs group"
          >
            {extra.imageUrl ? (
              <div className="absolute inset-0 w-full h-full">
                <img src={extra.imageUrl} alt={`Panel ${idx + 5}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-amber-50/50 flex items-center justify-center p-4 text-center">
                <span className="font-hand text-stone-400 text-sm">Panel Tambahan #{idx + 5}</span>
              </div>
            )}

            {extra.text && (
              <div className={`${getBubblePositionClass(extraPos)} relative bg-white/95 backdrop-blur-xs border-2 border-stone-800 rounded-2xl px-3.5 py-1.5 max-w-[85%] shadow-[2px_3px_0px_#231f1d] z-10`}>
                <p className="font-hand text-sm md:text-base font-bold text-stone-900 leading-snug">
                  {extra.text}
                </p>
                <div className={getTailPositionClass(extraPos)}></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Couple illustration for "Our Story" */
export function CoupleStoryIllustration() {
  return (
    <div className="w-full max-w-sm mx-auto bg-[#f8f5ee] rounded-xl border-2 border-stone-800 overflow-hidden shadow-xs">
      <svg viewBox="0 0 320 200" className="w-full h-auto">
        <rect width="320" height="200" fill="#f8f5ee" />
        {/* Room / Cafe Window */}
        <rect x="90" y="20" width="80" height="90" fill="#e9e2d5" stroke="#444" strokeWidth="2" rx="3" />
        <line x1="90" y1="65" x2="170" y2="65" stroke="#444" strokeWidth="2" />
        <line x1="130" y1="20" x2="130" y2="110" stroke="#444" strokeWidth="2" />
        {/* Leaves */}
        <path d="M15 90 Q35 50 30 20 Q10 50 15 90" fill="#889d7d" stroke="#333" strokeWidth="1.8" />
        <path d="M25 110 Q50 80 55 50 Q35 80 25 110" fill="#98ad8d" stroke="#333" strokeWidth="1.8" />

        {/* Andi */}
        <g transform="translate(30, 30)">
          <path d="M20 155 C20 110 50 100 85 100 C120 100 135 110 135 155 Z" fill="#2d3136" stroke="#222" strokeWidth="2.5" />
          <rect x="65" y="85" width="22" height="25" fill="#ffd5be" stroke="#222" strokeWidth="2" />
          <ellipse cx="76" cy="68" rx="34" ry="32" fill="#ffd5be" stroke="#222" strokeWidth="2.5" />
          <path d="M42 64 C38 40 55 24 80 24 C106 24 116 44 112 70 C108 55 98 48 88 48 C78 48 70 58 60 52 C50 56 46 65 42 64 Z" fill="#282220" stroke="#222" strokeWidth="2.5" />
          {/* Eyes looking at Sinta (to the right) */}
          <circle cx="72" cy="68" r="4" fill="#222" />
          <circle cx="92" cy="68" r="4" fill="#222" />
          <circle cx="64" cy="76" r="5" fill="#ffb4a2" opacity="0.6" />
          <circle cx="98" cy="76" r="5" fill="#ffb4a2" opacity="0.6" />
          {/* Smile */}
          <path d="M78 76 Q82 82 88 76" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* Sinta */}
        <g transform="translate(145, 35)">
          <path d="M35 150 C35 110 65 100 95 100 C125 100 145 110 145 150 Z" fill="#f5eee6" stroke="#222" strokeWidth="2.5" />
          <rect x="80" y="85" width="20" height="25" fill="#ffe0cf" stroke="#222" strokeWidth="2" />
          <ellipse cx="90" cy="70" rx="30" ry="28" fill="#ffe0cf" stroke="#222" strokeWidth="2.5" />
          <path d="M58 68 C56 36 72 26 98 26 C124 26 132 40 128 85 C118 90 114 75 114 62 C104 52 86 52 78 62 C72 70 66 86 58 68 Z" fill="#4d3326" stroke="#222" strokeWidth="2.5" />
          {/* Eyes looking at Andi (to the left) */}
          <circle cx="78" cy="70" r="4" fill="#222" />
          <circle cx="98" cy="70" r="4" fill="#222" />
          <circle cx="72" cy="78" r="5" fill="#ffb4a2" opacity="0.6" />
          <circle cx="104" cy="78" r="5" fill="#ffb4a2" opacity="0.6" />
          <path d="M84 78 Q88 84 94 78" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/** Individual Groom Avatar Doodle */
export function GroomAvatar() {
  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-[#f8f5ee] border-2 border-stone-800 p-1 shadow-xs flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="#fdfaf3" />
        {/* Suit / Collar */}
        <path d="M25 120 C25 95 40 85 60 85 C80 85 95 95 95 120 Z" fill="#2d3136" stroke="#222" strokeWidth="2.2" />
        <polygon points="60,85 52,105 60,118 68,105" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
        <polygon points="56,92 64,92 60,98" fill="#d97a68" />
        {/* Neck */}
        <rect x="53" y="74" width="14" height="15" fill="#ffd5be" stroke="#222" strokeWidth="1.8" />
        {/* Head */}
        <ellipse cx="60" cy="58" rx="22" ry="22" fill="#ffd5be" stroke="#222" strokeWidth="2" />
        {/* Hair */}
        <path d="M38 54 C34 38 46 28 62 28 C80 28 85 40 82 58 C78 46 72 40 64 40 C56 40 50 48 44 44 C40 48 39 52 38 54 Z" fill="#282220" stroke="#222" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="53" cy="58" r="2.8" fill="#222" />
        <circle cx="67" cy="58" r="2.8" fill="#222" />
        {/* Blush */}
        <circle cx="47" cy="64" r="3.5" fill="#ffb4a2" opacity="0.6" />
        <circle cx="73" cy="64" r="3.5" fill="#ffb4a2" opacity="0.6" />
        {/* Smile */}
        <path d="M57 65 Q60 69 63 65" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Individual Bride Avatar Doodle */
export function BrideAvatar() {
  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-[#f8f5ee] border-2 border-stone-800 p-1 shadow-xs flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="#fdfaf3" />
        {/* Dress / Veil */}
        <path d="M28 120 C28 95 44 85 60 85 C76 85 92 95 92 120 Z" fill="#fdfbf7" stroke="#222" strokeWidth="2.2" />
        {/* Pearl Necklace */}
        <path d="M48 90 Q60 98 72 90" stroke="#c4a482" strokeWidth="1.5" strokeDasharray="2,3" fill="none" />
        {/* Neck */}
        <rect x="53" y="74" width="14" height="15" fill="#ffe0cf" stroke="#222" strokeWidth="1.8" />
        {/* Head */}
        <ellipse cx="60" cy="58" rx="20" ry="20" fill="#ffe0cf" stroke="#222" strokeWidth="2" />
        {/* Hair with veil / bun */}
        <ellipse cx="60" cy="36" rx="12" ry="10" fill="#4d3326" stroke="#222" strokeWidth="1.8" />
        <path d="M40 56 C38 34 48 28 64 28 C80 28 84 38 80 66 C74 54 70 42 60 42 C52 42 46 50 40 56 Z" fill="#4d3326" stroke="#222" strokeWidth="2" />
        {/* Flower in hair */}
        <circle cx="72" cy="40" r="3.5" fill="#ffffff" stroke="#222" strokeWidth="1.2" />
        <circle cx="72" cy="40" r="1.5" fill="#e8c872" />
        {/* Eyes with subtle lashes */}
        <circle cx="54" cy="58" r="2.8" fill="#222" />
        <circle cx="66" cy="58" r="2.8" fill="#222" />
        <line x1="56" y1="56" x2="58" y2="54" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="68" y1="56" x2="70" y2="54" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
        {/* Blush */}
        <circle cx="49" cy="64" r="3.5" fill="#ffb4a2" opacity="0.6" />
        <circle cx="71" cy="64" r="3.5" fill="#ffb4a2" opacity="0.6" />
        {/* Smile */}
        <path d="M57 65 Q60 69 63 65" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Map Illustration */
export function MapIllustration() {
  return (
    <div className="w-full bg-[#f4ece1] rounded-xl border-2 border-stone-800 p-2 overflow-hidden shadow-xs relative">
      <svg viewBox="0 0 360 180" className="w-full h-auto">
        <rect width="360" height="180" fill="#f4ede2" />

        {/* Roads */}
        <path d="M0 70 C100 75 180 50 360 60" stroke="#fff" strokeWidth="24" strokeLinecap="round" />
        <path d="M0 70 C100 75 180 50 360 60" stroke="#d5c8b6" strokeWidth="2" strokeDasharray="6 4" fill="none" />

        <path d="M120 0 C125 80 130 140 140 180" stroke="#fff" strokeWidth="20" />
        <path d="M120 0 C125 80 130 140 140 180" stroke="#d5c8b6" strokeWidth="2" strokeDasharray="6 4" fill="none" />

        <path d="M240 60 C245 100 270 140 300 180" stroke="#fff" strokeWidth="18" />

        {/* Trees */}
        <g transform="translate(40, 110)">
          <circle cx="15" cy="15" r="14" fill="#9db090" stroke="#333" strokeWidth="1.8" />
          <circle cx="10" cy="12" r="10" fill="#889e7b" />
          <rect x="13" y="28" width="4" height="10" fill="#695643" stroke="#333" strokeWidth="1.5" />
        </g>
        <g transform="translate(260, 20)">
          <circle cx="15" cy="15" r="12" fill="#9db090" stroke="#333" strokeWidth="1.8" />
          <rect x="13" y="26" width="4" height="8" fill="#695643" stroke="#333" strokeWidth="1.5" />
        </g>

        {/* Building: Gedung Serbaguna Melati */}
        <g transform="translate(170, 95)">
          <rect x="0" y="10" width="65" height="42" fill="#faf7f0" stroke="#333" strokeWidth="2.2" rx="2" />
          <polygon points="32.5,0 -5,12 70,12" fill="#d97a68" stroke="#333" strokeWidth="2.2" />
          <rect x="10" y="20" width="10" height="12" fill="#bad3d9" stroke="#333" strokeWidth="1.5" />
          <rect x="45" y="20" width="10" height="12" fill="#bad3d9" stroke="#333" strokeWidth="1.5" />
          <rect x="26" y="30" width="13" height="22" fill="#c49b66" stroke="#333" strokeWidth="1.8" />
          <circle cx="36" cy="40" r="1.5" fill="#333" />
        </g>

        {/* Red Map Pin */}
        <g transform="translate(195, 62)">
          <path
            d="M12 0 C5.3 0 0 5.3 0 12 C0 21 12 34 12 34 C12 34 24 21 24 12 C24 5.3 18.7 0 12 0 Z"
            fill="#d94b40"
            stroke="#222"
            strokeWidth="2"
          />
          <circle cx="12" cy="11" r="4.5" fill="#ffffff" />
        </g>

        {/* Compass "N" */}
        <g transform="translate(325, 20)">
          <circle cx="14" cy="14" r="13" fill="#ffffff" stroke="#333" strokeWidth="1.8" />
          <polygon points="14,4 10,14 18,14" fill="#d94b40" stroke="#333" strokeWidth="1" />
          <polygon points="14,24 10,14 18,14" fill="#333" />
          <text x="11" y="0" font-family="sans-serif" font-size="10" font-weight="bold" fill="#333">N</text>
        </g>
      </svg>
    </div>
  );
}

/** 6 Polaroid Photo Illustrations with Custom Photos Support */
export interface GalleryPhotoItem {
  imageUrl?: string;
  caption?: string;
}

export function PolaroidGallery({
  onSelect,
  customPhotos,
}: {
  onSelect?: (index: number) => void;
  customPhotos?: (GalleryPhotoItem | undefined)[];
}) {
  const polaroids = [
    {
      title: customPhotos?.[0]?.caption || "Momen Manis Pertama",
      desc: "Pertemuan hangat di awal kisah kita",
      customUrl: customPhotos?.[0]?.imageUrl,
      svg: (
        <svg viewBox="0 0 160 140" className="w-full h-full">
          <rect width="160" height="140" fill="#f4ede2" />
          <circle cx="80" cy="70" r="50" fill="#faeedd" />
          {/* Couple gazing */}
          <g transform="translate(30, 25)">
            <ellipse cx="25" cy="50" rx="18" ry="17" fill="#ffd5be" stroke="#222" strokeWidth="1.8" />
            <path d="M8 48 C6 30 18 18 35 18 C45 18 48 28 46 45 Z" fill="#282220" stroke="#222" strokeWidth="1.8" />
            <circle cx="28" cy="50" r="2.5" fill="#222" />
            <ellipse cx="75" cy="52" rx="16" ry="15" fill="#ffe0cf" stroke="#222" strokeWidth="1.8" />
            <path d="M58 50 C56 32 68 22 84 22 C95 22 100 32 98 60 Z" fill="#4d3326" stroke="#222" strokeWidth="1.8" />
            <circle cx="70" cy="52" r="2.5" fill="#222" />
            {/* Sparkles */}
            <path d="M50 30 Q52 35 50 40 Q48 35 50 30" fill="#e8c872" stroke="#222" strokeWidth="1" />
            <circle cx="50" cy="35" r="2" fill="#d97a68" />
          </g>
        </svg>
      ),
    },
    {
      title: customPhotos?.[1]?.caption || "Senja di Pantai",
      desc: "Menikmati matahari terbenam berdua",
      customUrl: customPhotos?.[1]?.imageUrl,
      svg: (
        <svg viewBox="0 0 160 140" className="w-full h-full">
          {/* Sunset sky gradient */}
          <rect width="160" height="140" fill="#f9d7a5" />
          <circle cx="80" cy="85" r="30" fill="#f79c65" opacity="0.8" />
          {/* Sea */}
          <rect x="0" y="85" width="160" height="55" fill="#7fa6a8" />
          <line x1="0" y1="85" x2="160" y2="85" stroke="#222" strokeWidth="1.5" />
          {/* Silhouette back view of couple */}
          <g transform="translate(48, 70)">
            <ellipse cx="22" cy="18" rx="9" ry="9" fill="#282220" />
            <path d="M12 26 C12 26 22 24 32 26 L32 55 L12 55 Z" fill="#2d3136" />
            <ellipse cx="44" cy="22" rx="8" ry="8" fill="#4d3326" />
            <path d="M36 30 C36 30 44 28 52 30 L52 55 L36 55 Z" fill="#f5eee6" stroke="#222" strokeWidth="1" />
          </g>
        </svg>
      ),
    },
    {
      title: customPhotos?.[2]?.caption || "Ceria Bersama",
      desc: "Tawa yang selalu mewarnai hari-hari",
      customUrl: customPhotos?.[2]?.imageUrl,
      svg: (
        <svg viewBox="0 0 160 140" className="w-full h-full">
          <rect width="160" height="140" fill="#f4ede2" />
          {/* Andi peace sign and Sinta */}
          <g transform="translate(30, 25)">
            <ellipse cx="30" cy="48" rx="20" ry="19" fill="#ffd5be" stroke="#222" strokeWidth="1.8" />
            <path d="M12 45 C10 26 24 16 42 16 C54 16 58 28 55 48 Z" fill="#282220" stroke="#222" strokeWidth="1.8" />
            <circle cx="28" cy="48" r="3" fill="#222" />
            <circle cx="40" cy="48" r="3" fill="#222" />
            <path d="M30 55 Q35 60 40 55" stroke="#222" strokeWidth="1.8" fill="none" />
            {/* Peace sign hand */}
            <path d="M5 45 L5 30 L9 30 L9 45 L13 32 L17 34 L12 48" stroke="#222" strokeWidth="1.8" fill="#ffd5be" />

            {/* Sinta smile */}
            <ellipse cx="75" cy="54" rx="18" ry="17" fill="#ffe0cf" stroke="#222" strokeWidth="1.8" />
            <path d="M56 50 C54 32 68 20 86 20 C98 20 102 32 100 62 Z" fill="#4d3326" stroke="#222" strokeWidth="1.8" />
            <circle cx="68" cy="54" r="3" fill="#222" />
            <circle cx="82" cy="54" r="3" fill="#222" />
            <path d="M72 60 Q76 65 80 60" stroke="#222" strokeWidth="1.8" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      title: customPhotos?.[3]?.caption || "Hangat & Penuh Kasih",
      desc: "Selalu ada untuk saling menjaga",
      customUrl: customPhotos?.[3]?.imageUrl,
      svg: (
        <svg viewBox="0 0 160 140" className="w-full h-full">
          <rect width="160" height="140" fill="#f4ede2" />
          {/* Andi patting Sinta's head */}
          <g transform="translate(30, 20)">
            <ellipse cx="28" cy="45" rx="19" ry="18" fill="#ffd5be" stroke="#222" strokeWidth="1.8" />
            <path d="M10 42 C8 24 22 14 40 14 C52 14 56 26 53 45 Z" fill="#282220" stroke="#222" strokeWidth="1.8" />
            <circle cx="28" cy="45" r="2.8" fill="#222" />
            <path d="M26 53 Q30 58 35 53" stroke="#222" strokeWidth="1.6" fill="none" />

            {/* Hand extending over Sinta's head */}
            <path d="M46 45 Q62 25 72 32" stroke="#222" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="72" cy="32" rx="6" ry="4" fill="#ffd5be" stroke="#222" strokeWidth="1.5" />

            {/* Sinta happy head tilt */}
            <ellipse cx="75" cy="55" rx="18" ry="17" fill="#ffe0cf" stroke="#222" strokeWidth="1.8" />
            <path d="M56 52 C54 34 68 24 86 24 C98 24 102 36 100 66 Z" fill="#4d3326" stroke="#222" strokeWidth="1.8" />
            {/* Happy closed curve eyes ^ ^ */}
            <path d="M66 54 Q70 50 74 54" stroke="#222" strokeWidth="2" fill="none" />
            <path d="M80 54 Q84 50 88 54" stroke="#222" strokeWidth="2" fill="none" />
            <path d="M74 61 Q77 66 82 61" stroke="#222" strokeWidth="1.8" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      title: customPhotos?.[4]?.caption || "Janji Suci",
      desc: "Menatap masa depan bersama",
      customUrl: customPhotos?.[4]?.imageUrl,
      svg: (
        <svg viewBox="0 0 160 140" className="w-full h-full">
          <rect width="160" height="140" fill="#faebd7" />
          <circle cx="80" cy="70" r="32" fill="#fed7aa" opacity="0.8" />
          <g transform="translate(62, 50)">
            <rect x="8" y="18" width="20" height="18" rx="3" fill="#b91c1c" stroke="#222" strokeWidth="1.8" />
            <polygon points="8,18 18,6 28,18" fill="#ef4444" stroke="#222" strokeWidth="1.8" />
            <circle cx="18" cy="14" r="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="18" y1="5" x2="18" y2="2" stroke="#f59e0b" strokeWidth="1.8" />
            <line x1="26" y1="10" x2="29" y2="8" stroke="#f59e0b" strokeWidth="1.8" />
            <line x1="10" y1="10" x2="7" y2="8" stroke="#f59e0b" strokeWidth="1.8" />
          </g>
          <text x="80" y="115" textAnchor="middle" font-family="'Patrick Hand', cursive, sans-serif" font-size="13" font-weight="bold" fill="#333">
            Forever &amp; Always ❤️
          </text>
        </svg>
      ),
    },
    {
      title: customPhotos?.[5]?.caption || "Menuju Bahagia",
      desc: "Melangkah beriringan selamanya",
      customUrl: customPhotos?.[5]?.imageUrl,
      svg: (
        <svg viewBox="0 0 160 140" className="w-full h-full">
          <rect width="160" height="140" fill="#f4ede2" />
          <g transform="translate(32, 25)">
            <ellipse cx="28" cy="50" rx="18" ry="18" fill="#ffd5be" stroke="#222" strokeWidth="1.8" />
            <path d="M12 48 C10 30 22 20 40 20 C52 20 54 30 52 50 Z" fill="#282220" stroke="#222" strokeWidth="1.8" />
            <circle cx="28" cy="50" r="2.5" fill="#222" />
            <ellipse cx="75" cy="52" rx="16" ry="15" fill="#ffe0cf" stroke="#222" strokeWidth="1.8" />
            <path d="M58 50 C56 32 68 22 84 22 C95 22 100 32 98 60 Z" fill="#4d3326" stroke="#222" strokeWidth="1.8" />
            <circle cx="70" cy="52" r="2.5" fill="#222" />
            <path d="M50 30 Q52 35 50 40 Q48 35 50 30" fill="#e8c872" stroke="#222" strokeWidth="1" />
            <circle cx="50" cy="35" r="2" fill="#d97a68" />
          </g>
          <text x="80" y="118" textAnchor="middle" font-family="'Patrick Hand', cursive, sans-serif" font-size="12" font-weight="bold" fill="#555">
            Together as One
          </text>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-lg mx-auto">
      {polaroids.map((item, idx) => (
        <div
          key={idx}
          onClick={() => onSelect && onSelect(idx)}
          className="relative bg-white p-2 pb-5 border-2 border-stone-800 rounded-sm shadow-[3px_4px_0px_#231f1d] hover:shadow-[5px_6px_0px_#231f1d] transition-all hover:-translate-y-1 cursor-pointer group"
        >
          {/* Tape strip on top with alternating tilt */}
          <div
            className={`absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-amber-100/90 border border-amber-300/70 opacity-90 z-10 shadow-xs pointer-events-none ${
              idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'
            }`}
          />

          {/* Picture frame */}
          <div className="border border-stone-800/40 rounded-xs overflow-hidden aspect-square flex items-center justify-center bg-stone-100 relative">
            {item.customUrl ? (
              <img
                src={item.customUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              item.svg
            )}
          </div>

          <div className="text-center mt-2 px-1">
            <p className="font-hand text-xs md:text-sm font-bold text-stone-800 truncate">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
