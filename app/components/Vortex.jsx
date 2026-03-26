"use client";
import { useEffect, useRef, useState } from "react";

// ─── Layout ───────────────────────────────────────────────────────────────────
const ORBIT_R = 40
const NUM_VISIBLE = 5;
const NUM_ELS = 6;
const BASE_CARD_W = 130;
const BASE_CARD_H = 165;
const CARD_OPACITY = 1;
const BASE_SPREAD_PX = 20;
const BASE_VERT_GAP = 11;

// ─── Bezier shape ─────────────────────────────────────────────────────────────
const CP1_STRENGTH = 0.55;
const CP2_STRENGTH = 0.22;
const PHASE1_T = 0.42;

// ─── Timing ───────────────────────────────────────────────────────────────────
const PHASE1_SECS = 1.2;
const PAUSE_SECS  = 0.2;
const PHASE2_SECS = 1.3;
const WAVE_GAP    = 0.15;
const SHIFT_SECS  = 0.5;
const ENTER_SECS  = 0.55;

// Total card travel duration (phase1 + pause + phase2)
const CARD_DUR = PHASE1_SECS + PAUSE_SECS + PHASE2_SECS;

// ─── Wave count ───────────────────────────────────────────────────────────────
const NUM_WAVES = 8;
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
function getRandomElements(arr) {
  // Shuffle a copy of the input array (Fisher‑Yates)
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Return the first 6 elements (or all if fewer than 6)
  return shuffled.slice(0, 6);
}
// ─── Pile definitions ─────────────────────────────────────────────────────────
// Each pile has a `photos` array with exactly NUM_ELS (6) entries.
// photos[0] = bottom card, photos[NUM_ELS-1] = top card (first to fly).
// Replace each URL with any path or absolute URL you like.
const PILE_DEFS = [
  {
    name: "top",
    angleDeg: -90,
    photos: getRandomElements(photoNames),
  },
  {
    name: "topRight",
    angleDeg: -30,
    photos: getRandomElements(photoNames),
  },
  {
    name: "botRight",
    angleDeg: 30,
    photos: getRandomElements(photoNames),
  },
  {
    name: "bottom",
    angleDeg: 90,
    photos: getRandomElements(photoNames),
  },
  {
    name: "botLeft",
    angleDeg: 150,
    photos: getRandomElements(photoNames),
  },
  {
    name: "topLeft",
    angleDeg: 210,
    photos: getRandomElements(photoNames),
  },
].map(({ name, angleDeg, photos }, i) => {
  const rad = (angleDeg * Math.PI) / 180;
  const tx  = Math.sin(rad);
  const ty  = -Math.cos(rad);
  return {
    i, name, rad,
    px: 50 + ORBIT_R * Math.cos(rad),
    py: 50 + ORBIT_R * Math.sin(rad),
    tx, ty, photos,
  };
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cubicBez(p0, cp1, cp2, p3, t) {
  const m = 1 - t;
  return m * m * m * p0 + 3 * m * m * t * cp1 + 3 * m * t * t * cp2 + t * t * t * p3;
}

// Sample the full animation path at a given real-time second.
// Encodes phase1 (sine.inOut), pause (hold), phase2 (power2.in) timing.
// Returns {x, y, scale, opacity} directly — no proxy objects.
function getStateAtTime(realTime, bz) {
  let bezT;
  if (realTime <= PHASE1_SECS) {
    // sine.inOut ease applied to bezier progress
    const p = realTime / PHASE1_SECS;
    bezT = (-(Math.cos(Math.PI * p) - 1) / 2) * PHASE1_T;
  } else if (realTime <= PHASE1_SECS + PAUSE_SECS) {
    bezT = PHASE1_T; // hold at waiting stage
  } else {
    // power2.in ease applied to remaining bezier progress
    const p = (realTime - PHASE1_SECS - PAUSE_SECS) / PHASE2_SECS;
    bezT = PHASE1_T + p * p * (1 - PHASE1_T);
  }
  const x  = cubicBez(0, bz.cp1x, bz.cp2x, bz.p3x, bezT);
  const y  = cubicBez(0, bz.cp1y, bz.cp2y, bz.p3y, bezT);
  const sc = Math.max(0, 1 - bezT);
  const op = bezT > 0.82
    ? Math.max(0, ((1 - bezT) / 0.18) * CARD_OPACITY)
    : CARD_OPACITY;
  return { x, y, scale: sc, opacity: op };
}

// Build a dense keyframes array for a card's bezier journey.
// 30 samples → smooth curve; each is a direct CSS property object GSAP owns.
function buildCardKeyframes(bz) {
  const SAMPLES = 30;
  const segDur  = CARD_DUR / SAMPLES;
  // Explicit start keyframe (duration 0) so GSAP knows the from-state precisely
  const frames = [{ x: 0, y: 0, scale: 1, opacity: CARD_OPACITY, duration: 0 }];
  for (let i = 0; i < SAMPLES; i++) {
    const realTime = ((i + 1) / SAMPLES) * CARD_DUR;
    frames.push({ ...getStateAtTime(realTime, bz), duration: segDur, ease: "none" });
  }
  return frames;
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function VortexGallery() {
  const containerRef = useRef(null);
  const cardRefs     = useRef(PILE_DEFS.map(() => new Array(NUM_ELS).fill(null)));
  const pileState    = useRef(PILE_DEFS.map(() => ({ slots: [0, 1, 2, 3, 4], spare: 5 })));
  const cleanupRef   = useRef([]);
  const scaleRef     = useRef(1);
  const [cardW, setCardW] = useState(BASE_CARD_W);
  const [cardH, setCardH] = useState(BASE_CARD_H);

  // ─── Responsive scale ──────────────────────────────────────────────────────
  // ─── Slot offset helper ────────────────────────────────────────────────────
  function slotOffset(slotPos, pile) {
    const s = scaleRef.current;
    return {
      x: slotPos * BASE_SPREAD_PX * s * pile.tx,
      y: slotPos * BASE_SPREAD_PX * s * pile.ty + slotPos * BASE_VERT_GAP * s,
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
  // ─── Load GSAP + ScrollTrigger, then boot ──────────────────────────────────
  useEffect(() => {
    function load() {
      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        // rAF ensures DOM is painted before we measure getBoundingClientRect
        requestAnimationFrame(() => boot(window.gsap, window.ScrollTrigger));
        return;
      }
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      s1.onload = () => {
        const s2 = document.createElement("script");
        s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
        s2.onload = () => {
          window.gsap.registerPlugin(window.ScrollTrigger);
          requestAnimationFrame(() => boot(window.gsap, window.ScrollTrigger));
        };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    }
    load();
    return () => { cleanupRef.current.forEach(c => c && c.kill()); };
  }, []);

  // ─── boot ─────────────────────────────────────────────────────────────────
  function boot(gsap, ScrollTrigger) {
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
          rotation: 0, scale: 1, opacity: CARD_OPACITY,
          zIndex: NUM_VISIBLE - slotPos, force3D: true,
        });
      });
      const spareEl = cardRefs.current[pi][state.spare];
      if (spareEl) {
        const { x, y } = slotOffset(NUM_VISIBLE, pile);
        gsap.set(spareEl, {
          xPercent: -50, yPercent: -50,
          x, y: y + 28 * scaleRef.current,
          rotation: 0, scale: 1, opacity: 0, zIndex: 0, force3D: true,
        });
      }
    });

    // ── Pre-compute bezier endpoints per pile ─────────────────────────────
    // Cards at slotPos 0 always start at GSAP x=0, y=0.
    // Target is the container's centre, expressed as pixel delta from each pile anchor.
    const cRect = container.getBoundingClientRect();
    const pileBez = PILE_DEFS.map(pile => {
      const p3x  = cRect.width  * (0.5 - pile.px / 100);
      const p3y  = cRect.height * (0.5 - pile.py / 100);
      const dist = Math.hypot(p3x, p3y);
      return {
        cp1x: pile.tx * dist * CP1_STRENGTH,
        cp1y: pile.ty * dist * CP1_STRENGTH,
        cp2x: p3x + pile.tx * dist * CP2_STRENGTH,
        cp2y: p3y + pile.ty * dist * CP2_STRENGTH,
        p3x, p3y,
      };
    });

    // ── Build master timeline (paused — scrubbed by ScrollTrigger) ────────
    const WAVE_DUR = CARD_DUR + WAVE_GAP;
    const master   = gsap.timeline({ paused: true });

    // Simulate pile state so we know which element index is on top each wave
    const simState = PILE_DEFS.map(() => ({ slots: [0, 1, 2, 3, 4], spare: 5 }));

    for (let wave = 0; wave < NUM_WAVES; wave++) {
      const wo = wave * WAVE_DUR;

      PILE_DEFS.forEach((pile, pi) => {
        const state   = simState[pi];
        const topEI   = state.slots[0];
        const spareEI = state.spare;
        const topEl   = cardRefs.current[pi][topEI];
        const spareEl = cardRefs.current[pi][spareEI];
        const bz      = pileBez[pi];
        if (!topEl) return;

        // ── Flying card: keyframe tween directly on element properties ────
        // GSAP owns x/y/scale/opacity — no proxy, no onUpdate, no gsap.set
        // inside callbacks. This makes forward AND reverse scrub artifact-free.
        master.to(topEl, {
          keyframes:      buildCardKeyframes(bz),
          zIndex:         200,
          force3D:        true,
          immediateRender: false,
        }, wo);

        // ── Shift remaining 4 cards up one slot ───────────────────────────
        for (let sp = 1; sp < NUM_VISIBLE; sp++) {
          const ei    = state.slots[sp];
          const el    = cardRefs.current[pi][ei];
          if (!el) continue;
          const newSp = sp - 1;
          master.fromTo(el,
            { ...slotOffset(sp,    pile), zIndex: NUM_VISIBLE - sp,    force3D: true },
            { ...slotOffset(newSp, pile), zIndex: NUM_VISIBLE - newSp,
              duration: SHIFT_SECS, ease: "sine.inOut", force3D: true },
            wo + PHASE1_SECS + PAUSE_SECS,
          );
        }

        // ── Spare slides into bottom slot ─────────────────────────────────
        if (spareEl) {
          const entryPos  = slotOffset(NUM_VISIBLE,     pile);
          const bottomPos = slotOffset(NUM_VISIBLE - 1, pile);
          // Set spare to entry state at the moment it becomes relevant
          master.set(spareEl, {
            x: entryPos.x, y: entryPos.y + 28 * scaleRef.current,
            opacity: 0, scale: 1, zIndex: 1, force3D: true,
            immediateRender: false,
          }, wo + PHASE1_SECS + PAUSE_SECS);
          master.fromTo(spareEl,
            { x: entryPos.x,  y: entryPos.y  + 28 * scaleRef.current, opacity: 0, zIndex: 1, force3D: true },
            { x: bottomPos.x, y: bottomPos.y, opacity: CARD_OPACITY,  zIndex: 1,
              duration: ENTER_SECS, ease: "sine.out", force3D: true },
            wo + PHASE1_SECS + PAUSE_SECS + 0.08,
          );
        }

        // Advance simulated pile state for the next wave
        simState[pi] = { slots: [...state.slots.slice(1), spareEI], spare: topEI };
      });
    }

    // ── Attach ScrollTrigger ──────────────────────────────────────────────
    // container → absolute wrapper div → TOP SECTION div (the hero image section)
    const heroSection = container.parentElement?.parentElement ?? container.parentElement;
    const scrollDist  = Math.round(NUM_WAVES * WAVE_DUR * 100); // 100px per animation-second

    const st = ScrollTrigger.create({
      animation:          master,
      trigger:            heroSection,
      start:              "top top",
      end:                `+=${scrollDist}`,
      scrub:              0.8,      // smooth but responsive; lower = snappier
      pin:                true,
      pinSpacing:         true,
      invalidateOnRefresh: true,    // re-computes on window resize
    });

    cleanupRef.current.push({ kill: () => st.kill() });
  }

  // ─── Render ───────────────────────────────────────────────────────────────
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
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "3px", overflow: "hidden",
              backgroundColor: "#1c1c1c",
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
                filter: "brightness(0.85)",
              }}
              draggable={false}
            />
          </div>
        ))
      )}
    </div>
  );
}