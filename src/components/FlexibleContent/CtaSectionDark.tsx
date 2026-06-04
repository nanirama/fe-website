import Link from "next/link";
import { ButtonComponent } from "../ButtonComponent";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Button {
  label?: string;
  url?: string | null;
  openInNewTab?: boolean;
}

interface Props {
  data?: {
    heading?: string;
    primaryButton?: Button;
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CtaSectionDark({ data }: Props) {
  const heading = data?.heading?.trim() ?? "";
  const primaryButton = data?.primaryButton;
  const href = primaryButton?.url?.trim();
  const label = primaryButton?.label?.trim();

  if (!heading) return null;

  return (
    <section aria-labelledby="cta-dark-heading" className="w-full mx-auto px-4 py-6 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative mx-4  overflow-hidden rounded-2xl px-4 py-12 sm:py-16 text-center bg-brand"
        //style={{ background: "linear-gradient(135deg, #0f2a4a 0%, #1a3d6b 50%, #0f2a4a 100%)" }}
        >
      

          <div className="absolute -top-15 right-20 bg-[url('/images/ctadark-bg1.png')] bg-no-repeat bg-contain z-30 w-[300px] h-[100%] " />
          <div className="absolute -bottom-36 left-20 bg-[url('/images/ctadark-bg1.png')] bg-no-repeat bg-contain z-30 w-[300px] h-[100%] " />

          {/* Grid texture overlay */}
          {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        /> */}

          {/* Top highlight edge */}
          {/* <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(99,179,237,0.4), transparent)" }}
        /> */}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-7 sm:gap-8">
            <h2
              id="cta-dark-heading"
              className="max-w-2xl text-2xl md:text-[54px] font-manrope font-semibold leading-tight tracking-tight text-white "
            >
              {heading}
            </h2>
            {href && label && (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[14px]">
              <ButtonComponent variant="secondarywhite" className="w-full sm:w-auto" href={href}>
                {label}
              </ButtonComponent>
            </div>
            )}

            {/* {href && label && (
              <Link
                href={href}
                {...(primaryButton?.openInNewTab
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {label}
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
