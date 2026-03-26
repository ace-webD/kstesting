"use client";
import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const outerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const video = videoRef.current;
    if (!outer || !video) return;

    // JS fully owns the video's natural size — no CSS clamp involved
    const setup = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Pick a natural size: 30% of viewport width, clamped, 16:9
      const naturalW = Math.round(Math.min(Math.max(vw * 0.3, 200), 400));
      const naturalH = Math.round(naturalW * (9 / 16));

      // Explicitly stamp dimensions so getBoundingClientRect is never needed
      video.style.transform = "scale(1)";
      video.style.width  = `${naturalW}px`;
      video.style.height = `${naturalH}px`;

      // +1% buffer to prevent subpixel gaps on any screen
      const maxScale = Math.max(vw / naturalW, vh / naturalH) * 1.01;

      return { maxScale };
    };

    let { maxScale } = setup();

    const onResize = () => {
      ({ maxScale } = setup());
      onScroll();
    };

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const totalRange = outer.offsetHeight - window.innerHeight;
      if (totalRange <= 0) return;

      const scrolled  = Math.max(0, -rect.top);
      const progress  = Math.min(1, scrolled / totalRange);

      const ZOOM_IN_END = 0.5;
      const t = progress <= ZOOM_IN_END
        ? progress / ZOOM_IN_END                         // 0→1 zoom in
        : 1 - (progress - ZOOM_IN_END) / (1 - ZOOM_IN_END); // 1→0 zoom out

      const scale = 1 + (maxScale - 1) * t;

      video.style.transform    = `scale(${scale})`;
      video.style.borderRadius = `${8 * (1 - t)}px`;
      video.style.borderWidth  = `${2 * (1 - t)}px`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize",  onResize);
    onScroll(); // sync on mount

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize",  onResize);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: "300vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "#e9e3d5",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{
            // NO width/height here — JS sets them in setup()
            objectFit: "cover",
            transformOrigin: "center center",
            borderRadius: "8px",
            border: "2px solid #2C3E50",
            willChange: "transform",
            flexShrink: 0,
            display: "block",
          }}
        >
          <source src="/asithappen.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}