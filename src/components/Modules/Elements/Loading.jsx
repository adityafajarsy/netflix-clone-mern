import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <span className="loading loading-infinity w-56 text-gray-600"></span>
      <h2 className="text-center font-bold">Please Wait!</h2>
    </div>
  );
};

export default Loading;
