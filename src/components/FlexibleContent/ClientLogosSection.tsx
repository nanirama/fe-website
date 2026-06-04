"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSlickSlideFocusFix } from "@/src/hooks/useSlickSlideFocusFix";

type Logo = {
    link?: string;
    logo?: {
        alt?: string;
        url?: string;
    };
};

type ClientLogosSectionData = {
    logos?: Logo[];
};

const fallbackLogos: Logo[] = [
    { logo: { url: "/images/logo1.webp", alt: "Client 1" } },
    { logo: { url: "/images/logo2.webp", alt: "Client 2" } },
    { logo: { url: "/images/logo3.webp", alt: "Client 3" } },
    { logo: { url: "/images/logo4.webp", alt: "Client 4" } },
    { logo: { url: "/images/logo5.webp", alt: "Client 5" } },
    { logo: { url: "/images/logo6.webp", alt: "Client 6" } },
    { logo: { url: "/images/logo7.webp", alt: "Client 7" } },
    { logo: { url: "/images/logo8.webp", alt: "Client 8" } },
    { logo: { url: "/images/logo9.webp", alt: "Client 9" } },
];

const ClientLogosSection = ({ data }: { data?: ClientLogosSectionData }) => {
    const logos = Array.isArray(data?.logos) && data.logos.length > 0 ? data.logos : fallbackLogos;

    const slickWrapRef = useRef<HTMLDivElement>(null);
    const { onInit, onReInit, afterChange } = useSlickSlideFocusFix(slickWrapRef);

    const settings = useMemo(
        () => ({
        infinite: true,
        slidesToShow: 9,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 0, // 🔥 key for continuous
        speed: 5000, // 🔥 controls smooth flow
        cssEase: "linear", // 🔥 no easing = constant speed
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 3 },
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 2 },
            },
        ],
        onInit,
        onReInit,
        afterChange,
    }),
        [onInit, onReInit, afterChange],
    );

    return (
        <>
            <div className="w-full sm:pt-16 pt-10 pb-4" ref={slickWrapRef}>
                <Slider {...settings}>
                    {logos.concat(logos).map((logo, index) => (
                        <div key={index} className="px-4">
                            <div className="flex items-center justify-center h-16">
                                {logo.logo?.url ? (
                                    logo.link ? (
                                        <Link href={logo.link} target="_blank" rel="noreferrer noopener">
                                            <Image
                                                src={logo.logo.url}
                                                alt={logo.logo.alt || "client-logo"}
                                                width={160}
                                                height={40}
                                                className="object-contain grayscale opacity-70 hover:opacity-100 transition w-auto h-auto"
                                            />
                                        </Link>
                                    ) : (
                                        <Image
                                            src={logo.logo.url}
                                            alt={logo.logo.alt || "client-logo"}
                                            width={160}
                                            height={40}
                                            className="object-contain grayscale opacity-70 hover:opacity-100 transition w-auto h-auto"
                                        />
                                    )
                                ) : null}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    )
}
export default ClientLogosSection;