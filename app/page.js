import { Hero, Navbar } from "./components/Hero";
import Footer from "./components/Footer";
import Sponsors from "./components/Sponsors";
import EventSection from "./components/EventSection";

export default function Home() {
  return (
    <>
      <Hero />
      <EventSection />
      <Sponsors />
      <Footer />
    </>
  )
}
