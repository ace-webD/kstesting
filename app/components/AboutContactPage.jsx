'use client';
import Image from 'next/image';
import React from 'react';
import { CANVAS_TEXTURE_STYLE } from './Hero';

export default function AboutContactPage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden mt-[-65px]">
      <div style={CANVAS_TEXTURE_STYLE} />
      {/* Global Background — solid #E9E1CF color covers entire page */}
      <div className="absolute inset-0 w-full h-full z-0" style={{ backgroundColor: '#e9e1cf' }} />

      {/* Global Texture Overlay — covers entire page over all elements */}
      {/* <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: "url('/images/img_texturelabs_grunge_340m.jpg')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          opacity: 0.5,
          zIndex: 9999,
          mixBlendMode: 'overlay',
        }}
      /> */}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-start items-center w-full min-h-screen">

        {/* HEADER WITH TEXTURE */}
        <section
          className="w-full px-[20px] sm:px-[28px] md:px-[36px] lg:px-[48px] 
                     py-[28px] sm:py-[34px] md:py-[40px] lg:py-[48px] mt-8 md:mt-5"
          style={{
            backgroundColor: "#000000",
            backgroundImage: "url('/images/img_texturelabs_grunge_340m.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundBlendMode: "overlay",
            opacity: 0.95,
          }}
        >
        </section>

        {/* About Section */}
        <section className="w-full px-[40px] sm:px-[60px] md:px-[80px] lg:px-[100px]
                           py-[36px] sm:py-[42px] md:py-[48px] lg:py-[56px]
                           mb-[50px] sm:mb-[60px] md:mb-[70px] lg:mb-[80px]">
          <div className="w-full mx-auto">

            {/* About Title Header */}
            <div
                    className="w-full flex justify-between items-center px-4 md:px-8 lg:px-12 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] bg-[#213447] h-[80px] sm:h-[105px] md:h-[132px] rounded-full border-[3px] md:border-[5px] border-black"
                >


                    <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                        <Image src="/spiral2.png" alt="Spiral Left" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                    </div>


                    <h1
                        className="text-center font-normal tracking-normal text-[55px] min-[400px]:text-[65px] sm:text-[90px] md:text-[112.9px] leading-[45px] sm:leading-[70px] md:leading-[80.79px] [-webkit-text-stroke:1px_#000] sm:[-webkit-text-stroke:2px_#000] md:[-webkit-text-stroke:3.17px_#000]"
                        style={{
                            fontFamily: "'Jomhuria', serif, sans-serif",
                            fontWeight: 400,
                            letterSpacing: "0%",
                            color: "#E9E1CF",
                            paintOrder: "stroke fill",
                        }}
                    >
                        ABOUT
                    </h1>
 
                    <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                        <Image src="/spiral2.png" alt="Spiral Right" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                    </div>
            </div>

            {/* About Content */}
            <div className="flex flex-col gap-[29px] sm:gap-[44px] md:gap-[52px] lg:gap-[58px]
                           justify-start items-center w-full
                           mt-[60px] md:mt-[80px] lg:mt-[140px]">

              {/* ✅ MOBILE ONLY: Stacked images one by one (below 640px) */}
              {/* MOBILE ONLY: Stacked images */}
<div className="flex flex-col gap-[20px] items-center w-full min-[780px]:hidden">
                <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden">
                  <Image src="/images/img_snapinsta_app_4.png" alt="" fill className="object-contain" />
                </div>
                <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden">
                  <Image src="/images/img_whatsapp_image_2023_03_27.png" alt="" fill className="object-contain" />
                </div>
                <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden">
                  <Image src="/images/img_rectangle_39306.png" alt="" fill className="object-contain" />
                </div>
              </div>

              {/* ✅ DESKTOP ONLY: Overlapping fanned photos (640px and above) */}
              {/* DESKTOP ONLY: Overlapping fanned photos */}
<div 
  className="max-[781px]:hidden flex relative w-full justify-center items-center" 
  style={{ height: '500px' }}
> 
                {/* LEFT CARD */}
                <div
                  className="absolute rounded-[16px] overflow-hidden"
                  style={{
                    width: '400.1px',
                    height: '356.37px',
                    transform: 'translateX(-260px) translateY(50px)',
                    zIndex: 1,
                  }}
                >
                  <Image src="/images/img_snapinsta_app_4.png" alt="" fill className="object-cover" />
                </div>

                {/* CENTER CARD */}
                <div
                  className="absolute rounded-[16px] overflow-hidden"
                  style={{
                    width: '400.1px',
                    height: '356.37px',
                    transform: 'translateY(-100px)',
                    zIndex: 3,
                  }}
                >
                  <Image src="/images/img_whatsapp_image_2023_03_27.png" alt="" fill className="object-cover" />
                </div>

                {/* RIGHT CARD */}
                <div
                  className="absolute rounded-[16px] overflow-hidden"
                  style={{
                    width: '400.1px',
                    height: '356.37px',
                    transform: 'translateX(230px) translateY(40px)',
                    zIndex: 2,
                  }}
                >
                  <Image src="/images/img_rectangle_39306.png" alt="" fill className="object-cover" />
                </div>
              </div>

              {/* About Description Text */}
              <div className="w-full max-w-[1400px] mx-auto space-y-[40px] sm:space-y-[48px] md:space-y-[56px]">
                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[40px] sm:leading-[40px] md:leading-[40px] lg:leading-[40px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  Kuruksastra is one of South India's largest cultural extravaganzas. It is not just a fest, but a three day celebration of SASTRA's culture, talent, and diversity. Inspired by Kurukshetra, the greatest battle of Hindu mythology, Kuruksastra transforms the campus into a battleground of brilliance where talent reigns supreme. Top institutes from across India gather for intense and exhilarating competitions in art, dance, music, and literary events across Tamil, English, Telugu, and Hindi, all striving to claim the coveted Overall Championship.
                </p>

                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[40ox] sm:leading-[40px] md:leading-[40px] lg:leading-[40px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  The highlight of Kuruksastra is its iconic Proshows that set the stage ablaze. The KS stage has witnessed electrifying performances by celebrated artists such as Sid Sriram, Benny Dayal, Shankar Mahadevan, Haricharan, Staccato Live, Sathyaprakash and so many more. Their performances define KS Nights, where music does not just play, it pulses through every heartbeat.
                </p>

                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[40px] sm:leading-[40px] md:leading-[40px] lg:leading-[40px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  In just a few years, Kuruksastra has risen to remarkable heights. Driven by an unstoppable student force and an exceptional organizing crew, KS continues to evolve, expand, and exceed expectations. Each edition builds upon the thunderous success of the previous one, raising the bar, amplifying the scale, and redefining what a cultural fest can truly be.
                </p>

                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[40px] sm:leading-[40px] md:leading-[40px] lg:leading-[40px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  Every year, the fest begins with electrifying sky shots and concludes with hearts full of memories and happiness. With over 1000 participants, vibrant crowds, and fierce competition, KS is your stage to shine, your arena to conquer, and your moment to make history. Bring your passion, power and show the world your unbreakable spirit. Kuruksastra awaits.
                </p>
              </div>
            </div>
          </div>
        </section>

        
      </div>
    </main>
  )
}