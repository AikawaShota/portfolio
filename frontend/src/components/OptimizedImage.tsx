interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    pictureClassName?: string;
    sizes?: string;
}

export default function OptimizedImage({
    src,
    alt,
    className,
    pictureClassName,
    sizes,
}: OptimizedImageProps) {
    return (
        <picture className={pictureClassName}>
            <source srcSet={toWebpSrc(src)} type="image/webp" sizes={sizes} />
            <img src={src} alt={alt} className={className} />
        </picture>
    );
}

function toWebpSrc(src: string) {
    return src.replace(/\.(png|jpe?g)$/i, ".webp");
}
