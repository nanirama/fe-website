import { useEffect, useRef, useState } from "react";

interface HubSpotFormConfig {
  portalId: string;
  formId: string;
  region?: string;
  targetId: string;
  onFormReady?: () => void;
  onFormSubmit?: () => void;
  onFormSubmitted?: () => void;
}

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: object) => void;
      };
    };
  }
}

export const useHubSpotForm = ({
  portalId,
  formId,
  region = "na1",
  targetId,
  onFormReady,
  onFormSubmit,
  onFormSubmitted,
}: HubSpotFormConfig) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    const initForm = () => {
      if (!window.hbspt) return;

      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${targetId}`,
        cssRequired: "",       // Disable HubSpot's default CSS
        cssClass: "hs-custom", // Hook for our overrides
        onFormReady: () => {
          setIsLoaded(true);
          onFormReady?.();
        },
        onFormSubmit: () => {
          onFormSubmit?.();
        },
        onFormSubmitted: () => {
          setIsSubmitted(true);
          onFormSubmitted?.();
        },
      });
    };

    // If script already exists globally (e.g. hot reload), init directly
    if (window.hbspt) {
      initForm();
      return;
    }

    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/v2.js";
    script.defer = true;

    script.onload = () => initForm();
    script.onerror = () => setError("Failed to load HubSpot script.");

    document.head.appendChild(script);
  }, [formId, portalId, region, targetId]);

  return { isLoaded, isSubmitted, error };
};