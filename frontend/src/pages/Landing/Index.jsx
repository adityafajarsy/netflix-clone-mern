import Footer from "@/components/Modules/LandingPage/Footer";
import SectionDownload from "@/components/Modules/LandingPage/SectionContents/SectionDownload";
import SectionFAQ from "@/components/Modules/LandingPage/SectionContents/SectionFAQ";
import SectionProfile from "@/components/Modules/LandingPage/SectionContents/SectionKids";
import SectionWatch from "@/components/Modules/LandingPage/SectionContents/SectionWatch";
import DefaultLayout from "@layouts/DefaultLayout";
import Jumbotron from "@/components/Modules/LandingPage/Jumbotron";
import SectionEnjoy from "@/components/Modules/LandingPage/SectionContents/SectionEnjoy";

function Landing() {
  return (
    <DefaultLayout>
      <Jumbotron />
      <SectionEnjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFAQ />
      <Footer />
    </DefaultLayout>
  );
}

export default Landing;
