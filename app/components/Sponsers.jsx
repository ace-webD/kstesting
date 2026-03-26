import React from 'react';
import Image from 'next/image';

//placeholder component for the gray rectangles
const SponsorBox = ({ className }) => (
    <div className={`bg-[#BDBDBD] border border-gray-600 sm:border-2 sm:border-black shrink-0 w-[55px] h-[30px] min-[400px]:w-[65px] min-[400px]:h-[35px] sm:w-[110px] sm:h-[55px] md:w-[172.93px] md:h-[94.88px] ${className || ''}`}></div>
);

const Sponsers = () => {
    return (

        <div className="bg-[#e9e3d5] min-h-screen py-10 px-4 md:px-8 w-full flex flex-col items-center relative overflow-hidden">


            <div
                className="fixed inset-0 z-50 pointer-events-none opacity-50 mix-blend-hard-light"
                style={{
                    backgroundImage: "url('/texture.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>

            <div className="max-w-[1371px] w-full flex flex-col items-center relative z-10">

                <div
                    className="w-full flex justify-between items-center px-4 md:px-8 lg:px-12 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] bg-[#213447] h-[80px] sm:h-[105px] md:h-[132px] rounded-[12px] md:rounded-[20px] border-[3px] md:border-[5px] border-black"
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
                        SPONSORS
                    </h1>

                    <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                        <Image src="/spiral2.png" alt="Spiral Right" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-10 md:gap-16 w-full pt-8 md:pt-12 pb-12">

                    <div className="flex flex-col items-center gap-4 w-full">
                        <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px]" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Sponsor 1</h2>
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-[32px]">
                                {[...Array(6)].map((_, i) => <SponsorBox key={`t1-${i}`} />)}
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-[32px]">
                                {[...Array(5)].map((_, i) => <SponsorBox key={`t2-${i}`} />)}
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full gap-10 md:gap-32">
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px]" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Sponsor 2</h2>
                            <div className="flex justify-center gap-2 sm:gap-4 md:gap-[32px]">
                                {[...Array(2)].map((_, i) => <SponsorBox key={`m1-${i}`} />)}
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <h2 className="text-[#213447] text-center font-normal tracking-normal z-10 text-[45px] sm:text-[60px] md:text-[83.63px] leading-[35px] sm:leading-[50px] md:leading-[59.85px]" style={{ fontFamily: "'Jomhuria', serif, sans-serif" }}>Sponsor 3</h2>
                            <div className="flex justify-center gap-2 sm:gap-4 md:gap-[32px]">
                                {[...Array(2)].map((_, i) => <SponsorBox key={`m2-${i}`} />)}
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col items-center gap-4 w-full">
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
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Sponsers;
