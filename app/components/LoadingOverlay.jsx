"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function LoadingOverlay({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const timeoutRef = useRef(null);

  const messages = [
    "Unleashing the vortex...",
    "Spinning up the gallery...",
    "Loading cosmic assets...",
    "Polishing the illusion...",
    "Almost there...",
    "Ready to mesmerize!",
  ];

  const MESSAGE_INTERVAL = 2500;
  const TOTAL_DURATION = 15000;

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, MESSAGE_INTERVAL);
    return () => clearInterval(interval);
  }, [isLoading, messages.length]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), TOTAL_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="flex flex-col items-center gap-8">
            <div
              style={{
                animation: "float 2s ease-in-out infinite",
              }}
            >
              <Image
                src="/ks_logo.png"
                alt="Loading"
                width={200}
                height={200}
                priority
                style={{
                  width: "clamp(150px, 20vw, 240px)",
                  height: "auto",
                  filter: "brightness(0) saturate(100%)",
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Spinner with CSS class */}
              <div className="loading-spinner" />
              <p
                className="text-black text-2xl md:text-4xl font-normal tracking-wide pt-3 md:pt-2"
                style={{
                  fontFamily: "'Jomhuria', sans-serif",
                  minHeight: "3rem",
                }}
              >
                {messages[messageIndex]}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(0, 0, 0, 0.2);
          border-top: 3px solid #000000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}