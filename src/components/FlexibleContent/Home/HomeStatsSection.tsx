'use client'

type StatItem = {
    value?: string;
    label?: string;
};

type StatsSectionData = {
    stats?: StatItem[];
    /** Sanity dropdown: e.g. #ffffff | #ebeff4 */
    background?: string;
};

const SANITY_HEX_BG = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const fallbackStats: StatItem[] = [
    { value: "2-3x Faster", label: "Ticket-to-invoice" },
    { value: "60-80%", label: "Less double entry" },
    { value: "Weeks, Not Quarters", label: "To Go-Live" },
];



const HomeStatsSection = ({ data, page }: { data?: StatsSectionData, page?: string }) => {
    const stats = Array.isArray(data?.stats) && data.stats.length > 0 ? data.stats : fallbackStats;

    let isHome = false;
    if(stats.length === 3){
        isHome = true;
    }


    const rawBg = data?.background?.trim();
    const backgroundColor =
        rawBg && SANITY_HEX_BG.test(rawBg) ? rawBg : null;

    return (
        <div
            className={`md:py-16 py-8 ${backgroundColor ? "" : "bg-white"} ${page==='home' ? "mt-4" : "mt-8"}`}
            style={backgroundColor ? { backgroundColor } : undefined}
        >
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="sr-only">Key results</h2>
                <div
                    className={`grid gap-4 items-start ${isHome ? "md:grid-cols-3 py-5" : "md:grid-cols-4 pt-6 pb-0"
                        }`}
                >
                    {stats.map((item, index) => (
                        <div key={`${item.value || "stat"}-${index}`} className="flex flex-col gap-2 border-l border-[#13A89E] pl-4">
                            <p className={`text-[#020210] font-semibold text-3xl leading-[110%]  ${isHome ? "lg:text-[42px]" : "text-3xl"}`}>{item.value || ""}</p>
                            <p className={`text-[18px] text-[#020210]/70 text-base leading-[150%] font-normal ${isHome ? "lg:text-[18px]" : "text-base"}`}>{item.label || ""}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default HomeStatsSection