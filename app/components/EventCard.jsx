export default function EventCard({EventLink, EventName, EventImage, EventContent}) {

 
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