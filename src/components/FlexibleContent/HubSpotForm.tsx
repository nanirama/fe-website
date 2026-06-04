"use client";
import { useEffect } from "react";

interface HubSpotFormProps {
    portalId?: string;
    formId?: string;
    region?: string;
    title?: string;
    description?: string;
    className?: string;
    onFormReady?: () => void;
    onFormSubmit?: () => void;
    onFormSubmitted?: () => void;
    minHeight?: string;
}

export default function HubSpotForm({
    portalId = "2624857",
    formId = "61452c30-12dd-4372-a75a-0028d217d919",
    region = "na1",
    title,
    description,
    minHeight = "520px",
}: HubSpotFormProps) {
    useEffect(() => {
        const loadForm = () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region,
                    portalId,
                    formId,
                    target: "#hubspot-form-container",
                    cssClass: "fe-hubspot-form",
                    css: `
                        .hs-input {
                            width: 100% !important;
                            padding: 0.75rem 1rem !important;
                            border: none !important;
                            border-radius: 0.5rem !important;
                            font-size: 0.875rem !important;
                            background-color: #ffffff !important;
                            color: #020210 !important;
                            box-shadow: 0 0 0 1px #e2e8f0 !important;
                            outline: none !important;
                            transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) !important;
                            box-sizing: border-box !important;
                        }
                        .hs-input::placeholder {
                            color: rgba(2, 2, 16, 0.4) !important;
                        }
                        .hs-input:focus {
                            outline: none !important;
                            box-shadow: 0 0 0 2px #13A89E !important;
                        }
                        textarea.hs-input {
                            min-height: 80px !important;
                            resize: vertical !important;
                        }
                        .hs-form-field {
                            margin-bottom: 0.75rem !important;
                        }
                        .hs-form-field label {
                            color: #374151 !important;
                            font-weight: 500 !important;
                            margin-bottom: 0.375rem !important;
                            display: block !important;
                            font-size: 1rem !important;
                        }
                        .hs-button {
                            background-color: #020210 !important;
                            color: #ffffff !important;
                            cursor: pointer !important;
                            display: inline-flex !important;
                            align-items: center !important;
                            justify-content: center !important;
                            line-height: 1 !important;
                            font-weight: 600 !important;
                            border-radius: 9999px !important;
                            padding: 1rem !important;
                            font-size: 0.875rem !important;
                            border: none !important;
                            transition: background-color 0.2s ease, transform 0.2s ease !important;
                            width: 100% !important;
                            margin-top: 1rem !important;
                        }
                        .hs-button:hover {
                            background-color: rgba(2, 2, 16, 0.85) !important;
                        }
                        .hs-button:active {
                            transform: scale(0.98) !important;
                        }
                        .hs-error-msgs, .hs-error-msg {
                            color: #ef4444 !important;
                            font-size: 13px !important;
                        }
                    `,
                });
            }
        };

        if (!window.hbspt) {
            const script = document.createElement("script");
            script.src = "https://js.hsforms.net/forms/embed/v2.js";
            script.async = true;
            script.onload = loadForm;
            document.body.appendChild(script);
        } else {
            loadForm();
        }
    }, [portalId, formId, region]);

    return (
        <div className="min-w-0 rounded-2xl bg-[#F0F2F5] p-6 sm:p-8 hs-custom mt-7 space-y-5">
            {(title || description) && (
                <div>
                    {title && (
                        <h2 className="text-2xl font-bold text-[#020210] sm:text-3xl">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-sm text-gray-500">{description}</p>
                    )}
                </div>
            )}
            <div
                id="hubspot-form-container"
                className={`hubspot-form-wrapper w-full min-h-[${minHeight}]`}
            />
        </div>
    );
}
