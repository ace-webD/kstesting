"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function HeroVideo({ children, cardVideoRef, src = "/asithappen.mp4" }) {
  const runwayRef  = useRef(null);
  const overlayRef = useRef(null);
  const [mounted,   setMounted]   = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!mounted || !isDesktop) return;

    const runway  = runwayRef.current;
    const overlay = overlayRef.current;
    if (!runway || !overlay) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    let rect       = null;
    let hasStarted = false;

    const measure = () => {
      if (!cardVideoRef?.current) return;
      const r = cardVideoRef.current.getBoundingClientRect();
      if (r.width > 0 && r.height > 0)
        rect = { top: r.top, left: r.left, w: r.width, h: r.height };
    };

    const onScroll = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const rRect      = runway.getBoundingClientRect();
      const totalRange = runway.offsetHeight - vh;
      const scrolled   = Math.max(0, -rRect.top);
      const progress   = Math.min(1, scrolled / Math.max(1, totalRange));

      // ── Not yet scrolled into animation ──
      if (progress === 0) {
        overlay.style.opacity = "0";
        if (cardVideoRef?.current) cardVideoRef.current.style.opacity = "1";
        hasStarted = false;
        return;
      }

      // ── EXIT phase: runway scrolling off the top — fade video out ──
      if (rRect.bottom < vh) {
        const fade = Math.max(0, rRect.bottom / vh);
        overlay.style.opacity = String(fade);
        if (cardVideoRef?.current)
          cardVideoRef.current.style.opacity = String(1 - fade);
        return;
      }

      // ── ENTER phase: capture card rect once at sticky position ──
      if (!hasStarted) {
        measure();
        hasStarted = true;
      }
      if (!rect) return;

      // First 50% of runway = zoom in, last 50% = hold fullscreen
      const t = ease(Math.min(1, progress / 0.5));

      overlay.style.top          = `${lerp(rect.top,  0,  t)}px`;
      overlay.style.left         = `${lerp(rect.left, 0,  t)}px`;
      overlay.style.width        = `${lerp(rect.w, vw, t)}px`;
      overlay.style.height       = `${lerp(rect.h, vh, t)}px`;
      overlay.style.borderRadius = `${lerp(8, 0, t)}px`;
      overlay.style.opacity      = "1";

      if (cardVideoRef?.current) cardVideoRef.current.style.opacity = "0";
    };

    const onResize = () => {
      rect = null;
      hasStarted = false;
      requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, isDesktop, cardVideoRef]);

  return (
    <>
      {/* Runway: 250vh scroll space. Card sticky-pins inside on desktop only. */}
      <div ref={runwayRef} style={{ height: isDesktop ? "250vh" : "auto" }}>
        <div style={{ position: isDesktop ? "sticky" : "relative", top: 0 }}>
          {children}
        </div>
      </div>

      {/* Portal overlay video — animates from card position to fullscreen */}
      {mounted && isDesktop && createPortal(
        <video
          ref={overlayRef}
          autoPlay muted loop playsInline
          style={{
            position: "fixed",
            objectFit: "cover",
            opacity: 0,
            zIndex: 500,
            border: "2px solid #2C3E50",
            pointerEvents: "none",
            margin: 0,
            padding: 0,
          }}
        >
          <source src={src} type="video/mp4" />
        </video>,
        document.body
      )}
    </>
  );
}