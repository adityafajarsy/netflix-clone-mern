import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import { useAtom } from "jotai";
import { emailAtom, emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast, ToastContainer } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosInstanceExpress } from "@/utils/axios";

const Login = () => {
  const navigate = useNavigate();

  const [, setToken] = useAtom(tokenAtom);
  const [, setEmailStorage] = useAtom(emailStorageAtom);

  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const login = await signInWithEmailAndPassword(auth, email, password);

      const firebaseToken = await getIdToken(login.user);

      const addToken = await axiosInstanceExpress.post("my-token", {
        email,
        password,
        token: firebaseToken,
      });

      if (addToken.status !== 200)
        return toast("Cannot sign in now, try again later");

      setToken(firebaseToken);
      setEmailStorage(login.user.email);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/browse");
      }, 2000);
      toast("Login Berhasil, mohon tunggu...");
    } catch (error) {
      setIsLoading(false);
      toast(error.code);
    }
  };

  return (
    <DefaultLayout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <img
        className="image-full h[100vh] object-cover opacity-70"
        src={JUMBOTRON_IMAGE}
        alt="Jumbotron"
      />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full">
        <form className="flex flex-col gap-4">
          <div className="text-white text-xl font-semibold mb-2 flex items-center gap-2">
            <GoChevronLeft
              onClick={() => navigate("/")}
              size={28}
              className="hover:text-white cursor-pointer text-slate-200"
            />
            <h3>Sign In</h3>
          </div>
          <div className="relative">
            <input
              placeholder="Email"
              type="email"
              value={email ? email : ""}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-[#1a1510]/70 rounded-md border border-white/50 peer placeholder-transparent"
            />
            <label className="absolute top-0 left-2 pl-2 peer-placeholder-shown:top-3.5 peer-focus:top-[2px] transition-all text-lg -z-10">
              Email
            </label>
          </div>
          <div className="relative">
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-[#1a1510]/70 rounded-md border border-white/50 peer placeholder-transparent"
            />
            <label className="absolute top-0 left-2 pl-2 peer-placeholder-shown:top-3.5 peer-focus:top-[2px] transition-all text-lg -z-10">
              Password
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <button
              disabled={isLoading}
              className="py-3 w-full bg-red-500/90 hover:bg-red-500 transition-all text-white font-bold rounded-md active:scale-105 disabled:bg-red-700 cursor-pointer disabled:cursor-wait"
              onClick={handleLogin}
            >
              {isLoading ? "Checking Account..." : "Sign In"}
            </button>
            <p>
              Doesn't Have Account?{" "}
              <span
                className="text-blue-500 underline cursor-pointer ml-2"
                onClick={() => navigate("/register")}
              >
                Sign Up Here
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Login;
