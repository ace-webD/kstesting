'use client'
import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * VORTEX PILES COMPONENT - Single File
 * 
 * A React component that creates an animated vortex effect with photo piles.
 * Cards peel off from 6 piles arranged in a circle and spiral into the center vortex.
 * 
 * INSTALLATION:
 * npm install gsap
 * 
 * USAGE:
 * <VortexPiles 
 *   images={['/img1.jpg', '/img2.jpg', ...]} 
 *   waveCount={8}
 *   scrollDistance={2500}
 * />
 */

// ============================================
// CONFIGURATION
// ============================================

// Default event images (replace with your own)
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=250&fit=crop',
];

// 6 Piles arranged around the center vortex
const PILES_CONFIG = [
  { id: 'top', position: { left: '50%', top: '5%' }, cardsPerPile: 5, cardSize: { w: 50, h: 65 }, scale: 0.7, rotation: 0 },
  { id: 'topRight', position: { left: '78%', top: '15%' }, cardsPerPile: 6, cardSize: { w: 70, h: 90 }, scale: 0.85, rotation: 15 },
  { id: 'right', position: { left: '90%', top: '42%' }, cardsPerPile: 6, cardSize: { w: 85, h: 110 }, scale: 1.0, rotation: 30 },
  { id: 'bottomRight', position: { left: '72%', top: '75%' }, cardsPerPile: 5, cardSize: { w: 65, h: 85 }, scale: 0.8, rotation: 45 },
  { id: 'bottom', position: { left: '32%', top: '82%' }, cardsPerPile: 5, cardSize: { w: 55, h: 72 }, scale: 0.75, rotation: 60 },
  { id: 'left', position: { left: '8%', top: '40%' }, cardsPerPile: 6, cardSize: { w: 90, h: 115 }, scale: 1.0, rotation: -30 },
];

// Tangential drift directions (clockwise from each pile)
const TANGENT = {
  top: { x: -65, y: 5 },
  topRight: { x: -45, y: -45 },
  right: { x: -5, y: -65 },
  bottomRight: { x: 45, y: -55 },
  bottom: { x: 65, y: -5 },
  left: { x: 15, y: 65 },
};

// Card stacking offsets
const OFFSETS = {
  top: { x: -4, y: 5 },
  topRight: { x: -5, y: -4 },
  right: { x: -4, y: -5 },
  bottomRight: { x: 4, y: -5 },
  bottom: { x: 5, y: 4 },
  left: { x: 5, y: 5 },
};

// ============================================
// COMPONENT
// ============================================

const VortexPiles = ({
  images = DEFAULT_IMAGES,
  waveCount = 8,
  scrollDistance = 2500,
  triggerRef = null,
  className = '',
}) => {
  const containerRef = useRef(null);
  const pilesRef = useRef({});
  const triggersRef = useRef([]);

  // Generate cards for each pile
  const piles = useMemo(() => {
    return PILES_CONFIG.map(pile => ({
      ...pile,
      cards: Array.from({ length: pile.cardsPerPile + 3 }, (_, i) => ({
        id: `${pile.id}-c${i}`,
        imgIdx: (pile.id.length + i) % images.length,
        idx: i,
      })),
    }));
  }, [images]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;

      // Master timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef?.current || container,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.8,
          snap: {
            snapTo: (p) => {
              const step = 1 / waveCount;
              return Math.round(p / step) * step;
            },
            duration: { min: 0.15, max: 0.35 },
            ease: 'power1.inOut',
          },
        },
      });

      // Create waves
      for (let wave = 0; wave < waveCount; wave++) {
        const t = wave * 2.8;

        PILES_CONFIG.forEach((pile) => {
          const el = pilesRef.current[pile.id];
          if (!el) return;

          const cards = el.querySelectorAll('.v-card');
          const top = cards[0];
          if (!top) return;

          const tan = TANGENT[pile.id];
          const rect = top.getBoundingClientRect();
          const contRect = container.getBoundingClientRect();
          const cx = rect.left - contRect.left + rect.width / 2;
          const cy = rect.top - contRect.top + rect.height / 2;

          // Phase 1: Tangential drift
          masterTl.to(top, {
            x: `+=${tan.x}`,
            y: `+=${tan.y}`,
            scale: 0.75,
            rotation: pile.rotation + (Math.random() * 10 - 5),
            duration: 1.1,
            ease: 'sine.inOut',
          }, t);

          // Phase 2: Hold (implicit)

          // Phase 3: Vortex pull
          const toX = centerX - cx;
          const toY = centerY - cy;

          masterTl.to(top, {
            x: `+=${tan.x + toX * 0.7}`,
            y: `+=${tan.y + toY * 0.7}`,
            scale: 0.1,
            opacity: 0,
            rotation: pile.rotation + (Math.random() * 30 - 15),
            duration: 1.2,
            ease: 'power2.in',
            onComplete: () => { top.style.display = 'none'; },
          }, t + 1.2);

          // Replenishment: shift cards
          const rest = Array.from(cards).slice(1);
          masterTl.to(rest, {
            x: (i) => i * OFFSETS[pile.id].x,
            y: (i) => i * OFFSETS[pile.id].y,
            duration: 0.4,
            ease: 'sine.out',
            stagger: 0.03,
          }, t + 2.2);
        });
      }

      triggersRef.current = ScrollTrigger.getAll();
    }, containerRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      ctx.revert();
    };
  }, [waveCount, scrollDistance, triggerRef]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(245,240,232,0.9) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(232,224,213,0.8) 0%, transparent 50%),
            linear-gradient(135deg, #F5F0E8 0%, #E8E0D5 50%, #DDD5C8 100%)
          `,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Piles */}
      <div className="absolute inset-0">
        {piles.map((pile) => (
          <div
            key={pile.id}
            ref={(el) => { pilesRef.current[pile.id] = el; }}
            className="absolute"
            style={{
              left: pile.position.left,
              top: pile.position.top,
              transform: `translate(-50%, -50%) scale(${pile.scale})`,
            }}
          >
            {pile.cards.map((card, i) => (
              <div
                key={card.id}
                className="v-card absolute"
                style={{
                  width: pile.cardSize.w,
                  height: pile.cardSize.h,
                  left: i * OFFSETS[pile.id].x,
                  top: i * OFFSETS[pile.id].y,
                  zIndex: pile.cards.length - i,
                  opacity: i >= pile.cardsPerPile ? 0 : 0.85,
                  display: i >= pile.cardsPerPile ? 'none' : 'block',
                }}
              >
                <div
                  className="w-full h-full rounded overflow-hidden"
                  style={{
                    boxShadow: '3px 3px 12px rgba(0,0,0,0.25)',
                    border: '2px solid rgba(255,255,255,0.6)',
                    background: 'white',
                    padding: '2px',
                  }}
                >
                  <img
                    src={images[card.imgIdx]}
                    alt=""
                    className="w-full h-full object-cover rounded-sm"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Vortex glow */}
      <div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          filter: 'blur(30px)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// HERO SECTION EXAMPLE (Uncomment to use)
// ============================================
/*
import { useRef } from 'react';

const HeroWithVortex = () => {
  const heroRef = useRef(null);
  
  const myImages = [
    '/event1.jpg',
    '/event2.jpg',
    '/event3.jpg',
    '/event4.jpg',
    '/event5.jpg',
    '/event6.jpg',
  ];

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
      <VortexPiles 
        images={myImages}
        waveCount={8}
        scrollDistance={2500}
        triggerRef={heroRef}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-8xl font-bold text-white drop-shadow-lg">
          Your Logo
        </h1>
        <p className="text-2xl text-white mt-4">Tagline here</p>
      </div>
    </section>
  );
};

export default HeroWithVortex;
*/

export default VortexPiles;
