import React from 'react';
import Image from 'next/image';
import HeroVideo from './HeroVideo';

export const EventSection = () => {
  return (
    <div
      id='events-section'
      className="w-full flex flex-col items-center py-8 px-4"
      style={{
        backgroundColor: '#E8E0D5',
        fontFamily: "'Jomhuria', cursive"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jomhuria&display=swap');
      `}</style>

      {/* Top Dashed Border */}
      <div className="w-full mb-15">
        <svg width="100%" height="12" viewBox="0 0 800 12" preserveAspectRatio="none">
          <line x1="0" y1="6" x2="800" y2="6"
            stroke="#2C3E50" strokeWidth="3"
            strokeDasharray="16 12" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="w-full mx-auto flex flex-col gap-6">

        {/* ── Blue Card ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#557792',
            boxShadow: "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px rgba(0,0,0,1)"
          }}
        >
          <div className="flex flex-col md:flex-row overflow-visible">
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h2
                className="text-white text-[clamp(1.8rem,3vw,2.8rem)] leading-tight mb-2 text-center"
                style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}
              >
                Experience the cultural whirlwind.
              </h2>
              <p
                className="text-white text-[clamp(1.4rem,2.5vw,2.2rem)] leading-snug text-center"
                style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}
              >
                Join the celebration where talent, passion, and creativity collide.
              </p>
            </div>
            <div className="relative w-full md:w-[30%] flex items-center justify-center p-4">
              <div className="relative w-[clamp(140px,40vw,270px)] aspect-[5.6/5] bottom-[-20px]">
                <Image src="/image_something.png" fill alt='event photos' className='object-cover scale-100' />
              </div>
            </div>
          </div>
          <div
            className="w-full py-3 px-6 flex flex-wrap justify-center md:justify-between items-center gap-4"
            style={{ backgroundColor: '#2C3E50' }}
          >
            <span className="text-white text-[clamp(1.4rem,2.5vw,2rem)] tracking-wide" style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}>CREATIVITY UNLEASHED</span>
            <span className="text-white text-[clamp(1.4rem,2.5vw,2rem)] tracking-wide" style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}>3 DAYS OF ENERGY</span>
            <span className="text-white text-[clamp(1.4rem,2.5vw,2rem)] tracking-wide" style={{ textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000" }}>EVENTS THAT INSPIRE</span>
          </div>
        </div>

        {/* ── Stats Card (no video here anymore) ── */}
        <div
          className="rounded-2xl border-4 p-6 md:p-8"
          style={{ backgroundColor: '#E8E0D5', borderColor: '#2C3E50' }}
        >
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <div className="flex flex-col items-center justify-center gap-4 flex-wrap">
              <div className='flex flex-row gap-2 md:gap-5 items-center '>
                  <span className="text-[clamp(2rem,5vw,5rem)]" style={{ color: '#213447' }}>3 DAYS</span>
                  <img src="/spiral.png" alt="Spiral" className="w-[clamp(40px,6vw,64px)] h-[clamp(40px,6vw,64px)]" />
                  <span className="text-[clamp(2rem,5vw,5rem)]" style={{ color: '#213447' }}>60+ EVENTS</span>
              </div>
              <span className="text-[clamp(2rem,5vw,5rem)]" style={{ color: '#213447' }}>5L+ PRIZE POOL</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── Scroll-Zoom Video Section ──
           Lives OUTSIDE the padded container so it can go edge-to-edge.
           The 300vh height is its own scroll runway.                    */}
      <div className="w-screen -mx-4 hidden lg:block" style={{ zIndex: 99}}>
        <HeroVideo />
      </div>

      {/* Bottom Border */}
      <div className="w-full mt-15">
        <svg width="100%" height="12" viewBox="0 0 800 12" preserveAspectRatio="none">
          <line x1="0" y1="6" x2="800" y2="6"
            stroke="#2C3E50" strokeWidth="3"
            strokeDasharray="16 12" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default EventSection;