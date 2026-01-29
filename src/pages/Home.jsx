import Comparison from "../components/Comparison";
import FooterCTA from "../components/FooterCTA";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import SkillMarquee from "../components/SkillMarquee";

function Home() {
  return (
    <div>
      <Hero />
      <SkillMarquee />
      <HowItWorks />
      <Comparison />
      <FooterCTA />
    </div>
  );
}

export default Home;
