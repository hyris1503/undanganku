import { useMemo } from 'react';

interface GlobalAmbientOverlayProps {
  type?: 'none' | 'leaves' | 'petals' | 'sparkles' | 'hearts' | 'custom';
  customUrl?: string;
}

export function GlobalAmbientOverlay({ type = 'none', customUrl }: GlobalAmbientOverlayProps) {
  // If set to none and no custom URL, render nothing
  if (type === 'none' && !customUrl) {
    return null;
  }

  // If custom URL is provided or type is custom
  if (customUrl || type === 'custom') {
    if (!customUrl) return null;
    const isVideo = customUrl.match(/\.(mp4|webm)$/i);

    return (
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none opacity-75 mix-blend-multiply"
      >
        {isVideo ? (
          <video
            src={customUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : (
          <img
            src={customUrl}
            alt="Custom Ambient Animation"
            className="w-full h-full object-cover pointer-events-none"
          />
        )}
      </div>
    );
  }

  // Preset floating elements
  const items = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: Math.random() * 94 + 3,
      delay: Math.random() * 8,
      duration: Math.random() * 5 + 7, // 7-12s
      size: Math.floor(Math.random() * 10) + 14,
      rotation: Math.floor(Math.random() * 360),
    }));
  }, [type]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
    >
      <style>{`
        @keyframes ambientFall {
          0% {
            top: -8%;
            transform: translateY(0) rotate(0deg);
          }
          100% {
            top: 106%;
            transform: translateY(0) rotate(540deg);
          }
        }
        @keyframes ambientSway {
          0%, 100% {
            transform: translateX(-16px) rotate(-12deg);
          }
          50% {
            transform: translateX(16px) rotate(12deg);
          }
        }
      `}</style>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            left: `${item.left}%`,
            animation: `ambientFall ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
          }}
          className="absolute -top-10 will-change-transform opacity-70"
        >
          <div
            style={{
              animation: `ambientSway ${item.duration * 0.45}s ease-in-out infinite`,
              animationDelay: `${item.delay * 0.5}s`,
            }}
          >
            {/* LEAVES */}
            {type === 'leaves' && (
              <svg
                width={item.size}
                height={item.size * 1.4}
                viewBox="0 0 24 34"
                fill="none"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <path
                  d="M12 2 C19 8 23 18 19 28 C15 33 7 33 3 28 C-1 18 5 8 12 2 Z"
                  fill="#c8d6af"
                  stroke="#5b7052"
                  strokeWidth="1.2"
                />
                <path d="M12 6 C12 14 13 22 12 30" stroke="#5b7052" strokeWidth="0.8" />
                <path d="M12 14 Q16 11 18 13" stroke="#5b7052" strokeWidth="0.6" />
                <path d="M12 20 Q8 18 6 20" stroke="#5b7052" strokeWidth="0.6" />
              </svg>
            )}

            {/* PETALS */}
            {type === 'petals' && (
              <svg
                width={item.size}
                height={item.size * 1.3}
                viewBox="0 0 24 30"
                fill="none"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <path
                  d="M12 2 C19 7 23 16 19 25 C16 30 7 30 4 25 C1 16 5 7 12 2 Z"
                  fill="#ffccd5"
                  stroke="#e898a8"
                  strokeWidth="1.2"
                />
                <path d="M12 8 C12 15 13 21 12 27" stroke="#d88295" strokeWidth="0.7" opacity="0.6" />
              </svg>
            )}

            {/* SPARKLES */}
            {type === 'sparkles' && (
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <path
                  d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z"
                  fill="#fcd34d"
                  stroke="#b45309"
                  strokeWidth="0.8"
                />
              </svg>
            )}

            {/* HEARTS */}
            {type === 'hearts' && (
              <svg
                width={item.size}
                height={item.size}
                viewBox="0 0 24 24"
                fill="#fca5a5"
                stroke="#dc2626"
                strokeWidth="1"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
