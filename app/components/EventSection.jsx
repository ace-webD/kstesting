import React from 'react';

export const EventSection = () => {
  return (
    <div 
      className="w-full min-h-screen flex flex-1 flex-col items-center justify-center py-8 px-4"
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
          <line 
            x1="0" y1="6" x2="800" y2="6" 
            stroke="#2C3E50" 
            strokeWidth="3" 
            strokeDasharray="16 12"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Blue Card Section */}
        <div 
          className="relative rounded-2xl overflow-hidden" 
          style={{ 
            backgroundColor: '#557792', 
            boxShadow:
              "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px rgba(0,0,0,1)"
          }}
        >
          <div className="flex flex-col md:flex-row">
            
            {/* Left Side - Text */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h2 
                className="text-white text-[clamp(1.8rem,3vw,2.8rem)] leading-tight mb-2"
                style={{ 
                  textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"
                }}
              >
                Experience the cultural whirlwind.
              </h2>
              <p 
                className="text-white text-[clamp(1.4rem,2.5vw,2.2rem)] leading-snug"
                style={{ 
                  textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"
                }}
              >
                Join the celebration where talent, passion, and creativity collide.
              </p>
            </div>

            {/* Right Side - Polaroid Photos */}
            <div className="relative w-full md:w-[30%] flex items-center justify-center p-4">
              <div className="relative w-[clamp(140px,30vw,220px)] aspect-[4/3]">

                {/* Back */}
                <div 
                  className="absolute w-[clamp(70px,14vw,110px)] aspect-[3/4] bg-white p-1.5 shadow-lg border-5 border-black"
                  style={{ 
                    transform: 'rotate(-15deg) translateX(-25px) translateY(-5px)',
                    zIndex: 1
                  }}
                >
                  <img 
                    src={"vortex9.jpg"} 
                    alt="Event" 
                    className="w-full h-[70%] object-cover border-2 border-black"
                  />
                  <div className="h-[30%]"></div>
                </div>

                {/* Middle */}
                <div 
                  className="absolute w-[clamp(70px,14vw,110px)] aspect-[3/4] bg-white p-1.5 border-5 border-black shadow-lg"
                  style={{ 
                    transform: 'rotate(-5deg) translateX(5px) translateY(-10px)',
                    zIndex: 2
                  }}
                >
                  <img 
                    src={"vortex10.jpg"} 
                    alt="Event" 
                    className="w-full h-[70%] object-cover border-2 border-black"
                  />
                  <div className="h-[30%]"></div>
                </div>

                {/* Front */}
                <div 
                  className="absolute w-[clamp(70px,14vw,110px)] aspect-[3/4] bg-white p-1.5 border-5 border-black shadow-lg"
                  style={{ 
                    transform: 'rotate(8deg) translateX(35px) translateY(0px)',
                    zIndex: 3
                  }}
                >
                  <img 
                    src={"/images/img_rectangle_39306.png"} 
                    alt="Event" 
                    className="w-full h-[70%] object-cover border-black border-2"
                  />
                  <div className="h-[30%]"></div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="w-full py-3 px-6 flex flex-wrap justify-center md:justify-between items-center gap-4"
            style={{ backgroundColor: '#2C3E50' }}
          >
            <span className="text-white text-[clamp(1.4rem,2.5vw,2rem)] tracking-wide" style={{textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"}}>CREATIVITY UNLEASHED</span>
            <span className="text-white text-[clamp(1.4rem,2.5vw,2rem)] tracking-wide" style={{textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"}}>3 DAYS OF ENERGY</span>
            <span className="text-white text-[clamp(1.4rem,2.5vw,2rem)] tracking-wide" style={{textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"}}>EVENTS THAT INSPIRE</span>
          </div>
        </div>

        {/* Stats Card */}
        <div 
          className="rounded-2xl border-4 p-6 md:p-8"
          style={{ 
            backgroundColor: '#E8E0D5',
            borderColor: '#2C3E50'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Image */}
            <div className="flex-shrink-0">
              <div 
                className="w-[clamp(120px,20vw,180px)] aspect-[4/3] rounded-lg overflow-hidden border-2"
                style={{ borderColor: '#2C3E50' }}
              >
                <img 
                  src={"/images/img_snapinsta_app_4.png"} 
                  alt="Dancers" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 flex flex-col items-center md:items-start">
              
              <div className="flex items-center justify-center md:justify-start gap-4 mb-2 flex-wrap">
                <span className="text-[clamp(2rem,5vw,3.5rem)]" style={{ color: '#2C3E50' }}>
                  3 DAYS
                </span>
                <img 
                  src={"spiral.png"} 
                  alt="Spiral" 
                  className="w-[clamp(40px,6vw,64px)] h-[clamp(40px,6vw,64px)]"
                />
                <span className="text-[clamp(2rem,5vw,3.5rem)]" style={{ color: '#2C3E50' }}>
                  60+ EVENTS
                </span>
              </div>

              <div className="flex items-center justify-center md:justify-start">
                <span className="text-[clamp(2rem,5vw,3.5rem)]" style={{ color: '#2C3E50' }}>
                  5L+ PRIZE POOL
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Border */}
      <div className="w-full mt-15">
        <svg width="100%" height="12" viewBox="0 0 800 12" preserveAspectRatio="none">
          <line 
            x1="0" y1="6" x2="800" y2="6" 
            stroke="#2C3E50" 
            strokeWidth="3" 
            strokeDasharray="16 12"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default EventSection;