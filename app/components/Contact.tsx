"use client";

import Image from "next/image";
import { useState } from "react";

import { CANVAS_TEXTURE_STYLE } from './Hero'; 
interface Card {
  role: string;
  name: string;
  phone: string;
}

interface HeadCard {
  club: string;
  name: string;
  phone: string;
}
function Spiral() {
  return (
    <svg
      width="84"
      height="81"
      viewBox="0 0 84 81"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 opacity-90 flex-shrink-0"
    >
      <path d="M34.9873 28.8421C49.0806 27.8379 45.3895 39.5534 44.2151 39.3861C45.6915 32.4237 40.468 31.3526 37.6717 31.6874C21.3972 35.5367 27.605 54.2815 37.6717 59.4698C47.7384 64.6581 61.4962 59.1351 63.174 56.2899C64.8518 53.4447 72.5696 44.9091 72.5696 36.2062C72.5696 29.2438 70.2207 23.1518 69.0463 20.9761C60.8123 7.68932 50.8669 2.30274 45.7143 0.884193C45.2212 0.766175 44.7215 0.65717 44.2151 0.557617C44.6529 0.623132 45.1554 0.730317 45.7143 0.884193C63.1286 5.05178 72.3034 20.4597 74.7507 27.838C76.6522 38.6609 75.1534 61.3778 53.9462 65.6623C32.739 69.9468 24.3054 55.0626 22.7394 47.0849C22.1242 41.3387 23.7125 29.6455 34.9873 28.8421Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
      <path d="M49.0132 51.36C34.9198 52.3642 38.611 40.6487 39.7854 40.8161C38.309 47.7785 43.5325 48.8496 46.3288 48.5148C62.6033 44.6654 56.3955 25.9206 46.3288 20.7323C36.2621 15.544 22.5042 21.0671 20.8265 23.9122C19.1487 26.7574 11.4309 35.293 11.4309 43.996C11.4309 50.9583 13.7798 57.0504 14.9542 59.2261C23.1882 72.5128 33.1336 77.8994 38.2861 79.318C38.7793 79.436 39.279 79.545 39.7854 79.6445C39.3476 79.579 38.8451 79.4718 38.2861 79.318C20.8719 75.1504 11.6971 59.7424 9.24975 52.3642C7.34826 41.5413 8.84708 18.8244 30.0543 14.5398C51.2615 10.2553 59.6951 25.1396 61.2611 33.1173C61.8762 38.8635 60.2879 50.5567 49.0132 51.36Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
      <path d="M31.3162 47.9629C29.2271 33.9891 41.1926 36.7649 41.1164 37.9487C34.0608 37.0141 33.3961 42.3047 33.9457 45.0668C39.0399 60.9956 57.2496 53.3594 61.6453 42.9222C66.041 32.4851 59.4725 19.1946 56.5063 17.7415C53.54 16.2883 44.4342 9.25244 35.7572 9.92425C28.8156 10.4617 22.9231 13.2739 20.8445 14.6128C8.233 23.8478 3.63022 34.1793 2.61364 39.426C2.53404 39.9268 2.46394 40.4335 2.40378 40.946C2.4353 40.5044 2.50337 39.9951 2.61364 39.426C5.42452 21.742 20.0783 11.4052 27.2456 8.39561C37.8894 5.66434 60.6542 5.40509 66.563 26.2183C72.4718 47.0314 58.283 56.5889 50.45 58.766C44.7684 59.8229 32.9875 59.142 31.3162 47.9629Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
      <path d="M52.6838 32.2402C54.7729 46.214 42.8074 43.4383 42.8836 42.2544C49.9392 43.189 50.6039 37.8984 50.0543 35.1363C44.9601 19.2075 26.7504 26.8437 22.3547 37.2809C17.959 47.7181 24.5275 61.0085 27.4937 62.4617C30.46 63.9148 39.5658 70.9507 48.2428 70.2789C55.1844 69.7414 61.0769 66.9293 63.1555 65.5904C75.767 56.3553 80.3698 46.0238 81.3864 40.7771C81.466 40.2763 81.5361 39.7697 81.5962 39.2571C81.5647 39.6987 81.4966 40.208 81.3864 40.7771C78.5755 58.4611 63.9217 68.7979 56.7544 71.8075C46.1106 74.5388 23.3458 74.798 17.437 53.9849C11.5282 33.1717 25.717 23.6142 33.55 21.4371C39.2316 20.3802 51.0125 21.0611 52.6838 32.2402Z" fill="#E9E1CF" stroke="black" strokeWidth="1.12709"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  );
}

export default function Contact() {
  const [searchQuery, setSearchQuery] = useState("");

  const cards: Card[] = [
    { role: "Marketing and Cultural\nCoordinator",            name: "AMIRTHAVARSHINI R", phone: "+91 99529 64049" },
    { role: "Promotions and External\nRelations Coordinator", name: "AMRUTHA K R",        phone: "+91 93619 71610" },
    { role: "Infra and Finance\nCoordinator",                 name: "MUKILAN V M",         phone: "+91 93844 37698" },
    { role: "Planning and Internal\nRelations Coordinator",   name: "SHANJAY S",           phone: "+91 96009 23014" },
    { role: "Creative and Development\nCoordinator",          name: "RAJESHWAR P",         phone: "+91 80724 37287" },
  ];

  const heads: HeadCard[] = Array(12).fill(null).map(() => ({
    club: "CLUB",
    name: "NAME",
    phone: "+91 12345 67890",
  }));

  const filteredHeads = heads.filter(
    (h) =>
      h.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const J: React.CSSProperties = {
    fontFamily: "'Jomhuria', sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
  };

  // ── Single source of truth — both card types share these exactly ──
  const CARD_SHELL: React.CSSProperties = {
    border: "3px solid #000000",
    borderRadius: "clamp(6px,0.7vw,10px)",
    overflow: "hidden",
  };
  const HEADER_MIN_H = "clamp(32px,4.2vw,60px)";
  const HEADER_PAD   = "clamp(4px,0.7vw,10px) clamp(6px,0.8vw,12px)";
  const HEADER_FONT  = "clamp(20px,4vw,28px)";
  const BODY_MIN_H   = "clamp(36px,4.8vw,70px)";
  const BODY_PAD     = "clamp(4px,0.7vw,10px) clamp(6px,0.8vw,12px)";
  const NAME_FONT    = "clamp(20px,5vw,38px)";
  const PHONE_FONT   = "clamp(15px,3vw,30px)";
  
  return (
    <footer
      id="contacts-section"
      className="w-full relative bg-[#E9E1CF] overflow-hidden flex flex-col items-center mt-10 md:mt-15"
      style={{ padding: "clamp(20px,4vw,52px) 0 clamp(16px,3vw,32px)" ,}}
    >
      <div style={CANVAS_TEXTURE_STYLE} />

      <div
        className="relative z-10 flex flex-col items-center w-full"
        style={{ padding: "0 clamp(12px,2.5vw,40px)", ...J ,}}
      >

        {/* ━━━━━━━━━━━━━━ CONTACT US BANNER ━━━━━━━━━━━━━━ */}
        <div
                            className="w-full flex justify-between items-center px-4 md:px-8 lg:px-12 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] bg-[#213447] h-[80px] sm:h-[105px] md:h-[132px] rounded-full border-[3px] md:border-[5px] border-black mb-5"
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
                                CONTACT
                            </h1>
         
                            <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                                <Image src="/spiral2.png" alt="Spiral Right" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                            </div>
                        </div>

        {/* ━━━━━━━━━━━━━━ CORE COMMITTEE ━━━━━━━━━━━━━━ */}
        <h3
          style={{
            ...J,
            color: "#213447",
            fontSize: "clamp(30px,6.5vw,78px)",
            lineHeight: 1,
            letterSpacing: "0.03em",
            marginBottom: "clamp(10px,2vw,22px)",
          }}
        >
          Core Committee
        </h3>

        <div
          className="w-full flex flex-wrap justify-center"
          style={{ gap: "clamp(6px,1.4vw,18px)", marginBottom: "clamp(18px,3.5vw,48px)" }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative hover:scale-[1.02] transition-transform"
              style={{ ...CARD_SHELL, width: "clamp(140px,30%,440px)"}}
            >

              {/* Role header */}
              <div
                className="flex items-center justify-center text-center"
                style={{
                  backgroundColor: "#213447",
                  minHeight: HEADER_MIN_H,
                  padding: HEADER_PAD,
                  borderBottom: "1.5px solid #000000",
                }}
              >
                <p
                  className="text-[#E9E1CF] uppercase whitespace-pre-line leading-tight"
                  style={{ ...J, fontSize: HEADER_FONT ,WebkitTextStroke: "2px #000000",
          
          paintOrder: "stroke fill"}}
                >
                  {card.role}
                </p>
              </div>

              {/* Name + phone */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  backgroundColor: "#E9E1CF",
                  minHeight: BODY_MIN_H,
                  padding: BODY_PAD,
                }}
              >
                <p
                  className="text-center text-[#000000] leading-tight"
                  style={{ ...J, fontSize: NAME_FONT }}
                >
                  {card.name}
                </p>
                <p
                  className="text-center text-[#000000]"
                  style={{ ...J, fontSize: PHONE_FONT }}
                >
                  {card.phone}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ━━━━━━━━━━━━━━ HEADS ━━━━━━━━━━━━━━ */}
        <h3
          style={{
            ...J,
            color: "#213447",
            fontSize: "clamp(24px,5.9vw,78px)",
            lineHeight: 1,
            letterSpacing: "0.03em",
            marginBottom: "clamp(10px,2vw,22px)",
          }}
        >
          Heads
        </h3>

        {/* Search + Filter */}
        <div
          className="w-full flex"
          style={{
            gap: "clamp(6px,1vw,14px)",
            height: "clamp(34px,4.17vw,60px)",
            marginBottom: "clamp(10px,2vw,22px)",
          }}
        >
          <div className="flex-1 relative flex items-center">
            <span
              className="absolute text-[#8a9bb0] pointer-events-none"
              style={{ left: "clamp(8px,1vw,14px)" }}
            >
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Type to Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full bg-[#E9E1CF] text-[#213447] placeholder-[#8a9bb0] outline-none focus:ring-1 focus:ring-[#213447]"
              style={{
                ...J,
                border: "1.5px solid #000000",
                borderRadius: "clamp(4px,0.5vw,8px)",
                paddingLeft: "clamp(28px,2.5vw,40px)",
                paddingRight: "clamp(8px,1vw,14px)",
                fontSize: "clamp(20px,1.4vw,20px)",
              }}
            />
          </div>

          {/* <button
            className="flex items-center bg-[#E9E1CF] hover:bg-[#d4ccb5] transition-colors text-[#213447] whitespace-nowrap"
            style={{
              ...J,
              border: "1.5px solid #000000",
              borderRadius: "clamp(4px,0.5vw,8px)",
              padding: "0 clamp(10px,1.5vw,24px)",
              gap: "clamp(4px,0.5vw,8px)",
              fontSize: "clamp(12px,1.4vw,20px)",
            }}
          >
            <FilterIcon />
            Filter
          </button> */}
        </div>

        {/* ━━━━━━━━━━━━━━ HEADS CARDS GRID ━━━━━━━━━━━━━━ */}
        <div
          className="w-full flex flex-row heads-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(6px,1.2vw,16px)",
            marginBottom: "clamp(18px,3.5vw,48px)",
          }}
        >
          {filteredHeads.map((head, i) => (
            <div
              key={i}
              className="relative hover:scale-[1.02] transition-transform"
              style={CARD_SHELL}
            >
              <div className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply opacity-40">
                <Image src="/texture.png" alt="" fill style={{ objectFit: "cover" }} />
              </div>

              {/* Club header — identical dims to Core Committee role header */}
              <div
                className="flex items-center justify-center text-center"
                style={{
                  backgroundColor: "#213447",
                  minHeight: HEADER_MIN_H,
                  padding: HEADER_PAD,
                  borderBottom: "1.5px solid #000000",WebkitTextStroke: "2px #000000",
          
          paintOrder: "stroke fill"
                }}
              >
                <p
                  className="text-[#E9E1CF] uppercase leading-tight "
                  style={{ ...J, fontSize: HEADER_FONT }}
                >
                  {head.club}
                </p>
              </div>

              {/* Name + phone — identical dims to Core Committee body */}
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  backgroundColor: "#E9E1CF",
                  minHeight: BODY_MIN_H,
                  padding: BODY_PAD,
                }}
              >
                <p
                  className="text-center text-[#213447] leading-tight text-black"
                  style={{ ...J, fontSize: NAME_FONT }}
                >
                  {head.name}
                </p>
                <p
                  className="text-center text-[#4C4C4C] text-black"
                  style={{ ...J, fontSize: PHONE_FONT }}
                >
                  {head.phone}
                </p>
              </div>
            </div>
          ))}

          {filteredHeads.length === 0 && (
            <p
              className="text-[#213447] col-span-3 text-center py-8"
              style={{ ...J, fontSize: "clamp(14px,2vw,24px)" }}
            >
              No results found.
            </p>
          )}
        </div>

      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .heads-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .heads-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
