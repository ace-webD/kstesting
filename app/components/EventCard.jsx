import Image from "next/image";
import { CANVAS_TEXTURE_STYLE } from "./Hero";


export const EventCard = ({EventLink, EventName, EventImage, EventContent}) => {

 
  return (
    <div className="
      border-4 border-black 
      rounded-2xl 
      p-4 md:p-6 
      flex flex-col md:flex-row 
      gap-4 md:gap-6 
      bg-[#E9E1CF] 
      shadow-[0_6px_0_black]
    ">

      
      <div className="
        w-full h-[200px]
        md:w-[250px] md:h-[200px]
        bg-gray-300 
        border-2 border-black 
        rounded-lg
        flex items-center justify-center
      ">
        <img src={EventImage} width={80} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2">

        <h2 className="text-xl md:text-2xl font-bold text-[#213447]">
          {EventName}
        </h2>
        <p className="text-xs md:text-sm leading-relaxed">
          {EventContent}
        </p>
        <a href={EventLink}
        target="_blank"
        rel= "noopener noreferrer">

      
        <button className="
          mt-2
          bg-[#213447] 
          text-white 
          px-6 py-2 
          rounded-md 
          border-2 border-black 
          shadow-[0_4px_0_black]

          active:translate-y-[2px]
          active:shadow-[0_2px_0_black]

          w-full md:w-fit
        " >
          REGISTER
        </button>
          </a>

      </div>
    </div>
  );
}


export const Events = () => {
  return (
    <div className="texture-overlay overflow-auto bg-[#f4eedf] min-h-screen px-4 md:px-6 py-6 md:py-10 mt-10 md:mt-15" 
      style={{ backgroundColor: '#E8E0D5', fontFamily: "'Jomhuria', cursive"}} >
        <div style={CANVAS_TEXTURE_STYLE} />
      {/* Header */}
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
                              EVENTS
                          </h1>
       
                          <div className="w-[40px] sm:w-[50px] md:w-[85px] shrink-0">
                              <Image src="/spiral2.png" alt="Spiral Right" width={85} height={85} className="w-full h-auto object-contain mt-1" />
                          </div>
                      </div>

      {/* Event List */}
      <div className="
      
        header-overlay
        flex flex-col 
        gap-6 md:gap-10 
        pt-10 md:pt-16
        max-w-[1200px] mx-auto
      ">
        <EventCard EventName={"Event1"} EventLink={"https://www.youtube.com"} EventImage={"/next.svg"} EventContent={"The one and only event"} />
        <EventCard EventName={"Event2"} EventLink={"https://chatgpt.com/"} EventImage={"/spiral.png"} EventContent={"The one and only event event is not eventing  "}/>
        <EventCard EventName={"Event3"} EventLink={"https://ace-sastra.vercel.app/"} EventImage={"/globe.svg"} EventContent={"brain is not braining"}/>
        <EventCard EventName={"Event4"} EventLink={"https://webstream.sastra.edu/sastrapwi/"} EventImage={"/file.svg"} EventContent={"making fun around troubles"}/>
      </div>

    </div>
  );
}