import React from "react";
import EachUtils from "@/utils/EachUtils";
import DefaultButton from "@/components/Modules/LandingPage/DefaultButton";

import { useAtom } from "jotai";
import { emailAtom, languageAtom } from "@/jotai/atoms";
import { LIST_CTA_EN, LIST_CTA_ID } from "@/constants/listCTA";
import { useNavigate } from "react-router-dom";

const InputMembership = () => {
  const [language] = useAtom(languageAtom);
  const navigate = useNavigate();
  const [, setEmail] = useAtom(emailAtom);

  const handleEmail = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <form>
      <EachUtils
        of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
        render={(item, index) => (
          <div key={index}>
            <h3 className="mt-8 text-white text-xl">{item.title}</h3>
            <div className="relative flex flex-row justify-center gap-2 py-4 items-center">
              <input
                type="email"
                placeholder={item.labelInput}
                className="w-full p-4 bg-[#1a1510]/70 rounded-md border border-white/50 peer placeholder-transparent"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute top-0 left-2 pl-2 peer-placeholder-shown:top-8 peer-focus:top-[16px] transition-all text-lg">
                {item.labelInput}
              </label>
              <DefaultButton
                onClick={handleEmail}
                text={item.buttonSubmit}
                isArrowIcon={true}
                styles=" flex py-4 w-1/2 flex justify-center text-xl items-center gap-2"
              />
            </div>
          </div>
        )}
      />
    </form>
  );
};

export default InputMembership;
