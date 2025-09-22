import { useNavigate } from "react-router-dom";
import DefaultButton from "@/components/Modules/LandingPage/DefaultButton";
import OptionLanguage from "@/components/Modules/LandingPage/OptionLanguage";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-20">
      <nav className="flex flex-wrap justify-between items-center pr-32 pl-44 py-4">
        <div>
          <img
            src="/netflix-logo-icon-dea-afrizal.png"
            alt="Netflix Logo"
            width={160}
            height={45}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <OptionLanguage />
          <DefaultButton text="Sign In" onClick={() => navigate("/login")} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
