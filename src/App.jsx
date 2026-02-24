import { lazy, Suspense } from "react";
import Hero from "./sections/Hero";
import Navbar from "./components/NavBar";
import BackgroundDecorations from "./components/BackgroundDecorations";

// Lazy-load below-the-fold sections to reduce initial bundle size
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const Experience = lazy(() => import("./sections/Experience"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => (
  <>
    <BackgroundDecorations />
    <Navbar />
    <Hero />
    <Suspense fallback={null}>
      <ShowcaseSection />
      <Experience />
      <TechStack />
      <Contact />
      <Footer />
    </Suspense>
  </>
);

export default App;
