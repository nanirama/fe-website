"use client";

import { useEffect } from "react";

const EVENTS: (keyof WindowEventMap)[] = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
  "click",
];

// Inject the HubSpot chat script only after the first user interaction.
// This prevents the __cf_bm (Cloudflare Bot Management) third-party cookie
// from being set on initial page load — it only appears when the user
// actually begins interacting with the page, which is when the chat widget
// becomes relevant anyway.
export default function HubSpotChat({ portalId }: { portalId: string }) {
  useEffect(() => {
    let loaded = false;

    function load() {
      if (loaded) return;
      loaded = true;

      EVENTS.forEach((e) => window.removeEventListener(e, load));

      const script = document.createElement("script");
      script.id = "hs-script-loader";
      script.src = `https://js.hs-scripts.com/${portalId}.js`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    EVENTS.forEach((e) => window.addEventListener(e, load, { passive: true, once: true }));

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, load));
    };
  }, [portalId]);

  return null;
}
