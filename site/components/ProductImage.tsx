import Image from "next/image";

type ProductImageProps = {
  alt: string;
  src: string;
};

export function ProductImage({ alt, src }: ProductImageProps) {
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
