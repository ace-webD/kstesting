import React from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const coSponsors = [
  "/logos/farmley.png",
  "/logos/bharath.png",
  "/logos/WhyWhyTatoo.jpg",
  "/logos/Veggies_express.png",
  "/logos/Lounge.png",
  "/logos/land of tales.png",
  "/logos/lemonly .jpeg",
  "/logos/thoovibridals.jpg",
  "/logos/FullStop.jpeg",
  "/logos/cuephoria.png",
  "/logos/Infiniti_gaming.jpg",
  "/logos/Inkspire cafe.jpeg",
  "/logos/Meuco.jpeg",
  "/logos/Ragaa.png",
  "/logos/Reggi.jpg",
];

const sponsorRows = [
  ["/logos/cub.jpg", "/logos/veranda.png"],
  ["/logos/palanivel.jpg", "/logos/pepsi.png", ],
  ["/logos/2iim.png" , "/logos/az.png", ],
];

// ─── Sub-components ──────────────────────────────────────────────────────────
const rows = [
  coSponsors.slice(0, 3),  // first 3
  coSponsors.slice(3, 6),  // next 3
  coSponsors.slice(6, 9), // next 3
  coSponsors.slice(9, 12), // next 3
  coSponsors.slice(12, 15), // next 3
];
function Spiral() {
  return (
    <svg
      width="84"
      height="81"
      viewBox="0 0 84 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 opacity-90"
    >
      <path d="M34.9873 28.8421C49.0806 27.8379 45.3895 39.5534 44.2151 39.3861C45.6915 32.4237 40.468 31.3526 37.6717 31.6874C21.3972 35.5367 27.605 54.2815 37.6717 59.4698C47.7384 64.6581 61.4962 59.1351 63.174 56.2899C64.8518 53.4447 72.5696 44.9091 72.5696 36.2062C72.5696 29.2438 70.2207 23.1518 69.0463 20.9761C60.8123 7.68932 50.8669 2.30274 45.7143 0.884193C45.2212 0.766175 44.7215 0.65717 44.2151 0.557617C44.6529 0.623132 45.1554 0.730317 45.7143 0.884193C63.1286 5.05178 72.3034 20.4597 74.7507 27.838C76.6522 38.6609 75.1534 61.3778 53.9462 65.6623C32.739 69.9468 24.3054 55.0626 22.7394 47.0849C22.1242 41.3387 23.7125 29.6455 34.9873 28.8421Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
      <path d="M49.0132 51.36C34.9198 52.3642 38.611 40.6487 39.7854 40.8161C38.309 47.7785 43.5325 48.8496 46.3288 48.5148C62.6033 44.6654 56.3955 25.9206 46.3288 20.7323C36.2621 15.544 22.5042 21.0671 20.8265 23.9122C19.1487 26.7574 11.4309 35.293 11.4309 43.996C11.4309 50.9583 13.7798 57.0504 14.9542 59.2261C23.1882 72.5128 33.1336 77.8994 38.2861 79.318C38.7793 79.436 39.279 79.545 39.7854 79.6445C39.3476 79.579 38.8451 79.4718 38.2861 79.318C20.8719 75.1504 11.6971 59.7424 9.24975 52.3642C7.34826 41.5413 8.84708 18.8244 30.0543 14.5398C51.2615 10.2553 59.6951 25.1396 61.2611 33.1173C61.8762 38.8635 60.2879 50.5567 49.0132 51.36Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
      <path d="M31.3162 47.9629C29.2271 33.9891 41.1926 36.7649 41.1164 37.9487C34.0608 37.0141 33.3961 42.3047 33.9457 45.0668C39.0399 60.9956 57.2496 53.3594 61.6453 42.9222C66.041 32.4851 59.4725 19.1946 56.5063 17.7415C53.54 16.2883 44.4342 9.25244 35.7572 9.92425C28.8156 10.4617 22.9231 13.2739 20.8445 14.6128C8.233 23.8478 3.63022 34.1793 2.61364 39.426C2.53404 39.9268 2.46394 40.4335 2.40378 40.946C2.4353 40.5044 2.50337 39.9951 2.61364 39.426C5.42452 21.742 20.0783 11.4052 27.2456 8.39561C37.8894 5.66434 60.6542 5.40509 66.563 26.2183C72.4718 47.0314 58.283 56.5889 50.45 58.766C44.7684 59.8229 32.9875 59.142 31.3162 47.9629Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
      <path d="M52.6838 32.2402C54.7729 46.214 42.8074 43.4383 42.8836 42.2544C49.9392 43.189 50.6039 37.8984 50.0543 35.1363C44.9601 19.2075 26.7504 26.8437 22.3547 37.2809C17.959 47.7181 24.5275 61.0085 27.4937 62.4617C30.46 63.9148 39.5658 70.9507 48.2428 70.2789C55.1844 69.7414 61.0769 66.9293 63.1555 65.5904C75.767 56.3553 80.3698 46.0238 81.3864 40.7771C81.466 40.2763 81.5361 39.7697 81.5962 39.2571C81.5647 39.6987 81.4966 40.208 81.3864 40.7771C78.5755 58.4611 63.9217 68.7979 56.7544 71.8075C46.1106 74.5388 23.3458 74.798 17.437 53.9849C11.5282 33.1717 25.717 23.6142 33.55 21.4371C39.2316 20.3802 51.0125 21.0611 52.6838 32.2402Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
    </svg>
  );
}

function SponsorsBanner() {
  return (
    <div
      className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-2 lg:py-3
        rounded-full border-[3px] border-black shadow-lg mb-10"
      style={{
        background: "#557792",
        boxShadow: "clamp(2px, 0.3vw, 3px) clamp(3px, 0.4vw, 5px) 0px rgba(0,0,0,1)",
        zIndex: 4
      }}
    >
      <Spiral />
      <h1
        style={{
          fontFamily: "'Jomhuria', sans-serif",
          letterSpacing: "0",
          WebkitTextStroke: "5px #000000",
          
          paintOrder: "stroke fill",
        } as React.CSSProperties}
        className="text-[2.7rem] sm:text-[4rem] lg:text-[4.8rem] leading-none font-normal text-[#E9E1CF]"
      >
        SPONSORS
      </h1>
      <Spiral />
    </div>
  );
}

function MainSponsorsGrid() {
  return (
    <div className="flex flex-col justify-evenly mb-22 lg:gap-y-40 lg:mt-10">
      {sponsorRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center justify-around
            h-[60px] sm:h-[75px] md:h-[90px]
            px-2 sm:px-3 gap-1 mb-4"
        >
          {row.map((logo, i) => (
            <img
              key={i}
              src={logo}
              className={`h-10 sm:h-10 md:h-15 xl:h-25 w-auto object-contain ${((i===0 && rowIndex==0) || (i===1 && rowIndex==1) || (i===0 && rowIndex===2)) ? 'h-11 sm:h-12 md:h-20 lg:h-22' : ''}`}
              style={{
                mixBlendMode: "multiply",
                background: "transparent",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function CoSponsorsPanel() {
  return (
    <div style={{boxShadow: "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px #000000"}} className="bg-[#2c3e50] rounded-2xl text-white flex flex-col mx-auto border-4 border-black my-10 md:my-0">
      <h2
        style={{ fontFamily: "'Jomhuria', sans-serif", letterSpacing: "0" , WebkitTextStroke: "5px #000000",
          
          paintOrder: "stroke fill"}}
        className="text-[2.28rem] md:text-[4.84rem] font-normal text-center mb-2 sm:mb-3 leading-none text-[#E9E1CF] pt-3"
      >
        Co-Sponsors
      </h2>
      <div className="bg-[#e9e1cf] rounded-[10px] p-3 sm:p-3 flex flex-col gap-20 border-t-4 border-black">

  {rows.map((row, rowIndex) => (
    <div
      key={rowIndex}
      className={`grid gap-1 sm:gap-3 items-center justify-center ${
        rowIndex < 2 ? "grid-cols-3" : "grid-cols-3"
      }`}
    >
      {row.map((logo, i) => (
        <img
          key={i}
          src={logo}
          className="h-20 lg:h-[78px] object-contain mx-auto w-full"
        />
      ))}
    </div>
  ))}

</div>
    </div>
  );
}

function Footer() {
  return (
    <div className="w-full mt-6">
      <div className="bg-[#1f3a5f] text-white text-center py-3 rounded-b-xl text-lg font-semibold tracking-wide shadow-inner">
        Sponsorshhhh
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function Sponsors() {
  return (
    <div className="bg-[#e9e3d5] p-3 sm:p-4 lg:p-6 flex justify-center" id="sponsors-section" style={{position: "relative",zIndex: 400}}>
      <div className="w-full ">

        {/* Banner */}
        <SponsorsBanner />

        {/* Mobile: stack vertically | md+: side by side */}
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 lg:gap-6 mt-6 sm:mt-3 lg:mt-10 mx-auto items-stretch">

          {/* Left — Main Sponsors */}
          <div className="relative flex-1 border-4 border-[#000000] rounded-2xl overflow-hidden flex flex-col " style={{boxShadow: "clamp(3px, 0.5vw, 5px) clamp(4px, 0.6vw, 7px) 0px #000000"}}>

            {/* Logos area */}
            <div className="bg-[#e9e1cf] pt-3 sm:pt-4 lg:pt-5 px-3 sm:px-4 lg:px-5 pb-0">
              <MainSponsorsGrid />
            </div>

            {/* Footer label */}
            <div
              style={{ fontFamily: "'Jomhuria', sans-serif", letterSpacing: "0", WebkitTextStroke: "5px #000000",
          
          paintOrder: "stroke fill" }}
              className="absolute bottom-0 bg-[#213447] text-[#E9E1CF] text-center
                h-[60px] md:h-[99px] flex items-center justify-center
                text-[2.25rem] md:text-[4.8rem]
                font-normal leading-none w-full border-t-4 rounded-xl border-black"
            >
              Sponsors
            </div>
          </div>

          {/* Right — Co-Sponsors */}
          <div className="flex flex-1 flex-col flex-wrap lg:flex-row">
            <div className="w-full">
            <CoSponsorsPanel />
          </div>
          </div>

        </div>
        
      </div>
      
    </div>
  );
}
