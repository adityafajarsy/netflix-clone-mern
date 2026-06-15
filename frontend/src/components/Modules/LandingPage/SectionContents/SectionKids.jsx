import React from "react";
import SectionLayout from "@layouts/SectionLayout";
import EachUtils from "@/utils/EachUtils";

import { useAtom } from "jotai";
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from "@/constants/listContent";
import { PROFILE_KIDS_IMAGE } from "@/constants/listAsset";
import { languageAtom } from "@/jotai/atoms";

const SectionProfile = () => {
    const [language,] = useAtom(languageAtom)
  return (
    <SectionLayout>
      <div>
        <img src={PROFILE_KIDS_IMAGE} alt="" />
      </div>
      <EachUtils
        of={language == "en" ? LIST_CONTENT_4_EN : LIST_CONTENT_4_ID}
        render={(item, index) => (
          <div key={index}>
            <h2 className="text-5xl font-black px-8">{item.title}</h2>
            <p className="text-2xl mt-4">{item.desc}</p>
          </div>
        )}
      />
    </SectionLayout>
  );
};

export default SectionProfile;
