import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

export default function Footer() {
  const links = ["https://www.youtube.com/@sastrafotohub?si=MIuC5i2-YCzNgqCC",
                  "https://www.instagram.com/kuruksastra?igsh=c3VrYWEwdXgydTNj",
                "https://www.facebook.com/kssastra/",
                "https://www.linkedin.com/company/kuruksastra/",
                "https://x.com/kssastra?t=m_rRvKLpVIyeU_rN9FSBiA&s=09", ]
  const date = new Date()
  return (
    <footer id="contacts-section" className="w-full h-auto min-h-screen relative bg-[#213447] overflow-hidden flex flex-col items-center pt-[clamp(20px,4vw,60px)] pb-[clamp(20px,4vw,40px)]">
      
      <div className="w-full h-full relative flex flex-col items-center z-10 px-[4vw] md:px-0" style={{ fontFamily: "'Jomhuria', sans-serif", fontWeight: 400 }}>

        {/* Contact Banner */}
        <div className="bg-[#e3dcc8] rounded-[clamp(30px,6vw,500px)] flex items-center justify-between px-[5vw] mb-[clamp(20px,4vw,35px)] shadow-[0px_8px_0px_#000000] border-[3px] border-black box-border w-full md:w-[95%] min-h-[clamp(70px,12vw,137px)]">
          
          <div className="w-[clamp(30px,6vw,85px)] shrink-0">
            <Image src="/spiral.png" alt="Spiral Left" width={85} height={85} className="w-full h-auto object-contain" />
          </div>

          <h2 className="text-center flex-1 uppercase text-[#213447] pt-2 md:pt-4 text-[clamp(28px,8vw,112px)] leading-[0.8]" style={{ WebkitTextStroke: '1px #000000' }}>
            <span className="md:hidden">CONTACT</span>
            <span className="hidden md:inline" style={{ WebkitTextStroke: '2px #000000' }}>CONTACT US</span>
          </h2>

          <div className="w-[clamp(30px,6vw,85px)] shrink-0">
            <Image src="/spiral.png" alt="Spiral Right" width={85} height={85} className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[#e3dcc8] mb-[clamp(20px,4vw,35px)] text-center text-[clamp(28px,6vw,83px)] leading-[1] tracking-[0.03em]" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
          Core Committee
        </h3>

        {/* Cards */}
        <div className="flex flex-row flex-wrap justify-center items-stretch gap-[clamp(10px,3vw,30px)] mb-[clamp(20px,5vw,60px)] w-[95%] sm:w-[90%]">

          {[ 
            { role: "Marketing and Cultural\nCoordinator", name: "AMIRTHAVARSHINI R", phone: "+91 99529 64049" },
            { role: "Promotions and External\nRelations Coordinator", name: "AMRUTHA K R", phone: "+91 93619 71610" },
            { role: "Infra and Finance\nCoordinator", name: "MUKILAN V M", phone: "+91 93844 37698" },
            { role: "Planning and Internal\nRelations Coordinator", name: "SHANJAY S", phone: "+91 96009 23014" },
            { role: "Creative and Development\nCoordinator", name: "RAJESHWAR P", phone: "+91 80724 37287" }
          ].map((card, i) => (
            <div key={i} className="relative flex flex-col w-[47%] lg:w-[30%] min-h-[clamp(100px,18vw,190px)] rounded-[clamp(6px,1vw,12px)] overflow-hidden shadow-[clamp(2px,0.5vw,5px)_clamp(3px,0.6vw,6px)_0px_#000] border-[clamp(2px,0.4vw,4px)] border-black box-border hover:scale-[1.02] transition-transform">

              <div className="absolute inset-0 z-[50] pointer-events-none mix-blend-multiply opacity-[0.4]">
                <Image src="/texture.png" alt="Card Texture Overlay" fill style={{ objectFit: "cover" }} />
              </div>

              <div className="bg-[#6b8baf] min-h-[clamp(30px,6vw,75px)] flex items-center justify-center px-2 text-center border-b-[clamp(2px,0.4vw,3px)] border-black">
                <p className="text-white text-[clamp(8px,4vw,36px)] uppercase leading-[0.9] whitespace-pre-line">
                  {card.role}
                </p>
              </div>

              <div className="bg-[#e3dcc8] flex-1 flex flex-col items-center justify-center gap-1 px-1">
                <p className="text-[clamp(10px,4vw,50px)] text-black leading-none font-bold md:font-normal mt-1">
                  {card.name}
                </p>
                <p className="text-black text-[clamp(9px,4vw,36px)] leading-none font-bold md:font-normal">
                  {card.phone}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Follow Us */}
        <div className="bg-[#e3dcc8] rounded-[clamp(20px,4vw,50px)] flex flex-row items-center justify-between px-[5vw] border-[clamp(3px,0.5vw,5px)] border-black box-border mb-[clamp(20px,4vw,30px)] shadow-[0px_8px_0px_#000000] w-full md:w-[95%] min-h-[clamp(60px,10vw,90px)]">

          <h2 className="text-[clamp(18px,5vw,75px)] text-[#213447] tracking-wide pt-1 leading-none">
            Follow Us
          </h2>

          <div className="flex gap-[clamp(4px,1vw,20px)] flex-wrap justify-end">
            {[FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaXTwitter].map((Icon, i) => (
              <a key={i} href={links[i]} className="w-[clamp(24px,5vw,48px)] h-[clamp(24px,5vw,48px)] bg-black rounded-[clamp(6px,1vw,12px)] flex items-center justify-center text-[#e3dcc8] hover:scale-110 transition-transform">
                <Icon className="text-[clamp(12px,2.5vw,26px)]" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-row justify-between items-center px-[4vw] text-[#6b8baf] text-[clamp(5px,5vw,32px)] mt-auto mb-[20px] w-[95%] font-sans">
          <p style={{ fontFamily: "'Jomhuria', sans-serif" }}>@{date.getFullYear()} kuruksastra</p>
          <p style={{ fontFamily: "'Jomhuria', sans-serif" }}>Made with ❤ by 300DPI &amp; ACE</p>
        </div>

      </div>

      {/* Texture */}
      <div className="absolute inset-0 z-[100] pointer-events-none mix-blend-hard-light opacity-[0.25]">
        <Image src="/texture.png" alt="Texture Overlay" fill style={{ objectFit: "cover" }} />
      </div>
    </footer>
  );
}