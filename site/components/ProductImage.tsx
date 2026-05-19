import Image from "next/image";

type ProductImageProps = {
  alt: string;
  accent?: string;
  windowLabel?: string;
  src: string;
};

export function ProductImage({ accent, alt, src, windowLabel }: ProductImageProps) {
  if (accent && windowLabel) {
    return <ProductPackageMockup accent={accent} name={alt} windowLabel={windowLabel} />;
  }

  const isImageAsset = src.startsWith("/") || src.startsWith("https://");

  return (
    <div className="product-data-card__media">
      {isImageAsset ? (
        <Image
          alt={alt}
          className="product-data-card__image"
          height={780}
          sizes="(max-width: 820px) 100vw, 50vw"
          src={src}
          width={1040}
        />
      ) : (
        <span>{src}</span>
      )}
    </div>
  );
}

type ProductPackageMockupProps = {
  accent: string;
  name: string;
  windowLabel: string;
};

function ProductPackageMockup({ accent, name, windowLabel }: ProductPackageMockupProps) {
  const productLabel = formatProductLabel(name);
  const titleId = `package-${slugify(productLabel)}-${slugify(windowLabel)}`;
  const gradientId = `${titleId}-gradient`;
  const highlightId = `${titleId}-highlight`;
  const windowTextSize = windowLabel.length > 4 ? 15 : 18;

  return (
    <div className="product-data-card__media product-data-card__media--mockup">
      <svg
        aria-labelledby={titleId}
        className="package-mockup"
        role="img"
        viewBox="0 0 520 390"
      >
        <title id={titleId}>{name} opaque bottle packaging concept</title>
        <defs>
          <linearGradient id={gradientId} x1="96" x2="416" y1="44" y2="360">
            <stop offset="0" stopColor="#2f3932" />
            <stop offset="0.5" stopColor="#111712" />
            <stop offset="1" stopColor="#050706" />
          </linearGradient>
          <linearGradient id={highlightId} x1="184" x2="336" y1="154" y2="246">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.72" />
            <stop offset="0.44" stopColor={accent} stopOpacity="0.82" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.32" />
          </linearGradient>
        </defs>
        <ellipse cx="260" cy="352" fill="#020403" opacity="0.28" rx="126" ry="20" />
        <rect fill="#0d120f" height="45" rx="9" width="74" x="223" y="18" />
        <rect fill="#1d271f" height="13" rx="4" width="88" x="216" y="50" />
        <path
          d="M174 73c0-13 11-24 24-24h124c13 0 24 11 24 24v38c0 16 9 30 23 38 22 13 36 38 36 66v95c0 26-21 47-47 47H162c-26 0-47-21-47-47v-95c0-28 14-53 36-66 14-8 23-22 23-38V73Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M197 64h44c-24 36-31 77-31 139v118c0 14-9 22-23 22h-24c-18 0-33-15-33-33v-96c0-23 12-44 31-56 21-13 36-36 36-61V64Z"
          fill="#ffffff"
          opacity="0.08"
        />
        <rect
          fill="#f8fbf6"
          height="158"
          rx="22"
          stroke={accent}
          strokeOpacity="0.5"
          strokeWidth="4"
          width="232"
          x="144"
          y="136"
        />
        <text
          fill="#102116"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="24"
          fontWeight="800"
          letterSpacing="2"
          textAnchor="middle"
          x="260"
          y="174"
        >
          SciTOX
        </text>
        <text
          fill="#101510"
          fontFamily="Arial Black, Arial, Helvetica, sans-serif"
          fontSize="48"
          fontWeight="900"
          textAnchor="end"
          x="264"
          y="230"
        >
          DET
        </text>
        <circle
          cx="304"
          cy="212"
          fill={`url(#${highlightId})`}
          r="37"
          stroke="#111712"
          strokeWidth="7"
        />
        <circle cx="293" cy="198" fill="#ffffff" opacity="0.38" r="12" />
        <text
          fill={windowLabel === "COC" ? "#102116" : "#ffffff"}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize={windowTextSize}
          fontWeight="900"
          textAnchor="middle"
          x="304"
          y="218"
        >
          {windowLabel}
        </text>
        <text
          fill="#101510"
          fontFamily="Arial Black, Arial, Helvetica, sans-serif"
          fontSize="48"
          fontWeight="900"
          textAnchor="start"
          x="345"
          y="230"
        >
          X
        </text>
        <rect fill={accent} height="9" rx="4.5" width="136" x="192" y="250" />
        <text
          fill="#334037"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="18"
          fontWeight="800"
          textAnchor="middle"
          x="260"
          y="282"
        >
          {productLabel}
        </text>
      </svg>
    </div>
  );
}

function formatProductLabel(name: string) {
  return name
    .replace(" Hair Follicle Detox Shampoo System", "")
    .replace(" Hair Detox Shampoo System", "")
    .replace(" Hair Detox Shampoo- for ALL TOXINS", "")
    .replace(" Cocaine", "")
    .split(" - ")[0]
    .split(" System-")[0]
    .trim();
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
