import React from 'react';
import Image from 'next/image';
import { CANVAS_TEXTURE_STYLE } from './Hero';

const coSponsors = [
  "/logos/farmley.png",
  "/logos/bharath.png",
  "/logos/WhyWhyTatoo.jpg",
  "/logos/Veggies_express.png",
  "/logos/Lounge.png",
  "/logos/thoovibridals.jpg",
  "/logos/lemonly .jpeg",
  "/logos/land of tales.png",
  "/logos/FullStop.jpeg",
  "/logos/cuephoria.png",
];

const sponsorRows = [
  "/logos/cub.jpg", "/logos/veranda.png",
  "/logos/palanivel.jpg", "/logos/pepsi.png",
  "/logos/2iim.png" , "/logos/az.png" ,
];
//placeholder component for the gray rectangles
const SponsorBox = ({ className }) => (
    <div className={`bg-[#BDBDBD] border border-gray-600 sm:border-2 sm:border-black shrink-0 w-[55px] h-[30px] min-[400px]:w-[65px] min-[400px]:h-[35px] sm:w-[110px] sm:h-[55px] md:w-[172.93px] md:h-[94.88px] ${className || ''}`}></div>
);

const Sponsers = () => {
    return (

        <div className="bg-[#e9e1cf] min-h-screen py-10 px-4 md:px-8 w-full flex flex-col items-center relative overflow-hidden mt-5 md:mt-15">


            <div style={CANVAS_TEXTURE_STYLE} />

            <div className="max-w-[1371px] w-full flex flex-col items-center relative z-10">

                <div
                    className="w-full flex justify-between items-center px-4 md:px-8 lg:px-12 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] bg-[#213447] h-[80px] sm:h-[105px] md:h-[132px] rounded-full border-[3px] md:border-[5px] border-black"
                >


                    <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                        <Image src="/spiral2.png" alt="Spiral Left" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                    </div>


                    <h1
                        className="lg:mt-5 text-center font-normal tracking-normal text-[55px] min-[400px]:text-[65px] sm:text-[90px] md:text-[112.9px] leading-[45px] sm:leading-[70px] md:leading-[80.79px] [-webkit-text-stroke:1px_#000] sm:[-webkit-text-stroke:2px_#000] md:[-webkit-text-stroke:3.17px_#000] mt-3"
                        style={{
                            fontFamily: "'Jomhuria', serif, sans-serif",
                            fontWeight: 400,
                            letterSpacing: "0%",
                            color: "#E9E1CF",
                            paintOrder: "stroke fill",
                        }}
                    >
                        SPONSORS
                    </h1>
 
                    <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                        <Image src="/spiral2.png" alt="Spiral Right" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-10 md:gap-16 w-full pt-8 md:pt-12 pb-12">

                    <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 mb-8 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px]" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Sponsors</h2>
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-3 mb-14"
                                >
                                {sponsorRows.slice(0,2).map((logo, i) => (
                                    <div key={i} className='bg-[#e9e1cf] p-5 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-1 mb-14"
                                >
                                {sponsorRows.slice(2,3).map((logo, i) => (
                                    <div className='bg-[#e9e1cf] p-5 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-3 mb-14"
                                >
                                {sponsorRows.slice(3,5).map((logo, i) => (
                                    <div className='bg-[#e1e9cf] p-5 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-3 mb-4"
                                >
                                {sponsorRows.slice(5,6).map((logo, i) => (
                                    <div className='bg-[#e1e9cf] p-5 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full gap-10 md:gap-32">
                        <div className="flex flex-col items-center">
                            <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px] mb-10" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Co-Sponsors</h2>
                            
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-2 mb-14"
                                >
                                {coSponsors.slice(0,3).map((logo, i) => (
                                    <div className='bg-[#e9e1cf] p-1 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-2 mb-14"
                                >
                                {coSponsors.slice(3,5).map((logo, i) => (
                                    <div className='bg-[#e9e1cf] p-1 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-3 mb-14"
                                >
                                {coSponsors.slice(5,8).map((logo, i) => (
                                    <div className='bg-[#e1e9cf] p-1 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-2 mb-14"
                                >
                                {coSponsors.slice(8,10).map((logo, i) => (
                                    <div className='bg-[#e1e9cf] p-1 border-3 rounded-sm'><img
                                    key={i}
                                    src={logo}
                                    className="h-20 sm:h-10 md:h-25 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    /></div>
                                ))}
                            </div>
                            {/* <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-4 mb-4 md:mb-20"
                                >
                                {coSponsors.slice(0,4).map((logo, i) => (
                                    <img
                                    key={i}
                                    src={logo}
                                    className="h-13 sm:h-15 md:h-35 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    />
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-4 mb-4 md:mb-20"
                                >
                                {coSponsors.slice(4,7).map((logo, i) => (
                                    <img
                                    key={i}
                                    src={logo}
                                    className="h-13 sm:h-15 md:h-35 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    />
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-4 mb-4 md:mb-20"
                                >
                                {coSponsors.slice(7,9).map((logo, i) => (
                                    <img
                                    key={i}
                                    src={logo}
                                    className="h-13 sm:h-15 md:h-35 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    />
                                ))}
                            </div>
                            <div
                                className="flex items-center justify-around
                                    h-[60px] sm:h-[75px] md:h-[90px]
                                    px-2 sm:px-3 gap-4 mb-4 md:md-20"
                                >
                                {coSponsors.slice(9).map((logo, i) => (
                                    <img
                                    key={i}
                                    src={logo}
                                    className="h-13 sm:h-15 md:h-35 w-auto object-contain"
                                    style={{
                                        mixBlendMode: "multiply",
                                        background: "transparent",
                                    }}
                                    />
                                ))}
                            </div> */}
                        </div>
                    </div>


                    {/* <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px]" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Sponsor 4</h2>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-[32px]">
                            {[...Array(6)].map((_, i) => <SponsorBox key={`b1-${i}`} />)}
                        </div>
                    </div>


                    <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px]" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Sponsor 5</h2>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-[32px]">
                            {[...Array(4)].map((_, i) => <SponsorBox key={`b2-${i}`} />)}
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};

export default Sponsers;
