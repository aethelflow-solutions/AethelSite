
import Services from "../sections/Services";
import HeroSection from "../sections/HeroSection";
import Navbar from "../components/Navbar"
import MissionSection from "../sections/MissionSection";
import ContactSection from "../sections/ContactSection";

function HomepageContent() {
  return (
    <>


      <div className="mx-auto bg-white" >
        {/* <Navbar /> */}
        <div className="sm:p-2 lg:p-4 " >
          <HeroSection />
        </div>
        <Services />
        <div className="sm:p-4 lg:p-8 " >
          <MissionSection />
        </div>
        <ContactSection />
      </div>

    </>

  )
}

export default HomepageContent