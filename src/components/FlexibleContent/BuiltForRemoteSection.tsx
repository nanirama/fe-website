import Image from "next/image";
import { ButtonComponent } from "../ButtonComponent";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type Tag = {
  icon?: { alt?: string; url?: string } | null;
  label?: string;
};

type BuiltForRemoteSectionData = {
  heading?: string;
  description?: string;
  tags?: Tag[];
  primaryButton?: CmsButton;
  statementLines?: string[];
};

type Props = {
  data?: BuiltForRemoteSectionData;
  page?: string;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

export default function BuiltForRemoteSection({ data }: Props) {
  const heading = data?.heading?.trim();
  const description = data?.description?.trim();
  const tags = data?.tags?.filter((t) => t?.label?.trim()) ?? [];
  const statementLines = data?.statementLines?.filter((l) => l?.trim()) ?? [];
  const primaryHref = isValidHref(data?.primaryButton?.url) ? data.primaryButton.url.trim() : "";
  const primaryLabel = data?.primaryButton?.label?.trim() || "";

  return (
    <section className="w-full bg-[#162a4a] py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 globe_img relative">
        <div className="mx-auto text-center">
          {heading ? (
            <h2 className="font-manrope text-balance text-2xl font-semibold leading-[1.1] tracking-tight text-white lg:text-3xl">
              {heading}
            </h2>
          ) : null}

          {description ? (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/65">
              {description}
            </p>
          ) : null}

          {tags.length > 0 && (
            <ul className="mt-14 flex flex-col lg:flex-row justify-center gap-5" aria-label="Feature tags">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 flex-1 items-center rounded-lg bg-[#2d3f5c] px-4.5 py-3 text-sm text-white"
                >
                  {tag.icon?.url ? (
                    <Image
                      src={tag.icon.url}
                      alt={tag.icon.alt?.trim() || ""}
                      width={19}
                      height={19}
                      className="h-[19px] w-[19px] object-contain"
                    />
                  ) : null}
                  <span>{tag.label?.trim()}</span>
                </li>
              ))}
            </ul>
          )}

          {primaryLabel ? (
            <div className="mt-14">
              <ButtonComponent
                href={primaryHref || "#"}
                variant="primary"
                className="min-h-11 rounded-full px-6 py-2.5 text-sm"
              >
                {primaryLabel}
              </ButtonComponent>
            </div>
          ) : null}
        </div>

        {statementLines.length > 0 && (
          <div className="sm:mt-60 mt-28 space-y-1 pb-40">
            {statementLines.map((line, index) => (
              <p
                key={index}
                className="font-manrope text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-6xl text-center"
              >
                {line.trim()}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
