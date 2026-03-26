"use client";
import { useEffect, useRef, useState } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const ORBIT_R = 38;
const NUM_VISIBLE = 5;
const NUM_ELS = 6;

const BASE_CARD_W = 130;
const BASE_CARD_H = 165;

const BASE_SPREAD = 20;
const BASE_VERTICAL = 10;

const SPEED = 0.0025; // 🔥 controls animation speed

const photoNames = [
  "vortex1.jpg","vortex2.jpg","vortex3.jpg","vortex4.jpg",
  "vortex5.jpg","vortex6.jpg","vortex7.jpg","vortex8.jpg",
  "vortex9.jpg","vortex10.jpg","vortex11.jpg","vortex12.jpg"
];

// ─── PILES ────────────────────────────────────────────────────────────────
const PILES = [-90, -30, 30, 90, 150, 210].map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    px: 50 + ORBIT_R * Math.cos(rad),
    py: 50 + ORBIT_R * Math.sin(rad),
    tx: Math.sin(rad),
    ty: -Math.cos(rad),
  };
});

// ─── COMPONENT ────────────────────────────────────────────────────────────
export default function VortexGallery() {
  const containerRef = useRef(null);
  const cardRefs = useRef(PILES.map(() => new Array(NUM_ELS).fill(null)));

  const progressRef = useRef(0);
  const scaleRef = useRef(1);

  const [cardW, setCardW] = useState(BASE_CARD_W);
  const [cardH, setCardH] = useState(BASE_CARD_H);

  // ─── FIXED IMAGES (no rerender randomness) ──────────────────────────────
  const imagesRef = useRef(
    PILES.map(() =>
      Array.from({ length: NUM_ELS }, (_, i) => photoNames[(Math.random()*photoNames.length)|0])
    )
  );

  // ─── RESPONSIVE SCALE ───────────────────────────────────────────────────
  function updateScale() {
    const w = window.innerWidth;
    const scale = Math.min(Math.max(w / 1200, 0.6), 1.3);
    scaleRef.current = scale;

    setCardW(BASE_CARD_W * scale);
    setCardH(BASE_CARD_H * scale);
  }

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // ─── SLOT POSITION ──────────────────────────────────────────────────────
  function getSlot(slot, pile) {
    const s = scaleRef.current;
    return {
      x: slot * BASE_SPREAD * s * pile.tx,
      y: slot * BASE_SPREAD * s * pile.ty + slot * BASE_VERTICAL * s,
    };
  }

  // ─── MAIN LOOP (ULTRA OPTIMIZED) ────────────────────────────────────────
  useEffect(() => {
    let raf;

    const animate = () => {
      progressRef.current += SPEED;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();

      PILES.forEach((pile, pi) => {
        const cards = cardRefs.current[pi];

        cards.forEach((el, i) => {
          if (!el) return;

          const t = (progressRef.current + i * 0.12) % 1;

          // ─── STACK ZONE ─────────────────
          if (t < 0.4) {
            const slot = Math.floor((t / 0.4) * NUM_VISIBLE);
            const pos = getSlot(slot, pile);

            el.style.transform = `
              translate(-50%, -50%)
              translate(${pos.x}px, ${pos.y}px)
              scale(1)
            `;
            el.style.opacity = 1;
            el.style.zIndex = 10 - slot;
          }

          // ─── SWIRL → CENTER ─────────────
          else {
            const p = (t - 0.4) / 0.6;

            const cx = rect.width * (0.5 - pile.px / 100);
            const cy = rect.height * (0.5 - pile.py / 100);

            const tangentX = -pile.ty;
            const tangentY = pile.tx;

            const swirlX = cx + tangentX * 80 * (1 - p);
            const swirlY = cy + tangentY * 80 * (1 - p);

            el.style.transform = `
              translate(-50%, -50%)
              translate(${swirlX}px, ${swirlY}px)
              scale(${1 - p})
              rotate(${p * 20}deg)
            `;
            el.style.opacity = 1 - p;
            el.style.zIndex = 50;
          }
        });
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, []);

  // ─── RENDER ────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {PILES.map((pile, pi) =>
        Array.from({ length: NUM_ELS }).map((_, ei) => (
          <div
            key={`${pi}-${ei}`}
            ref={(el) => (cardRefs.current[pi][ei] = el)}
            style={{
              position: "absolute",
              left: `${pile.px}%`,
              top: `${pile.py}%`,
              width: cardW,
              height: cardH,
              borderRadius: 4,
              overflow: "hidden",
              background: "#111",
              willChange: "transform, opacity",
            }}
          >
            <img
              src={imagesRef.current[pi][ei]}
              alt=""
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.9)",
              }}
              draggable={false}
            />
          </div>
        ))
      )}
    </div>
  );
}