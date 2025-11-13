"use client";
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // show your custom popup automatically
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    // ✅ This is now triggered by user gesture
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("App installed successfully ✅");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-white border shadow-xl p-4 rounded-2xl flex items-center gap-3 animate-slide-up">
      <div>
        <p className="text-gray-800 font-medium">Install Socially?</p>
        <p className="text-sm text-gray-500">
          Get quicker access and an app-like experience.
        </p>
      </div>
      <button
        onClick={handleInstall}
        className="bg-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-purple-700 transition"
      >
        Install
      </button>
    </div>
  );
}
