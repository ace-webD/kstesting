"use client"
import Image from "next/image";
import { CANVAS_TEXTURE_STYLE } from "./Hero";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
import { useEffect, useState } from "react";


export const EventCard = ({EventLink, EventName, EventImage, EventContent, EventDate, EventTime, EventVenue}) => {

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
        w-full
        md:w-[250px] 
        bg-gray-300 
        border-2 border-black 
        rounded-lg
        flex items-center justify-center
        overflow-hidden
        p-2
        my-auto
      ">
        <img src={EventImage} className="w-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-1 md:gap-0">

        <h2 className="text-[3rem] tracking-wide font-bold text-[#213447]">
          {EventName}
        </h2>
        <p className="text-[1.7rem] font-medium leading-7">
          {EventContent}
        </p>
        <p className="text-[2rem] md:text-[1.5rem] lg:text-[1.9rem] leading-relaxed">
          <span className="font-light">Date:</span> {EventDate}
        </p>
        <p className="text-[2rem] md:text-[1.5rem] lg:text-[1.9rem] leading-relaxed">
          <span className="font-light">Time:</span> {EventTime}
        </p>
        <p className="text-[2rem] md:text-[1.5rem] lg:text-[1.9rem] leading-relaxed">
          <span className="font-light">Venue:</span> {EventVenue}
        </p>
        <a href={EventLink}
        target="_blank"
        rel= "noopener noreferrer"
        className="mt-auto"
        >
        <button className="
          mt-8
          bg-[#213447] 
          text-[#e9e1cf] 
          px-10 
          rounded-md 
          border-2 border-black 
          shadow-[0_4px_0_black]
          cursor-pointer
          active:translate-y-[2px]
          active:shadow-[0_2px_0_black]
          w-full md:w-fit
          text-[2rem]
        " >
          REGISTER
        </button>
          </a>

      </div>
    </div>
  );
}


export const Events = () => {
  const [events,setEvents] = useState(null)
  const [loading,setLoading] = useState(false)
  const fetchData = async() => {
    try{
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, "events"))
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEvents(events) 
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  },[])
  return (
    <div className="texture-overlay overflow-auto bg-[#f4eedf] min-h-screen px-4 md:px-6 py-6 md:py-10 mt-10 md:mt-15" 
      style={{ backgroundColor: '#E8E0D5', fontFamily: "'Jomhuria', cursive"}} >
        <div style={CANVAS_TEXTURE_STYLE} />
      {/* Header */}
      <div
                          className=" w-full flex justify-between items-center px-4 md:px-8 lg:px-12 shadow-[4px_4px_0px_#000000] sm:shadow-[6px_6px_0px_#000000] bg-[#213447] h-[80px] sm:h-[105px] md:h-[132px] rounded-full border-[3px] md:border-[5px] border-black"
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
        {
          events?.map((event,index) => {
            return(
              <EventCard 
              key={index}
              EventLink={event.formLink}
              EventName={event.eventName}
              EventImage={event.poster}
              EventContent={event.eventDescription}
              EventTime={event.time}
              EventDate={event.date}
              EventVenue={event.venue}
              />
            )
          })
        }
      </div>
        {
          loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent" />
            </div>
          )
        }
    </div>
  );
}