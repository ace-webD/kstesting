"use client";
import { useEffect, useRef, useState } from "react";

// ─── Layout ───────────────────────────────────────────────────────────────────
const ORBIT_R = 40;
const NUM_VISIBLE = 5;
const NUM_ELS = 10;
const BASE_CARD_W = 130;
const BASE_CARD_H = 165;
const CARD_OPACITY = 1;
const BASE_SPREAD_PX = 40;
const BASE_VERT_GAP = 0;

// ─── Bezier shape ─────────────────────────────────────────────────────────────
const CP1_STRENGTH = 0.55;
const CP2_STRENGTH = 0.22;
const PHASE1_T = 0.42;

// ─── Timing ───────────────────────────────────────────────────────────────────
const CARD_DUR = 5.0;
const WAVE_GAP = 1.6;

// ─── Wave count (single wave, repeated forever) ──────────────────────────────
const WAVE_COUNT = 1;
const photoNames = [
  "vortex1.JPG", "vortex2.JPG", "vortex3.jpg", "vortex4.jpg",
  "vortex5.jpg", "vortex6.jpg", "vortex7.jpg", "vortex8.JPG",
  "vortex9.JPG", "vortex10.jpg", "vortex11.jpg", "vortex12.jpg",
  "vortex13.jpg", "vortex14.jpg", "vortex15.JPG", "vortex16.JPG",
  "vortex17.JPG", "vortex18.JPG", "vortex19.jpg", "vortex20.jpg",
  "vortex21.jpg", "vortex22.jpg"
];

function getRandomElements(arr, count) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

const PILE_CONFIG = [
  { name: "topL", px: 20, py: 15, tx: -1, ty: -1, rot: -45 },
  { name: "midL", px: 10, py: 50, tx: -1, ty: 0.2, rot: 15 },
  { name: "botL", px: 25, py: 80, tx: -1, ty: 1, rot: -20 },
  { name: "topR", px: 80, py: 15, tx: 1, ty: -1, rot: 45 },
  { name: "midR", px: 90, py: 50, tx: 1, ty: 0.2, rot: -15 },
  { name: "botR", px: 80, py: 80, tx: 1, ty: 1, rot: 20 },
];

const PILE_DEFS = PILE_CONFIG.map((cfg, i) => {
  const mag = Math.hypot(cfg.tx, cfg.ty);
  return {
    ...cfg,
    i,
    tx: cfg.tx / mag,
    ty: cfg.ty / mag,
    photos: getRandomElements(photoNames, NUM_ELS)
  };
});

function cubicBez(p0, cp1, cp2, p3, t) {
  const m = 1 - t;
  return m * m * m * p0 + 3 * m * m * t * cp1 + 3 * m * t * t * cp2 + t * t * t * p3;
}

function getStateAtTime(realTime, bz) {
  const t = Math.min(1, Math.max(0, realTime / CARD_DUR));
  const bezT = t * t;
  const x = cubicBez(0, bz.cp1x, bz.cp2x, bz.p3x, bezT);
  const y = cubicBez(0, bz.cp1y, bz.cp2y, bz.p3y, bezT);
  const sc = Math.max(0, 1 - bezT);
  const op = bezT > 0.8 ? Math.max(0, ((1 - bezT) / 0.2) * CARD_OPACITY) : CARD_OPACITY;
  return { x, y, scale: sc, opacity: op };
}

// Optimized: fewer keyframes (20 instead of 30) – still perfectly smooth
function buildCardKeyframes(bz, pileRot) {
  const SAMPLES = 20;
  const segDur = CARD_DUR / SAMPLES;
  const frames = [{ x: 0, y: 0, scale: 1, opacity: CARD_OPACITY, rotation: pileRot, duration: 0 }];
  for (let i = 0; i < SAMPLES; i++) {
    const realTime = ((i + 1) / SAMPLES) * CARD_DUR;
    const p = realTime / CARD_DUR;
    const currentRot = pileRot + (pileRot > 0 ? 45 : -45) * p * p;
    frames.push({
      ...getStateAtTime(realTime, bz),
      rotation: currentRot,
      duration: segDur,
      ease: "none"
    });
  }
  return frames;
}

export default function VortexGallery() {
  const containerRef = useRef(null);
  const cardRefs = useRef(PILE_DEFS.map(() => new Array(NUM_ELS).fill(null)));
  const pileState = useRef(PILE_DEFS.map(() => ({ slots: [0, 1, 2, 3, 4], spareQueue: [5, 6, 7, 8, 9] })));
  const cleanupRef = useRef([]);
  const scaleRef = useRef(1);
  const [cardW, setCardW] = useState(BASE_CARD_W);
  const [cardH, setCardH] = useState(BASE_CARD_H);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function slotOffset(slotPos, pile) {
    const s = scaleRef.current;
    return {
      x: slotPos * BASE_SPREAD_PX * s * pile.tx,
      y: slotPos * BASE_SPREAD_PX * s * pile.ty,
    };
  }

  // Debounced resize handler
  useEffect(() => {
    let resizeTimer;
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;
        const width = container.offsetWidth;
        const scale = Math.min(Math.max(width / 1200, 0.6), 1.4);
        scaleRef.current = scale;
        setCardW(BASE_CARD_W * scale);
        setCardH(BASE_CARD_H * scale);
      }, 100);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Load GSAP and boot
  useEffect(() => {
    function load() {
      if (window.gsap) {
        requestAnimationFrame(() => boot(window.gsap));
        return;
      }
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      s1.onload = () => {
        requestAnimationFrame(() => boot(window.gsap));
      };
      document.head.appendChild(s1);
    }
    load();
    return () => {
      cleanupRef.current.forEach(c => c && c.kill());
    };
  }, []);

  function boot(gsap) {
    const container = containerRef.current;
    if (!container) return;

    // Initial placement (forces GPU layers)
    PILE_DEFS.forEach((pile, pi) => {
      const state = pileState.current[pi];
      state.slots.forEach((ei, slotPos) => {
        const el = cardRefs.current[pi][ei];
        if (!el) return;
        const { x, y } = slotOffset(slotPos, pile);
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x, y,
          rotation: pile.rot,
          scale: 1,
          opacity: CARD_OPACITY,
          zIndex: NUM_VISIBLE - slotPos,
          force3D: true,
        });
      });
      state.spareQueue.forEach((spareEI) => {
        const spareEl = cardRefs.current[pi][spareEI];
        if (!spareEl) return;
        const { x, y } = slotOffset(NUM_VISIBLE, pile);
        gsap.set(spareEl, {
          xPercent: -50,
          yPercent: -50,
          x,
          y: y + 28 * scaleRef.current,
          rotation: pile.rot,
          scale: 1,
          opacity: 0,
          zIndex: 0,
          force3D: true,
        });
      });
    });

    // Bezier endpoints
    const cRect = container.getBoundingClientRect();
    const pileBez = PILE_DEFS.map(pile => {
      const p3x = cRect.width * (0.5 - pile.px / 100);
      const p3y = cRect.height * (0.5 - pile.py / 100);
      const dist = Math.hypot(p3x, p3y);
      const tLen = Math.hypot(-p3y, p3x) || 1;
      const tangX = -p3y / tLen;
      const tangY = p3x / tLen;
      return {
        cp1x: pile.tx * dist * CP1_STRENGTH,
        cp1y: pile.ty * dist * CP1_STRENGTH,
        cp2x: p3x + tangX * dist * CP2_STRENGTH,
        cp2y: p3y + tangY * dist * CP2_STRENGTH,
        p3x, p3y,
      };
    });

    // Build master timeline – single wave, repeat forever
    const master = gsap.timeline({ paused: false, repeat: -1 });
    const simState = PILE_DEFS.map(() => ({
      slots: [0, 1, 2, 3, 4],
      spareQueue: [5, 6, 7, 8, 9]
    }));

    for (let wave = 0; wave < WAVE_COUNT; wave++) {
      const wo = wave * WAVE_GAP; // only wave 0 → wo = 0

      PILE_DEFS.forEach((pile, pi) => {
        const state = simState[pi];
        const topEI = state.slots[0];
        const spareEI = state.spareQueue[0];
        const topEl = cardRefs.current[pi][topEI];
        const spareEl = cardRefs.current[pi][spareEI];
        const bz = pileBez[pi];
        if (!topEl || !spareEl) return;

        // Flying card
        master.to(topEl, {
          keyframes: buildCardKeyframes(bz, pile.rot),
          zIndex: 200,
          force3D: true,
          immediateRender: false,
        }, wo);

        // Shift visible cards
        for (let sp = 1; sp < NUM_VISIBLE; sp++) {
          const ei = state.slots[sp];
          const el = cardRefs.current[pi][ei];
          if (!el) continue;
          master.set(el, {
            ...slotOffset(sp, pile),
            rotation: pile.rot,
            zIndex: 10 + (NUM_VISIBLE - sp),
            force3D: true,
            immediateRender: false,
          }, wo);
          master.to(el, {
            ...slotOffset(sp - 1, pile),
            rotation: pile.rot,
            duration: WAVE_GAP,
            ease: "none",
            force3D: true,
          }, wo);
        }

        // Spare card enters
        const entryPos = slotOffset(NUM_VISIBLE, pile);
        const bottomPos = slotOffset(NUM_VISIBLE - 1, pile);
        master.set(spareEl, {
          x: entryPos.x,
          y: entryPos.y,
          rotation: pile.rot,
          opacity: 0,
          zIndex: 10,
          force3D: true,
          immediateRender: false,
        }, wo);
        master.to(spareEl, {
          x: bottomPos.x,
          y: bottomPos.y,
          rotation: pile.rot,
          opacity: CARD_OPACITY,
          zIndex: 10,
          duration: WAVE_GAP,
          ease: "none",
          force3D: true,
        }, wo);

        // Update simulated state (for completeness)
        simState[pi] = {
          slots: [...state.slots.slice(1), spareEI],
          spareQueue: [...state.spareQueue.slice(1), topEI]
        };
      });
    }

    master.play();
    cleanupRef.current.push(master);
  }

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {PILE_DEFS.map((pile, pi) =>
        Array.from({ length: NUM_ELS }, (_, ei) => (
          <div
            key={`p${pi}-e${ei}`}
            ref={(el) => { cardRefs.current[pi][ei] = el; }}
            style={{
              position: "absolute",
              left: `${pile.px}%`,
              top: `${pile.py}%`,
              width: `${cardW}px`,
              height: `${cardH}px`,
              border: "none",
              borderRadius: "4px",
              overflow: "hidden",
              backgroundColor: "transparent",
              padding: "0",
              boxShadow: "none",
              willChange: "transform, opacity",
              transform: "translateZ(0)", // Force GPU layer
            }}
          >
            <img
              src={pile.photos[ei]}
              alt=""
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                userSelect: "none",
                pointerEvents: "none",
                borderRadius: "3px",
                border: "1px solid rgba(255,255,255,0.45)",
                filter: "brightness(0.9) contrast(0.95)",
                mixBlendMode: "multiply",
              }}
              draggable={false}
            />
          </div>
        ))
      )}
    </div>
  );
}