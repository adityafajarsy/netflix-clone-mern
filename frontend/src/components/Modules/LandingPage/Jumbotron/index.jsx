import React from "react";
import InputMembership from "@/components/Modules/LandingPage/InputMembership";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { languageAtom } from "@/jotai/atoms";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import {
  LIST_JUMBOTRON_EN,
  LIST_JUMBOTRON_ID,
} from "@/constants/listJumbotron";

const Jumbotron = () => {
  const [language] = useAtom(languageAtom);

  return (
    <div className="mb-20 px-12">
      <img
        className="absolute top-0 left-0 object-cover h-[700px] z-0"
        src={JUMBOTRON_IMAGE}
        alt="Netflix-bg"
        width={2000}
      />
      <div className="bg-black max-w-screen w-[1905px] h-[605px] opacity-60 top-0 flex items-center justify-center left-0 z-0 absolute"></div>

      <EachUtils
        of={language == "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
        render={(item, index) => (
          <div
            key={index}
            className="relative flex flex-col justify-center items-center text-center"
          >
            <h1 className="font-black text-white text-4xl mt-44 gap-4">
              {item.title}
            </h1>
            <p className="text-white text-xl mt-4">{item.desc}</p>
            <InputMembership />
          </div>
        )}
      />
    </div>
  );
};

export default Jumbotron;
