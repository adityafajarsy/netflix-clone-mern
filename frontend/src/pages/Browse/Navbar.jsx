import InputSearchMovies from "@mods/BrowsePage/InputSearchMovies";
import { LIST_NAVBAR } from "@/constants/ListNavbar";
import EachUtils from "@/utils/EachUtils";
import React from "react";
import AccountMenu from "@/components/Modules/BrowsePage/AccountMenu";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="relative">
      <nav className="bg-[#141414] fixed text-white top-0 left-0 px-8 py-2 w-full z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 ">
            <img onClick={() => navigate("/browse")}
              src="/netflix-logo-icon-dea-afrizal.png"
              alt="Logo"
              className="w-[120px] ml-2 cursor-pointer hover:scale-125 transition-all"
            />
            <ul className="sm:flex hidden items-center gap-4 ">
              <EachUtils
                of={LIST_NAVBAR}
                render={(item, index) => (
                  <li key={index}>
                    <a href={item.url}>{item.title}</a>
                  </li>
                )}
              />
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <InputSearchMovies />
            <AccountMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
