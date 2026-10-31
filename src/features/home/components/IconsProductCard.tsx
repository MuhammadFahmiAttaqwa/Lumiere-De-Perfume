import type { ProductSummary } from '@/features/catalog';

interface IconsProductCardProps {
    product: ProductSummary;
    onSelect: (slug: string) => void;
}

export function IconsProductCard({ product, onSelect }: IconsProductCardProps) {
    return (
        <li>
            <button
                type="button"
                onClick={() => onSelect(product.slug)}
                className="group flex min-h-[410px] w-full flex-col items-center justify-center gap-3 rounded-card bg-paper px-8 py-10 text-ink"
            >
                <span className="flex h-[238px] w-[196px] items-center justify-center overflow-hidden rounded-card bg-mist">
                    <img
                        src={product.thumbnailUrl}
                        alt=""
                        loading="lazy"
                        width={550}
                        height={550}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                </span>
                <span className="mt-6 text-center text-sm">{product.name}</span>
                <span className="text-sm text-muted">{product.brand}</span>
            </button>
        </li>
    );
}
