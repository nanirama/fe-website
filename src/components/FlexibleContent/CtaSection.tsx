import { ButtonComponent } from "../ButtonComponent"
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

type CtaButton = {
    label?: string;
    url?: string;
    buttonType?:
        | "primary"
        | "secondary"
        | "primaryBlack"
        | "secondarywhite"
        | "secondarytrnsparentWhiteBorder";
};

type CtaTheme = "tealGradient" | "light" | "dark";

type CtaSectionData = {
    theme?: string;
    headline?: PortableTextBlock[];
    description?: PortableTextBlock[];
    buttons?: CtaButton[];
    buttonPosition?: "left" | "center" | "right";
    sideContent?: PortableTextBlock[];
};

function resolveCtaTheme(raw?: string): CtaTheme {
    const t = (raw ?? "tealGradient").toLowerCase().replace(/\s+/g, "");
    if (t === "light" || t === "white") return "light";
    if (t === "dark" || t === "navy") return "dark";
    if (t === "tealgradient" || t === "teal" || t === "brand" || t === "gradient") return "tealGradient";
    return "tealGradient";
}

const CtaSection = ({ data, page  }: { data?: CtaSectionData, page?: string }) => {

    const ctaTheme = resolveCtaTheme(data?.theme);
    const headline = data?.headline?.length
        ? data.headline
        : [
            {
                _type: "block",
                children: [{ _type: "span", text: "Every Billing Cycle You Wait is Revenue You've Already Lost" }],
            },
        ];

    const description = data?.description?.length
        ? data.description
        : [
            {
                _type: "block",
                children: [{ _type: "span", text: "The gap between your field and your books has a dollar amount. It lives in your DSO, your disputed invoices, and the AR your team is managing right now." }],
            },
        ];

    const sideContent = data?.sideContent?.length
        ? data.sideContent
        : [
            {
                _type: "block",
                children: [{ _type: "span", text: "One partner. No hand-offs. Go-lives measured in weeks, not quarters." }],
            },
        ];

    const buttons = data?.buttons?.filter((button) => button?.label) ?? [];
    const buttonAlign =
        data?.buttonPosition === "center"
            ? "justify-start sm:justify-center"
            : data?.buttonPosition === "right"
                ? "justify-start sm:justify-end"
                : "justify-start";

    const outerClass =
        ctaTheme === "light"
            ? "w-full bg-white py-10 sm:py-12 lg:py-24"
            : ctaTheme === "dark"
              ? "w-full bg-brand py-10 sm:py-12 lg:py-24"
              : "w-full bg-white py-10 sm:py-12 lg:py-12"

    const innerClass =
        ctaTheme === "light"
            ? "relative overflow-hidden rounded-2xl bg-[radial-gradient(68.82%_68.82%_at_50%_92.75%,#75E8E0_0%,#13A89E_100%)] p-6 sm:p-8 md:p-12 lg:rounded-[24px] lg:px-16 lg:py-10"
            : "relative overflow-hidden rounded-2xl bg-[radial-gradient(68.82%_68.82%_at_50%_92.75%,#75E8E0_0%,#13A89E_100%)] p-6 sm:p-8 md:p-12 lg:rounded-[24px] lg:px-16 lg:py-10";

    const headlineClass =
        ctaTheme === "light"
            ? "text-balance text-2xl font-semibold leading-[110%] text-white sm:text-3xl md:text-4xl xl:text-[42px]"
            : "text-balance text-2xl font-semibold leading-[110%] text-white sm:text-3xl md:text-4xl xl:text-[42px]";

    const bodyClass =
        ctaTheme === "light"
            ? "md:mt-6 mt-2 text-base leading-[150%] text-white sm:text-lg"
            : "md:mt-6 mt-2 text-base leading-[150%] text-white sm:text-lg";

    const sideClass =
        ctaTheme === "light"
            ? "text-base font-bold leading-[150%] text-white sm:text-lg"
            : "text-base font-bold leading-[150%] text-white sm:text-lg";

    const decorOpacity = ctaTheme === "light" ? "opacity-40 sm:opacity-50" : "opacity-40 sm:opacity-50";
    const cornerOpacity = ctaTheme === "light" ? "" : "";

 

    return (
        <>
            <div className={outerClass}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className={innerClass}>
                        {ctaTheme !== "light" ? (
                            <div
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px] opacity-40"
                                aria-hidden
                            />
                        ) : (
                            <div
                                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[length:22px_22px] opacity-60"
                                aria-hidden
                            />
                        )}
                        <div
                            className={`pointer-events-none absolute inset-0 bg-[url('/images/cta-shadebg.png')] bg-cover bg-center ${decorOpacity}`}
                            aria-hidden
                        />
                        <div
                            className={`pointer-events-none absolute right-0 top-0 hidden h-[200px] w-[40%] max-w-[180px] bg-[url('/images/cta-shade1.png')] bg-cover bg-no-repeat sm:block md:h-[291px] md:max-w-none md:w-[25%] ${cornerOpacity}`}
                            aria-hidden
                        />
                        <div
                            className={`pointer-events-none absolute left-0 top-0 hidden h-[200px] w-[40%] max-w-[180px] bg-[url('/images/cta-shade2.png')] bg-cover bg-no-repeat sm:left-[5%] sm:block md:h-[291px] md:max-w-none md:w-[25%] ${cornerOpacity}`}
                            aria-hidden
                        />
                        <div className="relative z-10 grid grid-cols-1 gap-4 sm:gap-8 lg:mb-6 lg:grid-cols-2 lg:items-center lg:gap-6">
                            <div className={headlineClass}>
                                <PortableText value={headline} />
                                {data?.buttonPosition === "left" && page !=='home' && (
                                    <div className="my-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[14px]">
                                        {buttons.map((button, index) => (
                                            <ButtonComponent
                                                key={`${button.label}-${index}`}
                                                href={button.url}
                                                variant={button.buttonType || "primaryBlack"}
                                                className="w-full shrink-0 sm:w-auto"
                                            >
                                                {button.label}
                                            </ButtonComponent>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className={bodyClass}>
                                <PortableText value={description} />
                                 {/* <PortableText value={sideContent} /> */}
                                {data?.buttonPosition === "right"  && (
                                    <div className="my-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[14px]">
                                        {buttons.map((button, index) => (
                                            <ButtonComponent
                                                key={`${button.label}-${index}`}
                                                href={button.url}
                                                variant={button.buttonType || "primaryBlack"}
                                                className="w-full shrink-0 sm:w-auto"
                                            >
                                                {button.label}
                                            </ButtonComponent>
                                        ))}
                                    </div>
                                )}
                                  
                            </div>
                        </div>
                        {page ==='home' && (
                            <div className={`relative z-10 mt-6 grid grid-cols-1 gap-6 border-t pt-6 sm:mt-8 sm:gap-8 sm:pt-8 lg:grid-cols-2 lg:items-end lg:gap-6 ${ctaTheme === "light" ? "border-slate-200/90" : "border-white/20"}`}>
                            <div
                                className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[14px] ${buttonAlign}`}
                            >
                                {buttons.map((button, index) => (
                                    <ButtonComponent
                                        key={`${button.label}-${index}`}
                                        href={button.url}
                                        variant={button.buttonType || "primaryBlack"}
                                        className="w-full shrink-0 sm:w-auto"
                                    >
                                        {button.label}
                                    </ButtonComponent>
                                ))}
                            </div>
                            <div className={sideClass}>
                                <PortableText value={sideContent} />
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CtaSection