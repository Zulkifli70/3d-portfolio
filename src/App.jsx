import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import Project from "./sections/Project";

const App = () => (
  <>
    <Navbar />
    <Hero />
    <Project />
    <Experience />
    <TechStack />
    <Contact />
    <Footer />
  </>
);

export default App;
