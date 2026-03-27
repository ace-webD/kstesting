
import Contact from "../components/Contact";
import Footer from "../components/Footer";
const CANVAS_TEXTURE_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: 500,
  pointerEvents: "none",
  opacity: 0.8,
  mixBlendMode: "normal",
  backgroundImage: "url('/texture.png')", // make sure path is correct
  backgroundRepeat: "repeat",
};
export default function SponsorsPage() {
  return (
    <div>
      <Contact />
      <Footer />
    </div>
  );
}