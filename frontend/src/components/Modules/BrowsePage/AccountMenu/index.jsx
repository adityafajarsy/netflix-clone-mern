import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { axiosInstanceExpress } from "@/utils/axios";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";

const AccountMenu = () => {
  const navigate = useNavigate();
  const [token, setIsToken] = useAtom(tokenAtom);
  const [email, setEmailStorage] = useAtom(emailStorageAtom);

  const handleSignOut = async () => {
    const data = { email, token };
    const dbSignOut = await axiosInstanceExpress.delete("my-token", {
      data,
    });

    if (dbSignOut.status === 204) {
      signOut(auth).then(() => {
        setIsToken(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
  };

  return (
    <div className="flex dropdown dropdown-hover dropdown-end">
      <div className="avatar" tabIndex={0}>
        <div className="w-12 rounded">
          <img src="https://admin103.digivestasi.com/upload/posts/timothy-ronald-sosok-investor-muda-yang-menginspirasi-generasi-baru-bangun-masa-depan-indonesia-6861f20dd97fc.webp" />
        </div>
      </div>
      <div className="flex flex-col gap-2 py-2 px-4 dropdown-content absolute top-10 z-30 bg-black text-stone-200 rounded-xl">
        <p className="text-sm italic ">{email}</p>
        <button
          onClick={handleSignOut}
          tabIndex={0}
          className="hover:text-white cursor-pointer transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;
