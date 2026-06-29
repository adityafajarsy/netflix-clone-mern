import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full aspect-[2/3] bg-[#18181B] border border-[#3F3F46]/40 rounded-2xl animate-pulse flex flex-col justify-end p-4 gap-2">
      <div className="h-4 bg-[#27272A] rounded-md w-3/4"></div>
      <div className="h-3 bg-[#27272A] rounded-md w-1/2"></div>
    </div>
  );
};

export default Skeleton;

