import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import { useAtom } from "jotai";
import { emailAtom } from "@/jotai/atoms";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosInstanceExpress } from "@/utils/axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (register) {
        await signOut(auth)
        const addUser = await axiosInstanceExpress.post("sign-up", {
          email,
          password,
        });
        if (addUser.status === 201) {
          toast("Register Success");
          setTimeout(() => {
            setIsLoading(false)
            navigate("/login");
          }, 2000);
        }
      }
    } catch (error) {
      toast(error.message);
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
        className="w-full h[100vh] object-cover opacity-70"
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
            <h3>Sign Up</h3>
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
              className="bg-red-500 py-3 w-full text-white font-bold rounded-md disabled:bg-red-400 disabled:cursor-wait"
              onClick={handleRegister}
              disabled={isLoading}
            >
              Sign Up
            </button>
            <p>
              Already Have An Account?{" "}
              <span
                className="text-blue-500 underline cursor-pointer ml-2"
                onClick={() => navigate("/login")}
              >
                Sign In Here
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Register;
