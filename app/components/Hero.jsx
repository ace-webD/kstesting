"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import VortexGallery from "./VortexDPI"
// import VortexGallery from "./Vortex"
import Link from "next/link";

const SUZHAL_TRANSLATIONS = [
  { text: "சுழல்", lang: "Tamil" },
  { text: "సుడి", lang: "Telugu" },
  { text: "ചുഴി", lang: "Malayalam" },
  { text: "ಸುಳಿ", lang: "Kannada" },
  { text: "भँवर", lang: "Hindi" },
];
/*
  Diagonal fabric/canvas texture — CSS-only pattern that looks like
  the woven linen texture from the reference image.
*/
export const CANVAS_TEXTURE_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: 500,
  pointerEvents: "none",
  opacity: 0.8,
  mixBlendMode: "normal",
  backgroundImage: "url('/texture.png')",
  backgroundRepeat: "repeat",
};

/* ===== Navbar Component ===== */
export const Navbar = () => {
  const scrollToEvents = (name) => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return(
  <nav
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      display: "flex",
      flexDirection: "column",
      CANVAS_TEXTURE_STYLE
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "clamp(10px, 2vw, 20px) clamp(12px, 3vw, 40px)",
        background: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <Link href={"/"}>
        <Image
        src="/ks_logo.png"
        alt="Kuruksastra"
        color="#E9E1CF"
        width={140}
        height={20}
        priority
        style={{
          width: "clamp(80px, 10vw, 140px)",
          height: "auto",
          filter: "invert(1) brightness(0.95)",
          cursor: "pointer",
        }}
      />
      </Link>
      <div className="flex flex-row justify-end flex-1 gap-x-6 text-xl md:text-3xl md:gap-x-15 text-white" style={{ fontFamily: "'Jomhuria'", opacity: 0.9}}>
        <div className="cursor-pointer text-[#f5f5f5] tracking-wider hover:translate-x-1 transition-all duration-300 ease-in-out uppercase" ><Link href={"/about"}>About</Link></div>
        <div className="cursor-pointer text-[#f5f5f5] tracking-wider hover:translate-x-1 transition-all duration-300 ease-in-out uppercase" ><Link href={"/sponsors"}>Sponsors</Link></div>
        <div className="cursor-pointer text-[#f5f5f5] tracking-wider hover:translate-x-1 transition-all duration-300 ease-in-out uppercase" ><Link href={"/contact"}>Contact</Link></div>
      </div>
    </div>
  </nav>)
}

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SUZHAL_TRANSLATIONS.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const currentText = SUZHAL_TRANSLATIONS[currentIndex].text;

  function getFontSize(text) {
    if (text.length >= 8) return "clamp(2.5rem, 5vw, 6rem)";
    if (text.length >= 6) return "clamp(3rem, 6vw, 7rem)";
    return "clamp(4rem, 6vw, 9rem)";
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden" removed — it was clipping the ScrollTrigger pin
        // spacer div, causing it to appear as white space between sections.
        position: "relative",
        // Background matches the approximate colour of /image.png so the
        // pin spacer (inserted by ScrollTrigger between the two sections)
        // shows this colour instead of a white page background.
        // background: "#b8c5ca",
      }}
    >
      {/* ===== GLOBAL CANVAS/FABRIC TEXTURE OVERLAY ===== */}
      <div style={CANVAS_TEXTURE_STYLE} />

      {/* ===== NAVBAR ===== */}
      

      {/* ===== TOP SECTION — Gradient background with logo ===== */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: "clamp(100px, 20vw, 300px)",
        }}
      >
        {/* Background gradient image */}
        <Image
          src="/image.png"
          alt="Background gradient"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />

        {/* Animated photo vortex overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1}}>
          <VortexGallery />
        </div>

        {/* Title content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "clamp(24px, 5vw, 48px) clamp(12px, 3vw, 24px)",
          }}
        >
          {/* Kuruksastra logo with thick black shadow/border */}
          <div
            style={{
              position: "relative",
              width: "clamp(220px, 50vw, 700px)",
              height: "auto",
            }}
          >
            {/* Main logo — thick black shadow, no border */}
            <Image
              src="/ks_logo.png"
              alt="Kuruksastra"
              width={700}
              height={250}
              priority
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                filter:
                  "invert(1) drop-shadow(clamp(2px, 0.4vw, 4px) clamp(3px, 0.6vw, 7px) 0px rgba(0,0,0,1))",
              }}
            />
          </div>

          {/* Subtitle — bolder font weight */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(6px, 1vw, 12px)",
              marginTop: "clamp(-4px, -0.3vw, -2px)",
            }}
          >
            <span
              style={{
                display: "block",
                height: 1,
                background: "rgba(255,255,255,0.5)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            />
            <p
              style={{
                fontStyle: "italic",
                color: "rgba(255,255,255,1)",
                fontSize: "clamp(12px, 2vw, 22px)",
                fontWeight: 800,
                whiteSpace: "nowrap",
                marginTop: "clamp(-8px, -0.6vw, -6px)",
                textShadow:
                  "clamp(1px, 0.2vw, 2px) clamp(2px, 0.4vw, 4px) 0px rgba(0,0,0,1)",
              }}
            >
              A Cultural Vortex
            </p>
            <span
              style={{
                display: "block",
                height: 1,
                background: "rgba(255,255,255,0.5)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Date badge — white font color */}
          <div
            style={{
              marginTop: "clamp(10px, 2vw, 20px)",
              padding: "0px clamp(18px, 3vw, 35px)",
              background: "#213447",
              borderRadius: "clamp(8px, 1.2vw, 14px)",
              boxShadow:
                "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px rgba(0,0,0,1)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-jomhuria), serif",
                color: "#ffffff",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                letterSpacing: "0.08em",
                lineHeight: 1.2,
                textShadow:
                  "clamp(1px, 0.2vw, 2px) clamp(3px, 0.5vw, 5px) 0px rgba(0,0,0,1)",
                textAlign: "center"
              }}
            >
              April 3rd - 5th
            </span>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SECTION — Comic Vortex Panel ===== */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(35vh, 50vh, 55vh)",
          padding: "clamp(8px, 1.5vw, 16px)",
          backgroundColor: "#E9E1CF",
          
        }}
        className=""
      >
        {/* Inner comic panel */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            border: "clamp(4px, 0.3vw, 10px) solid #000000",
            borderRadius: "clamp(10px, 1.5vw, 16px)",
            minHeight: "clamp(30vh, 40vh, calc(45vh - 40px))",
            boxShadow: "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px rgba(0,0,0,1)"
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              backgroundImage: "url('/vortex_bg_gradient.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Cloud SVG at top */}
          <div
            style={{
              position: "absolute",
              top: -10,
              left: 0,
              right: 0,
              zIndex: 0,
              lineHeight: 0,
            }}
          >
            <img
              src="/cloud.svg"
              alt="Clouds"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Lightning bolts — 4 corner thunder images */}
          <img
            src="/left_top_thunder.png"
            alt=""
            
            style={{
              
              position: "absolute",
              top: -2,
              left: 0,
              width: "clamp(80px, 10vw, 25vw)",
              height: "auto",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
          <img
            src="/left_bottom_thunder.png"
            alt=""
            style={{
              position: "absolute",
              top: "35%",
              left: 0,
              width: "clamp(80px, 15vw, 25vw)",
              height: "auto",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
          <img
            src="/right_top_thunder.png"
            alt=""
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "clamp(80px, 10vw, 20vw)",
              height: "auto",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />
          <img
            src="/right_bottom_thunder.png"
            alt=""
            style={{
              position: "absolute",
              top: "35%",
              right: 0,
              width: "clamp(50px, 5vw, 15vw)",
              height: "auto",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />

          {/* ===== VORTEX + TEXT ===== */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "clamp(30vh, 50vh, calc(45vh - 40px))",
              padding: "clamp(10px, 2vw, 20px) 0",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "clamp(190px, 50vw, 500px)",
              }}
            >
              {/* Whirlwind SVG */}
              <img
                src="/whirlwind.svg"
                alt="Whirlwind vortex"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />

              {/* Cycling text overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "8%",
                }}
              >
                <div
  className={`
    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
    ${isAnimating 
      ? "opacity-0 scale-75 translate-y-2 blur-md" 
      : "opacity-100 scale-100 translate-y-0 blur-0 rotate-0"}
  `}
>
                  <p
                    style={{
                      fontFamily: "var(--font-jomhuria), serif",
                      color: "#f0ece4",
                      fontSize: "clamp(4rem, 8vw, 9rem)",
                      fontWeight: 400,
                      textAlign: "center",
                      lineHeight: 1,
                      margin: 0,
                      userSelect: "none",
                      textShadow: "5px 5px 0px rgba(0,0,0,1)",
                      WebkitTextStroke: "clamp(1.5px, 0.25vw, 2.5px) #000",
                    }}
                  >
                    {SUZHAL_TRANSLATIONS[currentIndex].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};