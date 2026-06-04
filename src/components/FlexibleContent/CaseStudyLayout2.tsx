"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { urlForImage } from "@/src/sanity/lib/utils";
import { useSlickSlideFocusFix } from "@/src/hooks/useSlickSlideFocusFix";

export type CaseStudy = {
    slug?: string | null;
    desc?: string | null;
    quote?: string | null;
    statistics?: { label?: string; value?: string }[];
    company?: string | null;
    logoimage?: object | null;
    image?: object | null;
};

export type CaseStudyLayout2Props = {
    heading?: string;
    caseStudies?: CaseStudy[];
};
const NextArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
        <div className="absolute -top-24 right-6 w-[54px] h-[34px] group bg-[#E1E9F1] hover:bg-[#13A89E] hover:text-white rounded-[37px] cursor-pointer z-[9999] flex items-center justify-center" onClick={onClick}>
            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" className="rotate-[180deg]" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.73038 11.55L1.04656 6.866C0.952538 6.77198 0.877957 6.66036 0.827073 6.53752C0.77619 6.41468 0.75 6.28301 0.75 6.15005C0.75 6.01709 0.77619 5.88542 0.827073 5.76258C0.877957 5.63974 0.952538 5.52812 1.04656 5.4341L5.73061 0.75005" stroke="#020210" className="group-hover:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

const PrevArrow = (props: { onClick?: () => void }) => {
    const { onClick } = props;
    return (
        <div className="absolute -top-24 right-22 w-[54px] h-[34px] group bg-[#E1E9F1] hover:bg-[#13A89E] rounded-[37px] cursor-pointer z-[9999] flex items-center justify-center" onClick={onClick}>
            <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.73038 11.55L1.04656 6.866C0.952538 6.77198 0.877957 6.66036 0.827073 6.53752C0.77619 6.41468 0.75 6.28301 0.75 6.15005C0.75 6.01709 0.77619 5.88542 0.827073 5.76258C0.877957 5.63974 0.952538 5.52812 1.04656 5.4341L5.73061 0.75005" stroke="#020210" className="group-hover:stroke-white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
};

export default function CaseStudyLayout2({
    heading = "Proven in the Field",
    caseStudies: caseStudiesProp,
}: CaseStudyLayout2Props = {}) {
    const caseStudies =
        caseStudiesProp && caseStudiesProp.length > 0
            ? caseStudiesProp
            : defaultCaseStudies;

    const slickWrapRef = useRef<HTMLDivElement>(null);
    const { onInit, onReInit, afterChange } = useSlickSlideFocusFix(slickWrapRef);

    const settings = useMemo(
        () => ({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 600,
            pauseOnHover: true,
            adaptiveHeight: true,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 568,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ],
            onInit,
            onReInit,
            afterChange,
        }),
        [onInit, onReInit, afterChange],
    );

    return (
        <section
            className="relative w-full pt-8 lg:pb-24 pb-8 overflow-hidden"
        >
            <div className="absolute top-52 right-[23%] bg-[url('/images/casestudy2-shade1.png')] bg-no-repeat bg-contain z-40 w-[340px] h-[300px] " />

            {/* <div className="absolute top-52 left-[23%]  bg-[url('/images/casestudy2-shade1.png')] bg-no-repeat bg-contain z-40 w-[340px] h-[300px] " /> */}
            <div className="blur-[300px] overflow-hidden pointer-events-none bg-[radial-gradient(ellipse_55%_50%_at_72%_38%,#1a4d2e_0%,#0d2e1a_40%,transparent_70%)] absolute top-52 left-[23%] bg-no-repeat bg-contain z-40 w-[340px] h-[300px]" />

            {/* <div className="absolute -bottom-10 right-[0%] bg-[url('/images/casestudy2-shade2.png')] bg-no-repeat bg-cover z-1 w-[100%] h-[700px]" /> */}
            <div className="absolute -bottom-10 right-[0%] blur-[100px] overflow-hidden pointer-events-none opacity-40 bg-[radial-gradient(ellipse_65%_55%_at_78%_42%,#9bff9b_0%,#9aff9a_30%,#9bff9b_55%,transparent_72%)] bg-no-repeat bg-cover z-1 w-[800px] h-[300px] border border-red-600" />

            {/* <div className="absolute top-10 left-[15%] bg-[url('/images/casestudy2-shade3.png')] bg-no-repeat bg-contain z-1 w-[1100px] h-[600px]  rotate-[33.87deg] transform" /> */}
            <div className="blur-[400px] overflow-hidden pointer-events-none absolute top-10 left-[15%] opacity-40 bg-[radial-gradient(ellipse_45%_45%_at_48%_45%,#9cff9c_0%,#a1ffa1_45%,transparent_70%)] bg-no-repeat bg-contain z-1 w-[1100px] h-[600px]  rotate-[33.87deg] transform" />

            {/* <div className="absolute -bottom-60 left-[0%] bg-[url('/images/casestudy2-shade4.png')] bg-no-repeat bg-contain z-1 w-[690px] h-[870px]   " /> */}
            <div className="blur-[60px] overflow-hidden pointer-events-none absolute -bottom-60 left-[-1%] opacity-25 bg-[radial-gradient(ellipse_60%_40%_at_25%_45%,#5d9cff_0%,#619eff_45%,transparent_70%)] bg-no-repeat bg-contain z-1 w-[690px] h-[870px]   " />

            {/* <div className="absolute top-40 left-[28%] bg-[url('/images/casestudy2-shade5.png')] bg-no-repeat bg-cover z-1 w-[46%] h-[600px] rotate-[-20.87deg] " /> */}
            <div className="absolute top-40 left-[28%] blur-[60px] overflow-hidden pointer-events-none opacity-30 bg-[radial-gradient(ellipse_55%_50%_at_42%_48%,#5e9bff_0%,#5d9bff_25%,#5a98ff_50%,transparent_72%)] bg-no-repeat bg-cover z-1 w-[46%] h-[600px] rotate-[-20.87deg] " />

            <div className="mx-auto max-w-7xl px-4 border-t border-[#162A4A]/20 pt-16 blue-bg z-40 relative">
                {/* Heading */}
                <h2 id="case-study-heading" className="text-[32px] sm:text-[42px] font-semibold leading-[110%] text-[#020210]">{heading}</h2>

                {/* Slider */}
                <div className="mt-16" ref={slickWrapRef}>
                    <Slider {...settings}>
                        {caseStudies.map((item: any, index: number) => {
                           return(
                            <div key={item.slug ?? index} className="px-2 sm:px-4">
                                <div className="grid gap-6 md:grid-cols-3">

                                    {/* Left */}
                                    <div className="bg-white px-[32px] lg:max-w-[397px] shadow-[0_13px_32px_-2px_#3C5B8D1A] border-0 w-full py-[42px] shadow-sm flex flex-col justify-between rounded-[14px]">
                                        <div className="relative h-10 max-w-[180px]">
                                            {(() => {
                                                const logo = item.logoimage as ({ alt?: string } & Parameters<typeof urlForImage>[0]) | null | undefined;
                                                const logoSrc = logo ? urlForImage(logo)?.width(360).height(80).fit("max").format("webp").url() : null;
                                                return logoSrc ? (
                                                    <Image
                                                        src={logoSrc}
                                                        fill
                                                        alt={logo?.alt?.trim() || "logo"}
                                                        className="object-contain object-left"
                                                    />
                                                ) : null;
                                            })()}
                                        </div>
                                        <div className="flex flex-col gap-[42px]">
                                            <p className="leading-[140%] text-[#191921] text-base w-full">{item.desc ?? ""}</p>
                                            <div className="border-l-2 pl-[14px] border-[#13A89E]">
                                                {(item.statistics ?? []).slice(0, 3).map((stat, i) => (
                                                    <div key={i} className="flex flex-row gap-4 py-1">
                                                        <p className="text-[#191921] leading-[130%] w-[60%]">{stat.label ?? ""}</p>
                                                        <h4 className="leading-[100%] text-xl font-semibold text-[#191921] w-[40%]">{stat.value ?? ""}</h4>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link href={item.slug?.trim() ? `/case-study/${item.slug.trim()}` : "/case-studies"} className="mt-3 text-sm sm:text-base text-[#13A89E] underline">Read the Whole Case Study →</Link>
                                        </div>
                                    </div>

                                    {/* Middle */}
                                    <div>
                                        {item.image && (
                                            <Image
                                                src={urlForImage(item.image)?.url() || ""}
                                                width={398}
                                                height={560}
                                                alt={item.company ?? "case-study-img"}
                                                className="lg:w-[398px] lg:h-[560px] w-full rounded-[14px] object-cover"
                                            />
                                        )}
                                        {/* <Image src={'/images/casestudy-img.webp'} width={398} height={560} alt="case-study-img" className="lg:w-[398px] lg:h-[560px] w-full rounded-[14px]" /> */}
                                    </div>

                                    <div className="bg-white px-[32px] lg:max-w-[397px] w-full pb-[42px] shadow-sm flex flex-col justify-between rounded-[14px]">
                                        <div className="flex justify-end">
                                            <Image src={'/images/“.webp'} alt="quotation" width={188} height={167} className="w-[188px]" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl max-w-[333px] leading-[130%] font-semibold mb-4 text-[#020210]">{item.quote ?? ""}</h3>
                                        <p className="text-sm sm:text-base text-[#191921]">{item.company ?? ""}</p>
                                    </div>

                                </div>
                            </div>
                        )})}
                    </Slider>
                </div>

            </div>
        </section>
    );
}
