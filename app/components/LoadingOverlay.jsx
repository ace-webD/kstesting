"use client";
import Image from "next/image";

export default function LoadingOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(12px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <Image
          src="/ks_logo.png" // change to your logo or any image
          alt="Loading"
          width={120}
          height={120}
          priority
          style={{
            width: "clamp(80px, 15vw, 150px)",
            height: "auto",
            filter: "invert(1) brightness(0.95)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}