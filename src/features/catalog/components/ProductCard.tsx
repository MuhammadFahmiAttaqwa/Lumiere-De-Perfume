import { UI_TEXT } from '@/shared/constants/uiText';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { Icon } from '@/shared/ui';
import type { ProductSummary } from '../types';

interface ProductCardProps {
    product: ProductSummary;
    onSelect: (slug: string) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
    return (
        <article className="group flex flex-col gap-4">
            <button
                type="button"
                onClick={() => onSelect(product.slug)}
                aria-label={`${UI_TEXT.catalog.buyNow}: ${product.name}`}
                className="relative flex aspect-[447/403] items-center justify-center overflow-hidden rounded-card bg-mist text-left"
            >
                <span className="absolute top-2 right-2 z-10 rounded-card bg-paper px-6 py-3.5 text-sm">
                    {formatCurrency(product.price, product.currency)}
                </span>
                <img
                    src={product.thumbnailUrl}
                    alt=""
                    loading="lazy"
                    width={550}
                    height={550}
                    className="h-[82%] w-auto object-contain transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <span className="absolute inset-x-0 bottom-0 flex h-[54px] items-center justify-between rounded-card bg-ink pr-1.5 pl-6 text-sm text-paper transition duration-300 lg:translate-y-full lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                    <span className="flex-1 text-center">{UI_TEXT.catalog.buyNow}</span>
                    <span className="flex size-11 items-center justify-center rounded-card bg-paper text-ink">
                        <Icon name="arrowRight" className="size-4" />
                    </span>
                </span>
            </button>
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-sm">{product.name}</h3>
                <p className="text-sm text-muted">{product.brand}</p>
            </div>
        </article>
    );
}
