import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Advanced VortexPiles Component
 * 
 * Features:
 * - 6 photo piles arranged in a circle around the center
 * - Cards peel off tangentially and spiral into the vortex center
 * - Scroll-triggered animation with GSAP ScrollTrigger
 * - Infinite card replenishment for continuous effect
 * - Configurable wave count, scroll distance, and timing
 * 
 * Place this component behind your logo in the hero section
 */

// Default event images - replace with your actual event photos
const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=250&fit=crop',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=250&fit=crop',
];

// Pile configurations - positioned around the center vortex
// Each pile has different card sizes for depth perspective
const PILES_CONFIG = [
  { 
    id: 'top', 
    position: { left: '50%', top: '5%' }, 
    cardsPerPile: 5, 
    cardSize: { width: 50, height: 65 }, 
    scale: 0.7,
    rotation: 0,
  },
  { 
    id: 'topRight', 
    position: { left: '78%', top: '15%' }, 
    cardsPerPile: 6, 
    cardSize: { width: 70, height: 90 }, 
    scale: 0.85,
    rotation: 15,
  },
  { 
    id: 'right', 
    position: { left: '90%', top: '42%' }, 
    cardsPerPile: 6, 
    cardSize: { width: 85, height: 110 }, 
    scale: 1.0,
    rotation: 30,
  },
  { 
    id: 'bottomRight', 
    position: { left: '72%', top: '75%' }, 
    cardsPerPile: 5, 
    cardSize: { width: 65, height: 85 }, 
    scale: 0.8,
    rotation: 45,
  },
  { 
    id: 'bottom', 
    position: { left: '32%', top: '82%' }, 
    cardsPerPile: 5, 
    cardSize: { width: 55, height: 72 }, 
    scale: 0.75,
    rotation: 60,
  },
  { 
    id: 'left', 
    position: { left: '8%', top: '40%' }, 
    cardsPerPile: 6, 
    cardSize: { width: 90, height: 115 }, 
    scale: 1.0,
    rotation: -30,
  },
];

// Tangential drift directions (clockwise tangent from each pile position)
// These determine the initial peel direction
const TANGENT_DIRECTIONS = {
  top: { x: -65, y: 5 },           // Move left
  topRight: { x: -45, y: -45 },    // Move upper-left
  right: { x: -5, y: -65 },        // Move upward
  bottomRight: { x: 45, y: -55 },  // Move upward-right
  bottom: { x: 65, y: -5 },        // Move right
  left: { x: 15, y: 65 },          // Move downward
};

// Card stacking offsets (pointing tangentially away from center)
const STACK_OFFSETS = {
  top: { x: -4, y: 5 },
  topRight: { x: -5, y: -4 },
  right: { x: -4, y: -5 },
  bottomRight: { x: 4, y: -5 },
  bottom: { x: 5, y: 4 },
  left: { x: 5, y: 5 },
};

const VortexPilesAdvanced = ({ 
  images = DEFAULT_IMAGES, 
  className = '',
  waveCount = 8,
  scrollDistance = 2500,
  triggerRef = null,
  enableReplenishment = true,
  cardOpacity = 0.85,
  showVortexGlow = true,
  onWaveComplete = null,
}) => {
  const containerRef = useRef(null);
  const pilesRef = useRef({});
  const cardsRef = useRef({});
  const triggersRef = useRef([]);
  const waveIndexRef = useRef(0);

  // Generate unique cards for each pile
  const pileData = useMemo(() => {
    return PILES_CONFIG.map(pile => ({
      ...pile,
      cards: Array.from({ length: pile.cardsPerPile + 5 }, (_, i) => ({
        id: `${pile.id}-card-${i}-${Date.now()}`,
        imageIndex: ((pile.id.length * 3) + i) % images.length,
        stackIndex: i,
        isReplenishment: i >= pile.cardsPerPile,
      })),
    }));
  }, [images]);

  // Calculate bezier path for vortex pull
  const calculateVortexPath = useCallback((startX, startY, centerX, centerY, tangentX, tangentY) => {
    // Control point continues the tangent direction before curving to center
    const cp1x = startX + tangentX * 0.8;
    const cp1y = startY + tangentY * 0.8;
    const cp2x = centerX + (startX - centerX) * 0.3;
    const cp2y = centerY + (startY - centerY) * 0.3;
    
    return { cp1x, cp1y, cp2x, cp2y };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;

      // Store initial positions for all cards
      PILES_CONFIG.forEach(pile => {
        const pileEl = pilesRef.current[pile.id];
        if (!pileEl) return;

        const cardElements = pileEl.querySelectorAll('.vortex-card');
        cardElements.forEach((card, i) => {
          cardsRef.current[card.dataset.cardId] = {
            element: card,
            initialX: i * STACK_OFFSETS[pile.id].x,
            initialY: i * STACK_OFFSETS[pile.id].y,
            pileId: pile.id,
            stackIndex: i,
          };
        });
      });

      // Create master timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef?.current || container,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const currentWave = Math.floor(self.progress * waveCount);
            if (currentWave > waveIndexRef.current) {
              waveIndexRef.current = currentWave;
              onWaveComplete?.(currentWave);
            }
          },
          snap: {
            snapTo: (progress) => {
              const step = 1 / waveCount;
              const snapped = Math.round(progress / step) * step;
              return Math.min(Math.max(snapped, 0), 1);
            },
            duration: { min: 0.15, max: 0.35 },
            ease: 'power1.inOut',
          },
        },
      });

      // Create animations for each wave
      for (let wave = 0; wave < waveCount; wave++) {
        const waveStartTime = wave * 2.8;

        PILES_CONFIG.forEach((pile) => {
          const pileEl = pilesRef.current[pile.id];
          if (!pileEl) return;

          const cardElements = Array.from(pileEl.querySelectorAll('.vortex-card'));
          const activeCards = cardElements.filter(c => !c.classList.contains('flew-away'));
          
          if (activeCards.length === 0) return;

          const topCard = activeCards[0];
          const cardId = topCard.dataset.cardId;
          const cardData = cardsRef.current[cardId];
          
          if (!cardData) return;

          const tangent = TANGENT_DIRECTIONS[pile.id];
          const cardRect = topCard.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          const cardAbsX = cardRect.left - containerRect.left + cardRect.width / 2;
          const cardAbsY = cardRect.top - containerRect.top + cardRect.height / 2;

          // Phase 1: Tangential drift (peel away from pile)
          masterTl.to(topCard, {
            x: cardData.initialX + tangent.x,
            y: cardData.initialY + tangent.y,
            scale: 0.75,
            rotation: pile.rotation + (Math.random() * 10 - 5),
            duration: 1.1,
            ease: 'sine.inOut',
          }, waveStartTime);

          // Phase 2: Brief hold
          // (Implicit pause between animations)

          // Phase 3: Vortex pull to center
          const toCenterX = centerX - cardAbsX;
          const toCenterY = centerY - cardAbsY;

          masterTl.to(topCard, {
            x: cardData.initialX + tangent.x + toCenterX * 0.7,
            y: cardData.initialY + tangent.y + toCenterY * 0.7,
            scale: 0.1,
            opacity: 0,
            rotation: pile.rotation + (Math.random() * 30 - 15),
            duration: 1.2,
            ease: 'power2.in',
            onComplete: () => {
              topCard.classList.add('flew-away');
              topCard.style.display = 'none';
            },
          }, waveStartTime + 1.2);

          // Replenishment: Shift remaining cards and bring in new card
          if (enableReplenishment) {
            const remainingCards = activeCards.slice(1);
            
            // Shift cards up in the stack
            masterTl.to(remainingCards, {
              x: (i) => {
                const nextCardId = remainingCards[i]?.dataset.cardId;
                if (!nextCardId) return 0;
                const nextData = cardsRef.current[nextCardId];
                return nextData ? (nextData.stackIndex - 1) * STACK_OFFSETS[pile.id].x : 0;
              },
              y: (i) => {
                const nextCardId = remainingCards[i]?.dataset.cardId;
                if (!nextCardId) return 0;
                const nextData = cardsRef.current[nextCardId];
                return nextData ? (nextData.stackIndex - 1) * STACK_OFFSETS[pile.id].y : 0;
              },
              duration: 0.4,
              ease: 'sine.out',
              stagger: 0.03,
            }, waveStartTime + 2.2);

            // Bring in replenishment card
            const replenishmentCard = cardElements.find(c => 
              c.dataset.isReplenishment === 'true' && 
              c.style.display !== 'none' &&
              !c.classList.contains('flew-away')
            );

            if (replenishmentCard) {
              masterTl.fromTo(replenishmentCard, 
                { 
                  opacity: 0, 
                  y: 60,
                  scale: 0.8,
                },
                { 
                  opacity: cardOpacity, 
                  y: (pile.cardsPerPile - 1) * STACK_OFFSETS[pile.id].y,
                  scale: 1,
                  duration: 0.5,
                  ease: 'sine.out',
                }, 
                waveStartTime + 2.3
              );
            }
          }
        });
      }

      triggersRef.current = ScrollTrigger.getAll();
    }, containerRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, [waveCount, scrollDistance, triggerRef, enableReplenishment, cardOpacity, onWaveComplete]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Warm gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(245, 240, 232, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(232, 224, 213, 0.8) 0%, transparent 50%),
            linear-gradient(135deg, #F5F0E8 0%, #E8E0D5 50%, #DDD5C8 100%)
          `,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Photo piles */}
      <div className="absolute inset-0">
        {pileData.map((pile) => (
          <div
            key={pile.id}
            ref={(el) => { pilesRef.current[pile.id] = el; }}
            className="absolute"
            style={{
              left: pile.position.left,
              top: pile.position.top,
              transform: `translate(-50%, -50%) scale(${pile.scale})`,
              transformOrigin: 'center center',
            }}
          >
            {pile.cards.map((card, cardIndex) => (
              <div
                key={card.id}
                data-card-id={card.id}
                data-is-replenishment={card.isReplenishment}
                className={`vortex-card absolute ${cardIndex === 0 ? 'z-50' : ''}`}
                style={{
                  width: pile.cardSize.width,
                  height: pile.cardSize.height,
                  left: cardIndex * STACK_OFFSETS[pile.id].x,
                  top: cardIndex * STACK_OFFSETS[pile.id].y,
                  zIndex: pile.cards.length - cardIndex,
                  opacity: card.isReplenishment ? 0 : cardOpacity,
                  transformOrigin: 'center center',
                  display: card.isReplenishment ? 'none' : 'block',
                }}
              >
                <div 
                  className="w-full h-full rounded overflow-hidden"
                  style={{
                    boxShadow: `
                      3px 3px 12px rgba(0,0,0,0.25),
                      inset 0 0 0 2px rgba(255,255,255,0.5)
                    `,
                    background: 'white',
                    padding: '2px',
                  }}
                >
                  <img
                    src={images[card.imageIndex]}
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

      {/* Vortex center glow */}
      {showVortexGlow && (
        <div 
          className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'vortexPulse 3s ease-in-out infinite',
          }}
        />
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes vortexPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default VortexPilesAdvanced;
