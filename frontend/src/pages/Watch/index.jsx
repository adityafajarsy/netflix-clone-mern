import BrowseLayout from "@/components/Layouts/BrowseLayout";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { GoChevronLeft } from "react-icons/go";
import { useAtom } from "jotai";
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);

  useEffect(() => {
    if (!emailStorage && !tokenStorage) {
      navigate("/login");
    }
  }, [emailStorage, tokenStorage, navigate]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none">
      <button
        className="absolute z-50 top-16 sm:top-20 left-4 sm:left-6 text-[#FAFAFA]/90 hover:text-white bg-[#18181B]/80 hover:bg-[#27272A] border border-[#3F3F46]/80 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-2xl active:scale-95 flex items-center justify-center"
        onClick={() => navigate(-1)}
        title="Go Back"
      >
        <GoChevronLeft size={24} className="sm:w-7 sm:h-7" />
      </button>
      <div className="w-full h-full flex items-center justify-center">
        <ReactPlayer
          url={"https://youtube.com/watch?v=" + id}
          width={"100%"}
          height={"100%"}
          playing={true}
          muted={false}
          controls={true}
          config={{
            youtube: {
              playerVars: { autoplay: 1, modestbranding: 1 }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Watch;
