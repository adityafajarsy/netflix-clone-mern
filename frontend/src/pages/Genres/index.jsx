import React, { useEffect, useState } from "react";
import BrowseLayout from "@/components/Layouts/BrowseLayout";
import { getGenres } from "@/utils/getGenres";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Modules/LandingPage/Footer";

// Curated accent colors for genre buttons
const GENRE_COLORS = [
  { bg: "from-[#7C3AED] to-[#8B5CF6]", glow: "shadow-[#7C3AED]/30" },
  { bg: "from-[#DC2626] to-[#EF4444]", glow: "shadow-[#DC2626]/30" },
  { bg: "from-[#0891B2] to-[#06B6D4]", glow: "shadow-[#0891B2]/30" },
  { bg: "from-[#059669] to-[#10B981]", glow: "shadow-[#059669]/30" },
  { bg: "from-[#D97706] to-[#F59E0B]", glow: "shadow-[#D97706]/30" },
  { bg: "from-[#9D174D] to-[#EC4899]", glow: "shadow-[#9D174D]/30" },
  { bg: "from-[#1D4ED8] to-[#3B82F6]", glow: "shadow-[#1D4ED8]/30" },
  { bg: "from-[#7C3AED] to-[#C026D3]", glow: "shadow-[#7C3AED]/30" },
  { bg: "from-[#0F766E] to-[#14B8A6]", glow: "shadow-[#0F766E]/30" },
  { bg: "from-[#92400E] to-[#F97316]", glow: "shadow-[#92400E]/30" },
  { bg: "from-[#374151] to-[#6B7280]", glow: "shadow-[#374151]/30" },
  { bg: "from-[#1E40AF] to-[#60A5FA]", glow: "shadow-[#1E40AF]/30" },
  { bg: "from-[#831843] to-[#BE185D]", glow: "shadow-[#831843]/30" },
  { bg: "from-[#064E3B] to-[#34D399]", glow: "shadow-[#064E3B]/30" },
  { bg: "from-[#1E3A5F] to-[#2563EB]", glow: "shadow-[#1E3A5F]/30" },
  { bg: "from-[#6B21A8] to-[#A855F7]", glow: "shadow-[#6B21A8]/30" },
  { bg: "from-[#9A3412] to-[#EA580C]", glow: "shadow-[#9A3412]/30" },
  { bg: "from-[#155E75] to-[#22D3EE]", glow: "shadow-[#155E75]/30" },
  { bg: "from-[#3F6212] to-[#84CC16]", glow: "shadow-[#3F6212]/30" },
  { bg: "from-[#1C1917] to-[#78716C]", glow: "shadow-[#1C1917]/30" },
];

// Genre icon mapping
const GENRE_ICONS = {
  28: "⚔️",   // Action
  12: "🗺️",   // Adventure
  16: "🎨",   // Animation
  35: "😂",   // Comedy
  80: "🔪",   // Crime
  99: "📽️",   // Documentary
  18: "🎭",   // Drama
  10751: "👨‍👩‍👧‍👦", // Family
  14: "🧙",   // Fantasy
  36: "📜",   // History
  27: "👻",   // Horror
  10402: "🎵", // Music
  9648: "🔍",  // Mystery
  10749: "💕", // Romance
  878: "🚀",  // Science Fiction
  10770: "📺", // TV Movie
  53: "😱",   // Thriller
  10752: "🎖️", // War
  37: "🤠",   // Western
};

const Genres = () => {
  const navigate = useNavigate();
  const [movieGenres, setMovieGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getGenres({ type: "movie" }),
      getGenres({ type: "tv" }),
    ]).then(([movieG, tvG]) => {
      // Merge and deduplicate by name
      const allNames = new Set();
      const merged = [];
      [...movieG, ...tvG].forEach((g) => {
        if (!allNames.has(g.name)) {
          allNames.add(g.name);
          merged.push(g);
        }
      });
      setMovieGenres(merged);
      setLoading(false);
    });
  }, []);

  return (
    <BrowseLayout>
      <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 select-none">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#7C3AED] to-[#8B5CF6] rounded-full" />
            <h1 className="text-4xl font-black tracking-tight text-[#FAFAFA] font-sans">
              Browse by Genre
            </h1>
          </div>
          <p className="text-[#A1A1AA] text-base ml-5 mt-1">
            Pick a genre and dive into a curated collection of films and series.
          </p>
        </div>

        {/* Genre Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-[#18181B] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movieGenres.map((genre, index) => {
              const color = GENRE_COLORS[index % GENRE_COLORS.length];
              const icon = GENRE_ICONS[genre.id] || "🎬";
              return (
                <button
                  key={genre.id}
                  onClick={() => navigate(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`)}
                  className={`group relative h-24 rounded-2xl bg-gradient-to-br ${color.bg} shadow-lg ${color.glow} hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95 overflow-hidden cursor-pointer`}
                >
                  {/* Noise/shimmer overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center gap-1.5 px-3">
                    <span className="text-3xl">{icon}</span>
                    <span className="text-white font-bold text-sm text-center leading-tight drop-shadow-sm">
                      {genre.name}
                    </span>
                  </div>

                  {/* Arrow on hover */}
                  <div className="absolute bottom-2 right-3 text-white/50 text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </BrowseLayout>
  );
};

export default Genres;
