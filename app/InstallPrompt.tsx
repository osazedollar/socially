"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ App installed successfully");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2 z-50
        w-[90%] sm:w-[400px] md:w-auto
        bg-white border shadow-lg rounded-2xl
        flex flex-col md:flex-row items-center justify-between
        p-4 md:gap-3 gap-2 animate-slide-up
      "
    >
      <div className="text-center md:text-left">
        <p className="text-gray-900 font-semibold text-base md:text-lg">
          Install Socially?
        </p>
        <p className="text-xs md:text-sm text-gray-600">
          Get quicker access and an app-like experience.
        </p>
      </div>

      <button
        onClick={handleInstall}
        className="
          bg-purple-600 text-white font-medium rounded-xl 
          px-6 py-2 mt-2 md:mt-0
          hover:bg-purple-700 transition
          w-full md:w-auto
        "
      >
        Install
      </button>
    </div>
  );
}
