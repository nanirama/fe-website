const BlogCta = () => {
    return (
        <div className="w-full bg-brand py-10 sm:py-12 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div
                    className="relative overflow-hidden rounded-2xl bg-[radial-gradient(68.82%_68.82%_at_50%_92.75%,#75E8E0_0%,#13A89E_100%)] p-6 sm:p-8 md:p-12 lg:rounded-[24px] lg:px-16 lg:py-10"
                >
                    <div
                        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px] opacity-40"
                        aria-hidden="true"
                    ></div>
                    <div
                        className="pointer-events-none absolute inset-0 bg-[url('/images/cta-shadebg.png')] bg-cover bg-center opacity-40 sm:opacity-50"
                        aria-hidden="true"
                    ></div>
                    <div
                        className="pointer-events-none absolute right-0 top-0 hidden h-[200px] w-[40%] max-w-[180px] bg-[url('/images/cta-shade1.png')] bg-cover bg-no-repeat sm:block md:h-[291px] md:max-w-none md:w-[25%]"
                        aria-hidden="true"
                    ></div>
                    <div
                        className="pointer-events-none absolute left-0 top-0 hidden h-[200px] w-[40%] max-w-[180px] bg-[url('/images/cta-shade2.png')] bg-cover bg-no-repeat sm:left-[5%] sm:block md:h-[291px] md:max-w-none md:w-[25%]"
                        aria-hidden="true"
                    ></div>
                    <div className="relative z-10 grid grid-cols-1 gap-4 sm:gap-8 lg:mb-6 lg:grid-cols-2 lg:items-center lg:gap-6">
                        <div
                            className="text-balance text-2xl font-semibold leading-[110%] text-white sm:text-3xl md:text-4xl xl:text-[42px]"
                        >
                            <p>Designed for Operations Where Failure Carries a Real Cost.</p>
                        </div>
                        <div className="md:mt-6 mt-4 text-base leading-[150%] text-white sm:text-lg">
                            <p>
                                FieldEquip delivers one platform and one responsible team from implementation through ongoing
                                support, removing the gaps that create delays, errors, and system-level risk.
                            </p>
                            <div className="my-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-[14px]">
                                <a
                                    className="inline-flex items-center justify-center rounded-[31px] px-5 py-3 cursor-pointer text-sm font-semibold leading-[140%] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#162A4A] text-white hover:bg-neutral-800 focus-visible:ring-black w-full shrink-0 sm:w-auto"
                                    href=""
                                >Get a Demo</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default BlogCta