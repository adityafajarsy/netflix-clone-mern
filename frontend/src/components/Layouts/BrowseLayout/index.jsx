import Loading from "@/components/Modules/Elements/Loading";
import Navbar from "@/pages/Browse/Navbar";
import { auth } from "@/utils/firebase";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const BrowseLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <Loading />;

  if (error) return <p className="text-white text-center mt-20">Error loading page</p>;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] relative">
      <Navbar />
      <main className="relative z-10">{children}</main>
    </div>
  );
};

export default BrowseLayout;

