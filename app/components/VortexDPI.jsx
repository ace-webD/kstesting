"use client";
import { useEffect, useRef, useState } from "react";

// ─── Layout ───────────────────────────────────────────────────────────────────
const ORBIT_R = 40
const NUM_VISIBLE = 5;
const NUM_ELS = 10; // Need extra DOM elements to handle overlapping flights
const BASE_CARD_W = 130;
const BASE_CARD_H = 165;
const CARD_OPACITY = 1;
const BASE_SPREAD_PX = 40; // Wider, exactly like design stacked spread
const BASE_VERT_GAP  = 0;

// ─── Bezier shape ─────────────────────────────────────────────────────────────
const CP1_STRENGTH = 0.55;
const CP2_STRENGTH = 0.22;
const PHASE1_T = 0.42;

// ─── Timing ───────────────────────────────────────────────────────────────────
const CARD_DUR = 5.0; // Very slow majestic elegant sweeping glide
const WAVE_GAP = 1.6; // highly relaxed spacing

// ─── Wave count ───────────────────────────────────────────────────────────────
const NUM_WAVES = 200; // 70 seconds of non-stop fluid playback
const photoNames = ["vortex1.jpg",
      "vortex2.jpg",
      "vortex3.jpg",
      "vortex4.jpg",
      "vortex5.jpg",
      "vortex6.jpg",
      "vortex7.jpg",
      "vortex8.jpg",
      "vortex9.jpg",
      "vortex10.jpg",
      "vortex11.jpg",
      "vortex12.jpg",
      "vortex13.jpg",
      "vortex14.jpg",
      "vortex15.jpg",
      "vortex16.jpg",
      "vortex17.jpg",
      "vortex18.jpg",
      "vortex19.jpg",
      "vortex20.jpg",
      "vortex21.jpg",
      "vortex22.jpg"
    ]
function getRandomElements(arr, count) {
  // Shuffle a copy of the input array (Fisher‑Yates)
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Return the specified count
  return shuffled.slice(0, count);
}
// ─── Pile definitions ─────────────────────────────────────────────────────────
// Exact coords, directions, and stack-rotations matched to the Figma design
const PILE_CONFIG = [
  { name: "topL", px: 20, py: 15, tx: -1, ty: -1,   rot: -45 }, 
  { name: "midL", px: 10, py: 50, tx: -1, ty:  0.2, rot:  15 }, 
  { name: "botL", px: 25, py: 80, tx: -1, ty:  1,   rot: -20 }, 
  { name: "topR", px: 80, py: 15, tx:  1, ty: -1,   rot:  45 }, 
  { name: "midR", px: 90, py: 50, tx:  1, ty:  0.2, rot: -15 }, 
  { name: "botR", px: 80, py: 80, tx:  1, ty:  1,   rot:  20 }, 
];

const PILE_DEFS = PILE_CONFIG.map((cfg, i) => {
  // normalize tx, ty so visual spread is perfectly uniform
  const mag = Math.hypot(cfg.tx, cfg.ty);
  return {
    ...cfg, i,
    tx: cfg.tx / mag,
    ty: cfg.ty / mag,
    photos: getRandomElements(photoNames, NUM_ELS)
  };
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cubicBez(p0, cp1, cp2, p3, t) {
  const m = 1 - t;
  return m * m * m * p0 + 3 * m * m * t * cp1 + 3 * m * t * t * cp2 + t * t * t * p3;
}

// Sample the full animation path at a given real-time second.
// Uses a smooth ease-in to fluidly connect the conveyor belt velocity to the flight curve
function getStateAtTime(realTime, bz) {
  const t = Math.min(1, Math.max(0, realTime / CARD_DUR));
  
  // Power1.in style curve (starts smooth and accelerates into the vortex center)
  const bezT = t * t; 

  const x  = cubicBez(0, bz.cp1x, bz.cp2x, bz.p3x, bezT);
  const y  = cubicBez(0, bz.cp1y, bz.cp2y, bz.p3y, bezT);
  const sc = Math.max(0, 1 - bezT);
  
  // Fade out purely in the last 20% of the trajectory
  const op = bezT > 0.8
    ? Math.max(0, ((1 - bezT) / 0.2) * CARD_OPACITY)
    : CARD_OPACITY;
    
  return { x, y, scale: sc, opacity: op };
}

// Build a dense keyframes array for a card's bezier journey.
function buildCardKeyframes(bz, pileRot) {
  const SAMPLES = 60; // Increased for extra smoothness
  const segDur  = CARD_DUR / SAMPLES;
  
  // Explicit start keyframe (duration 0) so GSAP knows the from-state precisely
  const frames = [{ x: 0, y: 0, scale: 1, opacity: CARD_OPACITY, rotation: pileRot, duration: 0 }];
  for (let i = 0; i < SAMPLES; i++) {
    const realTime = ((i + 1) / SAMPLES) * CARD_DUR;
    const p = realTime / CARD_DUR;
    // Spin gracefully deeper into center as they fly
    const currentRot = pileRot + (pileRot > 0 ? 45 : -45) * p * p;
    frames.push({ 
      ...getStateAtTime(realTime, bz), 
      rotation: currentRot, 
      duration: segDur, ease: "none" 
    });
  }
  return frames;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function VortexGallery() {
  const containerRef = useRef(null);
  const cardRefs     = useRef(PILE_DEFS.map(() => new Array(NUM_ELS).fill(null)));
  const pileState    = useRef(PILE_DEFS.map(() => ({ slots: [0, 1, 2, 3, 4], spareQueue: [5, 6, 7, 8, 9] })));
  const cleanupRef   = useRef([]);
  const scaleRef     = useRef(1);
  const [cardW, setCardW] = useState(BASE_CARD_W);
  const [cardH, setCardH] = useState(BASE_CARD_H);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ─── Responsive scale ──────────────────────────────────────────────────────
  // ─── Slot offset helper ────────────────────────────────────────────────────
  function slotOffset(slotPos, pile) {
    const s = scaleRef.current;
    return {
      x: slotPos * BASE_SPREAD_PX * s * pile.tx,
      y: slotPos * BASE_SPREAD_PX * s * pile.ty,
    };
  }
  useEffect(() => {
    function handleResize() {
      const container = containerRef.current;
      if (!container) return;

      const width = container.offsetWidth;

      const scale = Math.min(Math.max(width / 1200, 0.6), 1.4);

      scaleRef.current = scale;

      setCardW(BASE_CARD_W * scale);
      setCardH(BASE_CARD_H * scale);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])
  // ─── Load GSAP, then boot ──────────────────────────────────────────────────
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
    return () => { cleanupRef.current.forEach(c => c && c.kill()); };
  }, []);

  // ─── boot ─────────────────────────────────────────────────────────────────
  function boot(gsap) {
    const container = containerRef.current;
    if (!container) return;

    // ── Initial placement ─────────────────────────────────────────────────
    PILE_DEFS.forEach((pile, pi) => {
      const state = pileState.current[pi];
      state.slots.forEach((ei, slotPos) => {
        const el = cardRefs.current[pi][ei];
        if (!el) return;
        const { x, y } = slotOffset(slotPos, pile);
        gsap.set(el, {
          xPercent: -50, yPercent: -50, x, y,
          rotation: pile.rot, scale: 1, opacity: CARD_OPACITY,
          zIndex: NUM_VISIBLE - slotPos, force3D: true,
        });
      });
      // Initialize unused spare cards opaquely at the bottom of the visible pile so they don't break z-indexing
      state.spareQueue.forEach((spareEI) => {
        const spareEl = cardRefs.current[pi][spareEI];
        if (!spareEl) return;
        const { x, y } = slotOffset(NUM_VISIBLE, pile);
        gsap.set(spareEl, {
          xPercent: -50, yPercent: -50,
          x, y: y + 28 * scaleRef.current,
          rotation: pile.rot, scale: 1, opacity: 0, zIndex: 0, force3D: true,
        });
      });
    });

    // ── Pre-compute bezier endpoints per pile ─────────────────────────────
    // Cards at slotPos 0 always start at GSAP x=0, y=0.
    // Target is the container's centre, expressed as pixel delta from each pile anchor.
    const cRect = container.getBoundingClientRect();
    const pileBez = PILE_DEFS.map(pile => {
      const p3x  = cRect.width  * (0.5 - pile.px / 100);
      const p3y  = cRect.height * (0.5 - pile.py / 100);
      const dist = Math.hypot(p3x, p3y);
      
      // Calculate perpendicular tangent for the swirl effect (vortex)
      const tLen = Math.hypot(-p3y, p3x) || 1;
      const tangX = -p3y / tLen; // 90 degree rotation
      const tangY = p3x / tLen;
      
      return {
        cp1x: pile.tx * dist * CP1_STRENGTH,
        cp1y: pile.ty * dist * CP1_STRENGTH,
        cp2x: p3x + tangX * dist * CP2_STRENGTH,
        cp2y: p3y + tangY * dist * CP2_STRENGTH,
        p3x, p3y,
      };
    });

    // ── Build master timeline ────────────────────────────────────────────────
    // We just build a massive overlapping timeline for seamless play.
    const WAVE_DUR = WAVE_GAP; 
    const master   = gsap.timeline({ paused: false });

    // Simulate pile state. Since NUM_ELS=10 and NUM_VISIBLE=5, 
    // slots are 0 to 4, spare queue is 5 to 9.
    const simState = PILE_DEFS.map(() => ({ 
      slots: [0, 1, 2, 3, 4], 
      spareQueue: [5, 6, 7, 8, 9] 
    }));

    for (let wave = 0; wave < NUM_WAVES; wave++) {
      const wo = wave * WAVE_DUR;

      PILE_DEFS.forEach((pile, pi) => {
        const state   = simState[pi];
        const topEI   = state.slots[0];
        const spareEI = state.spareQueue[0]; // Pop from queue
        
        const topEl   = cardRefs.current[pi][topEI];
        const spareEl = cardRefs.current[pi][spareEI];
        const bz      = pileBez[pi];
        if (!topEl || !spareEl) return;

        // ── Flying card: keyframe tween ────
        master.to(topEl, {
          keyframes:      buildCardKeyframes(bz, pile.rot),
          zIndex:         200,
          force3D:        true,
          immediateRender: false,
        }, wo);

        // ── Shift remaining cards up one slot continuously ─────────────────────
        // They glide endlessly without pause (duration === WAVE_GAP)
        for (let sp = 1; sp < NUM_VISIBLE; sp++) {
          const ei    = state.slots[sp];
          const el    = cardRefs.current[pi][ei];
          if (!el) continue;
          
          master.set(el, {
            ...slotOffset(sp, pile), rotation: pile.rot, zIndex: 10 + (NUM_VISIBLE - sp), force3D: true, immediateRender: false
          }, wo);
          
          master.to(el, {
            ...slotOffset(sp - 1, pile), rotation: pile.rot, 
            duration: WAVE_GAP, ease: "none", force3D: true
          }, wo);
        }

        // ── Spare Queue card glides into the bottom slot continuously ──────────
        const entryPos  = slotOffset(NUM_VISIBLE, pile);
        const bottomPos = slotOffset(NUM_VISIBLE - 1, pile);
        
        master.set(spareEl, {
          x: entryPos.x, y: entryPos.y, 
          rotation: pile.rot, opacity: 0, zIndex: 10, force3D: true, immediateRender: false
        }, wo);
        
        master.to(spareEl, {
          x: bottomPos.x, y: bottomPos.y, rotation: pile.rot, opacity: CARD_OPACITY, zIndex: 10,
          duration: WAVE_GAP, ease: "none", force3D: true
        }, wo);

        // Advance simulated pile state. Push exhausted topEI cleanly into back of spare queue
        simState[pi] = { 
          slots: [...state.slots.slice(1), spareEI], 
          spareQueue: [...state.spareQueue.slice(1), topEI] 
        };
      });
    }

    // Play timeline automatically instead of using ScrollTrigger
    master.play();
    cleanupRef.current.push(master);
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        overflow: "hidden", pointerEvents: "none",
      }}
    >
      {PILE_DEFS.map((pile, pi) =>
        Array.from({ length: NUM_ELS }, (_, ei) => (
          <div
            key={`p${pi}-e${ei}`}
            ref={(el) => { cardRefs.current[pi][ei] = el; }}
            style={{
              position: "absolute",
              left: `${pile.px}%`, top: `${pile.py}%`,
              width:  `${cardW}px`,
              height: `${cardH}px`,
              border: "none",
              borderRadius: "4px", overflow: "hidden",
              backgroundColor: "transparent",
              padding: "0",
              boxShadow: "none",
              // GPU layer hint — reduces composite cost during scroll
              willChange: "transform, opacity",
            }}
          >
            <img
              src={pile.photos[ei]}
              alt=""
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                userSelect: "none", pointerEvents: "none",
                borderRadius: "3px",
                border: "1px solid rgba(255,255,255,0.45)",
                filter: "brightness(0.9) contrast(0.95)",
                mixBlendMode: "multiply", // creates the seamless integrated look
              }}
              draggable={false}
            />
          </div>
        ))
      )}
    </div>
  );
}