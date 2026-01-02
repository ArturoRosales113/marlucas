"use client";

import { useState } from "react";
import Image from "next/image";

type Area = {
  id: string;
  label: string;
  left: string;
  top: string;
  width: string;
  height: string;
};

const DESKTOP_AREAS: Area[] = [
  {
    id: "Cámara",
    label: "Cámara",
    left: "61%",
    top: "44%",
    width: "2%",
    height: "3%",
  },
  {
    id: "Magazines",
    label: "Magazines",
    left: "84.5%",
    top: "49.5%",
    width: "5.5%",
    height: "9%",
  },
  {
    id: "remote",
    label: "Remote",
    left: "78.2%",
    top: "48%",
    width: "3.2%",
    height: "2%",
  },
  {
    id: "mirror",
    label: "Mirror",
    left: "78.1%",
    top: "53%",
    width: "3%",
    height: "8%",
  },
  {
    id: "magazine",
    label: "Magazine",
    left: "65.6%",
    top: "39%",
    width: "3.5%",
    height: "6%",
  },
];

const MOBILE_AREAS: Area[] = [
  {
    id: "Cámara",
    label: "Cámara",
    left: "27%",
    top: "49%",
    width: "6%",
    height: "2%",
  },
  {
    id: "Magazines",
    label: "Magazines",
    left: "82%",
    top: "53%",
    width: "15%",
    height: "7%",
  },
  {
    id: "remote",
    label: "Remote",
    left: "66%",
    top: "51.8%",
    width: "10%",
    height: "2%",
  },
  {
    id: "mirror",
    label: "Mirror",
    left: "65%",
    top: "55%",
    width: "10%",
    height: "8%",
  },
  {
    id: "magazine",
    label: "Magazine",
    left: "37%",
    top: "45%",
    width: "10%",
    height: "5%",
  },
];

export default function Home() {
  const [clickedAreas, setClickedAreas] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAreaClick = (id: string) => {
    setClickedAreas((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      if (next.length === 3) {
        setIsModalOpen(true);
      }
      return next;
    });
  };

  const handlePreSaveClick = () => {
    const link = document.createElement("a");
    link.href = "/Mar_Luca_Media_Pack.zip";
    link.download = "Mar_Luca_Media_Pack.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute top-[6%] w-full h-32 z-50 mx-auto block lg:hidden">
        <Image
          src="/IMG_4108.PNG"
          alt="Cosas de Superstar background"
          fill
          priority
          className="object-cover mx-auto"
        />
      </div>
      {/* Blurred background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/gbackground.png"
          alt="Cosas de Superstar background"
          fill
          priority
          className="object-cover scale-110 blur-2xl"
        />
        {/* Pink tint overlay */}
        <div className="absolute inset-0 bg-[#e851b2]/45 mix-blend-screen pointer-events-none" />
      </div>

      {/* Desktop / main image */}
      <div className="relative h-full w-full flex items-center justify-center p-4 p-10">
        {/* Keep 1440x635 aspect ratio */}
        <div style={{ paddingTop: `${(635 / 1440) * 100}%` }} />

        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image
            src="/gbackground.png"
            alt="Cosas de Superstar"
            fill
            className="object-contain lg:block hidden"
            priority
          />

          <Image
            src="/postdata.jpg"
            alt="Cosas de Superstar mobile"
            fill
            className="object-contain lg:hidden block"
            priority
          />
          {/* === INSTRUCTION TEXT OVER IMAGE === */}
          <div
            className="
    absolute 
    bottom-[10%] 
    left-1/2 -translate-x-1/2 
    max-w-[85%] 
    text-white 
    drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]
    lg:left-[6%] lg:top-[27.5%] lg:bottom-auto lg:translate-x-0 lg:max-w-[60%]
  "
          >
            <p className="instruction-line-1 text-lg sm:text-3xl md:text-4xl font-extrabold leading-tight text-center lg:text-start">
              Bienvenidx a mi habitación de 2004 💿✨
            </p>
            <p className="instruction-line-2 mt-2 text-sm sm:text-lg md:text-xl font-semibold text-center px-4 lg:px-0 lg:text-start">
              Toca 3 Cosas de Superstar para desbloquear tu regalo.
            </p>
          </div>

          {/* Clickable overlays */}
          {DESKTOP_AREAS.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => handleAreaClick(area.id)}
              aria-label={area.label}
              className={`absolute transition-colors duration-200 hidden lg:block ${
                clickedAreas.includes(area.id)
                  ? "bg-pink-500/40 rounded-lg"
                  : "hover:bg-pink-500/40"
              }`}
              style={{
                left: area.left,
                top: area.top,
                width: area.width,
                height: area.height,
                cursor: "pointer",
              }}
            />
          ))}

          {/* MOBILE CLICKABLE AREAS */}
          {MOBILE_AREAS.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => handleAreaClick(area.id)}
              aria-label={area.label}
              className={`absolute transition-colors duration-200 lg:hidden ${
                clickedAreas.includes(area.id)
                  ? "bg-pink-500/40 border-2 rounded-2xl "
                  : "hover:bg-pink-500/40"
              }`}
              style={{
                left: area.left,
                top: area.top,
                width: area.width,
                height: area.height,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal with blurred pink overlay */}
      {isModalOpen && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          {/* Blurred pink backdrop */}
          <div className="absolute inset-0 bg-[#e851b2]/60 backdrop-blur-md" />

          {/* Modal card (on top of backdrop) */}
          <div className="relative text-white rounded-[40px] max-w-[550px] w-[90%] flex flex-col items-center text-center gap-4 sm:gap-6">
            <div className="border border-[#ff4fb5] shadow-2xl px-6 sm:px-12 py-6 sm:py-8 rounded-[40px]">
              <p className="text-sm sm:text-xl md:text-2xl font-bold leading-snug sm:leading-snug md:leading-snug">
                Haz pre-save para reclamar tu póster oficial, wallpapers y
                sticker pack
              </p>
            </div>

            {/* Button row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://orcd.co/cds-marlucas"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ff6fd0] hover:bg-[#ff8ad9] text-white font-semibold rounded-full px-6 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm md:text-base shadow-md whitespace-nowrap"
              >
                Pre-save &quot;Cosas de Superstar&quot;
              </a>
              <button
                type="button"
                onClick={handlePreSaveClick}
                className="bg-[#ff6fd0] hover:bg-[#ff8ad9] text-white font-semibold rounded-full px-6 sm:px-10 py-2 sm:py-3 text-xs sm:text-sm md:text-base shadow-md whitespace-nowrap"
              >
                Descarga
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}