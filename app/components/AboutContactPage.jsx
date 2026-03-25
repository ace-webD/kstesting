'use client';
import Image from 'next/image';

export default function AboutContactPage() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Global Background — solid #E9E1CF color covers entire page */}
      <div className="absolute inset-0 w-full h-full z-0" style={{ backgroundColor: '#e8e1d1' }} />

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
                     py-[28px] sm:py-[34px] md:py-[40px] lg:py-[48px] max-[640px]:hidden"
          style={{
            backgroundColor: "#000000",
            backgroundImage: "url('/images/img_texturelabs_grunge_340m.jpg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundBlendMode: "overlay",
            opacity: 0.95,
          }}
        >
          {/* <div className="w-full max-[640px]:w-[260px] max-[640px]:h-[20px] mx-auto">
            <div className="flex justify-between items-center w-full">
              <div className="w-[170px] sm:w-[200px] md:w-[230px] lg:w-[260px]">
                <Image
                  src="/images/img_mask_group.png"
                  alt="Kuruksastra Logo"
                  width={260}
                  height={75}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="w-[34px] sm:w-[42px] md:w-[48px] lg:w-[54px]">
                <Image
                  src="/images/img_group_481370.png"
                  alt="Menu"
                  width={54}
                  height={36}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div> */}
        </section>

        {/* About Section */}
        <section className="w-full px-[40px] sm:px-[60px] md:px-[80px] lg:px-[100px]
                           py-[36px] sm:py-[42px] md:py-[48px] lg:py-[56px]
                           mb-[50px] sm:mb-[60px] md:mb-[70px] lg:mb-[80px]">
          <div className="w-full mx-auto">

            {/* About Title Header */}
            <div className="relative w-full mb-[29px] sm:mb-[44px] md:mb-[52px] lg:mb-[58px]">
              <div
                className="relative mx-auto flex justify-center items-center 
                           w-full h-[125px] max-[640px]:w-[300px] max-[640px]:h-[58px]
                           bg-[#213447] border-[4px] border-black rounded-full"
                style={{ boxShadow: "0px 5px 0px #000000" }}
              >
                <div className="relative w-full flex items-center justify-center">
                  <div className="absolute left-[60px] w-[90px] max-[640px]:left-[15px] max-[640px]:w-[20px]">
                    <Image src="/images/img_group_481522.png" alt="" width={90} height={90} className="object-contain" />
                  </div>
                  <h1
                    className="text-[100px] max-[640px]:text-[68px] font-normal leading-none text-center text-[#e9e1cf] font-[Jomhuria]"
                    style={{ WebkitTextStroke: "1.5px black" }}
                  >
                    ABOUT
                  </h1>
                  <div className="absolute right-[60px] w-[90px] max-[640px]:right-[15px] max-[640px]:w-[20px]">
                    <Image src="/images/img_group_481522.png" alt="" width={90} height={90} className="object-contain" />
                  </div>
                </div>
              </div>
            </div>

            {/* About Content */}
            <div className="flex flex-col gap-[29px] sm:gap-[44px] md:gap-[52px] lg:gap-[58px]
                           justify-start items-center w-full
                           mt-[60px] md:mt-[80px] lg:mt-[140px]">

              {/* ✅ MOBILE ONLY: Stacked images one by one (below 640px) */}
              {/* MOBILE ONLY: Stacked images */}
<div className="flex flex-col gap-[20px] items-center w-full min-[640px]:hidden">
                <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden">
                  <Image src="/images/img_snapinsta_app_4.png" alt="" fill className="object-cover" />
                </div>
                <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden">
                  <Image src="/images/img_whatsapp_image_2023_03_27.png" alt="" fill className="object-cover" />
                </div>
                <div className="relative w-full h-[260px] rounded-[16px] overflow-hidden">
                  <Image src="/images/img_rectangle_39306.png" alt="" fill className="object-cover" />
                </div>
              </div>

              {/* ✅ DESKTOP ONLY: Overlapping fanned photos (640px and above) */}
              {/* DESKTOP ONLY: Overlapping fanned photos */}
<div 
  className="max-[639px]:hidden flex relative w-full justify-center items-center" 
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
                              leading-[48px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  Kuruksastra is one of South India's largest cultural extravaganzas. It is not just a fest, but a three day celebration of SASTRA's culture, talent, and diversity. Inspired by Kurukshetra, the greatest battle of Hindu mythology, Kuruksastra transforms the campus into a battleground of brilliance where talent reigns supreme. Top institutes from across India gather for intense and exhilarating competitions in art, dance, music, and literary events across Tamil, English, Telugu, and Hindi, all striving to claim the coveted Overall Championship.
                </p>

                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[48px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  The highlight of Kuruksastra is its iconic Proshows that set the stage ablaze. The KS stage has witnessed electrifying performances by celebrated artists such as Sid Sriram, Benny Dayal, Shankar Mahadevan, Haricharan, Staccato Live, Sathyaprakash and so many more. Their performances define KS Nights, where music does not just play, it pulses through every heartbeat.
                </p>

                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[48px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] max-[640px]:leading-[28px]
                              text-left text-black font-[Jomhuria]">
                  In just a few years, Kuruksastra has risen to remarkable heights. Driven by an unstoppable student force and an exceptional organizing crew, KS continues to evolve, expand, and exceed expectations. Each edition builds upon the thunderous success of the previous one, raising the bar, amplifying the scale, and redefining what a cultural fest can truly be.
                </p>

                <p className="text-[50px] sm:text-[30px] md:text-[34px] lg:text-[38px] max-[640px]:text-[25px]
                              leading-[48px] sm:leading-[56px] md:leading-[64px] lg:leading-[72px] max-[640px]:leading-[28px]
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