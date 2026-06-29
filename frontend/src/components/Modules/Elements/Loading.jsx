import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090B] overflow-hidden select-none">
      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#7C3AED]/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-[#8B5CF6]/10 rounded-full blur-[80px]" />
      </div>

      {/* Logo & Spinner Group */}
      <div className="relative flex flex-col items-center gap-8 z-10">
        {/* Spinning ring + logo center */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer spinning arc */}
          <svg
            className="absolute inset-0 w-full h-full animate-spin"
            style={{ animationDuration: "1.8s" }}
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="url(#velixGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="180 96"
            />
            <defs>
              <linearGradient id="velixGrad" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner static track ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="44" stroke="#27272A" strokeWidth="3" />
          </svg>

          {/* Logo center */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-xl shadow-[#7C3AED]/40 z-10">
            <span className="text-white font-black text-3xl tracking-tighter leading-none">V</span>
          </div>
        </div>

        {/* Brand Name */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-2xl font-black tracking-[0.3em] text-[#FAFAFA] font-sans">
            VELIX
          </span>

          {/* Animated dots */}
          <div className="flex items-center gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"
                style={{
                  animation: `velixDotBounce 1.2s ease-in-out infinite`,
                  animationDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Injected animation keyframes */}
      <style>{`
        @keyframes velixDotBounce {
          0%, 100% { opacity: 0.25; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.6); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
