"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSlickSlideFocusFix } from "@/src/hooks/useSlickSlideFocusFix";

type CaseStudy = {
    desc: string;
    quote: string;
    stat1: string;
    stat2: string;
    stat3: string;
    company: string;
};

const caseStudies: CaseStudy[] = [
    {
        desc:
            "A multi-division industrial services operation was running manual dispatch, paper-based field tickets, and disconnected billing across four business units. After deploying FieldEquip with native Sage Intacct integration.",
        quote:
            "FieldEquip is an indispensable tool we use for every aspect of our business, from field ticketing and invoicing to revenue reporting and customer data delivery.",
        stat1:
            "Less manual data entry",
        stat2:
            "Faster ticket-to-invoice",
        stat3:
            "Multi-division industrial services  |  Sage Intacct ERP  |  200+ field users",
        company:
            "Multi-division industrial services  |  Sage Intacct ERP  |  200+ field users",
    },
    {
        desc:
            "A multi-division industrial services operation was running manual dispatch, paper-based field tickets, and disconnected billing across four business units. After deploying FieldEquip with native Sage Intacct integration.",
        quote:
            "FieldEquip is an indispensable tool we use for every aspect of our business, from field ticketing and invoicing to revenue reporting and customer data delivery.",
        stat1:
            "Less manual data entry",
        stat2:
            "Faster ticket-to-invoice",
        stat3:
            "Multi-division industrial services  |  Sage Intacct ERP  |  200+ field users",
        company:
            "Multi-division industrial services  |  Sage Intacct ERP  |  200+ field users",
    },

];

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

export default function CaseStudyTwoSection() {
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
        onInit,
        onReInit,
        afterChange,
    }),
        [onInit, onReInit, afterChange],
    );

    return (
        <section
            className="relative w-full pt-8 pb-24 vector_bg">
            <div className="mx-auto max-w-[1240px] px-4 border-t border-[#162A4A]/20 pt-16 blue-bg">

                {/* Heading */}
                <h2 id="case-study-heading" className="text-[32px] sm:text-[42px] font-semibold leading-[110%] text-[#020210]">Proven in the Field</h2>
                {/* Slider */}
                <div className="mt-16" ref={slickWrapRef}>
                    <Slider {...settings}>
                        {caseStudies.map((item, index) => (
                            <div key={index} className="px-2 sm:px-4">
                                <div className="grid gap-6 lg:grid-cols-3">

                                    {/* Left */}
                                    <div className="bg-white px-[32px] py-[42px] shadow-sm flex flex-col justify-between rounded-[14px]">
                                        <div>
                                            <Image src={'/images/sage.webp'} width={160} height={40} alt="sage" className="w-[160px] h-[40px]" />
                                        </div>
                                        <div className="flex flex-col gap-[42px]">
                                            <p className="leading-[130%] text-[#191921]">{item.desc}</p>
                                            <div className="border-l-2 pl-[14px] border-[#13A89E]">
                                                <div className="flex flex-row gap-[14px] py-1">
                                                    <h4 className="leading-[100%] text-2xl font-semibold text-[#191921]">70%</h4>
                                                    <p className="text-[#191921] leading-[130%]">{item.stat1}</p>
                                                </div>
                                                <div className="flex flex-row gap-[14px] py-1">
                                                    <h4 className="leading-[100%] text-2xl font-semibold text-[#191921]">3x</h4>
                                                    <p className="text-[#191921] leading-[130%]">{item.stat1}</p>
                                                </div>
                                                <div className="flex flex-row gap-[14px] py-1">
                                                    <h4 className="leading-[100%] text-2xl font-semibold text-[#191921]">40%</h4>
                                                    <p className="text-[#191921] leading-[130%]">{item.stat1}</p>
                                                </div>
                                            </div>
                                            <Link href="/" className="mt-3 text-sm sm:text-base text-[#13A89E] underline">Read the Whole Case Study →</Link>
                                        </div>
                                    </div>

                                    {/* Middle */}
                                    <div>
                                        <Image
                                            src={'/images/case-stydy-img.png'}
                                            width={398}
                                            height={560}
                                            alt="case-study-img"
                                            className="w-[398px] h-[560px] rounded-[14px]"
                                            sizes="(max-width: 640px) 100vw,
                                                        (max-width: 768px) 100vw,
                                                        (max-width: 1024px) 90vw,
                                                        (max-width: 1366px) 690px,
                                                        690px"/>
                                    </div>

                                    {/* Right */}
                                    <div className="bg-white px-[32px] pb-[42px] shadow-sm flex flex-col justify-between rounded-[14px]">
                                        <div className="flex justify-end">
                                            <Image src={'/images/“.webp'} alt="quotation" width={188} height={167} className="w-[188px]" />
                                        </div>
                                        <h3 className="text-lg sm:text-2xl max-w-[333px] font-semibold text-[#020210]">{item.quote}</h3>
                                        <p className="text-sm sm:text-base text-[#191921]">{item.company}</p>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
        </section>
    );
}