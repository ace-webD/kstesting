"use client";
import React, { useRef } from "react";
import Image from "next/image";
import HeroVideo from "./HeroVideo";

export const EventSection = () => {
  const cardVideoRef = useRef(null);

  return (
    <div
      id="events-section"
      className="w-full flex flex-col items-center py-8 px-4 pt-1"
      style={{ backgroundColor: "#E8E0D5", fontFamily: "'Jomhuria', cursive" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jomhuria&display=swap');`}</style>

      {/* Top Dashed Border */}
      <div className="w-full mb-15">
        <svg
          width="100%"
          height="12"
          viewBox="0 0 800 12"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="6"
            x2="800"
            y2="6"
            stroke="#2C3E50"
            strokeWidth="3"
            strokeDasharray="16 12"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="w-full mx-auto flex flex-col gap-6">
        {/* ── Blue Card — untouched ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "#557792",
            boxShadow:
              "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px rgba(0,0,0,1)",
            border: "4px solid black",
          }}
        >
          <div className="flex flex-row md:flex-row overflow-visible">
            <div className="flex-1 py- md:py-8 pl-3 lg:pl-10 flex flex-col justify-center">
              <h2
                className="text-white text-[clamp(1rem,4vw,3rem)] text-left md:text-left md:pl-2 md:leading-12 md:text-[3.7rem] mb-2 text-center whitespace-nowrap break-words lg:text-[4.5rem]"
                style={{
                  textShadow:
                    "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                  zIndex: 550,
                }}
              >
                Experience the cultural whirlwind.
              </h2>
              <p
                className="text-white text-[clamp(1rem,4vw,3rem)] text-left md:text-left md:pl-2 md:text-[3.7rem] md:leading-12 lg:text-[4.5rem]"
                style={{
                  textShadow:
                    "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                  zIndex: 550,
                }}
              >
                Join the celebration where talent, passion, and creativity
                collide.
              </p>
            </div>
            <div className="relative w-full md:w-[30%] flex items-center justify-center overflow-visible">
              <div className="relative w-[clamp(90px,40vw,270px)] aspect-[5.6/5] bottom-[-10px] md:bottom-[-14px] lg:bottom-[-7px]">
                <Image
                  src="/image_something.png"
                  fill
                  alt="event photos"
                  className="object-cover scale-100"
                />
              </div>
            </div>
          </div>
          <div
            className="w-full py-3 px-6 flex flex-row justify-center md:justify-between items-center gap-4"
            style={{ backgroundColor: "#2C3E50", borderTop: "4px solid black" }}
          >
            <span
              className="text-white text-[clamp(0.9rem,2.5vw,2rem)] tracking-wide whitespace-nowrap md:px-5 md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] md:ml-3 lg:ml-8 lg:ml-17"
              style={{
                textShadow:
                  "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                zIndex: 550,
              }}
            >
              CREATIVITY UNLEASHED
            </span>
            <span
              className="text-white text-[clamp(0.9rem,2.5vw,2rem)] tracking-wide whitespace-nowrap md:px-5 md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] "
              style={{
                textShadow:
                  "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                zIndex: 550,
              }}
            >
              3 DAYS OF ENERGY
            </span>
            <span
              className="text-white text-[clamp(0.9rem,2.5vw,2rem)] tracking-wide whitespace-nowrap md:px-5 md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] md:mr-5 lg:mr-8 lg:mr-20"
              style={{
                textShadow:
                  "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
                zIndex: 550,
              }}
            >
              EVENTS THAT INSPIRE
            </span>
          </div>
        </div>

        {/* Dashed Divider */}
        <div className="w-full my-8">
          <svg
            width="100%"
            height="12"
            viewBox="0 0 800 12"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="6"
              x2="800"
              y2="6"
              stroke="#2C3E50"
              strokeWidth="3"
              strokeDasharray="16 12"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ── Stats Card wrapped in HeroVideo ── */}
        <HeroVideo cardVideoRef={cardVideoRef}>
          <div
            className="rounded-md border-4 md:p-4 h-32 md:h-45 lg:h-70 xl:h-83"
            style={{
              backgroundColor: "#E8E0D5",
              boxShadow:
                "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px #000000",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-1 text-center md:mt-[-30px] ">
              <div className="flex flex-col items-center justify-center gap-2 flex-wrap">
                <div className="flex flex-row gap-3 md:gap-5 items-center flex-wrap justify-center mb-[-40px] md:mb-3">
                  <span
                    className="text-[clamp(2.5rem,12vw,10rem)] whitespace-nowrap text-center"
                    style={{ color: "#213447", zIndex: 550 }}
                  >
                    3 DAYS
                  </span>
                  <img
                    src="/spiral.png"
                    alt="Spiral"
                    className="w-[clamp(40px,6vw,64px)] h-[clamp(40px,6vw,64px)]"
                  />
                  <span
                    className="text-[clamp(2.5rem,12vw,10rem)] whitespace-nowrap text-center "
                    style={{ color: "#213447", zIndex: 550 }}
                  >
                    60+ EVENTS
                  </span>
                </div>
                <div className="flex items-center justify-center gap-6 w-full mb-[-10px] md:my-[-50px] py-5 md:pb-12">
                  {/* ── ref placed on the video wrapper ── */}
                  <div
                    ref={cardVideoRef}
                    className="md:mt-[-40px] relative w-[clamp(100px,40vw,270px)] aspect-[8/3.5] overflow-hidden rounded-xl border-4 hidden lg:block"
                  >
                    <video
                      src="/asithappen.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className="text-[clamp(2.5rem,12vw,8rem)] whitespace-nowrap md:mt-[-50px] lg:mt-[-80px]"
                    style={{ color: "#213447", zIndex: 550 }}
                  >
                    8 Proshows
                  </span>
                </div>
              </div>
            </div>
          </div>
        </HeroVideo>
      </div>

      {/* Bottom Border */}
      <div className="w-full mt-15">
        <svg
          width="100%"
          height="12"
          viewBox="0 0 800 12"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="6"
            x2="800"
            y2="6"
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
