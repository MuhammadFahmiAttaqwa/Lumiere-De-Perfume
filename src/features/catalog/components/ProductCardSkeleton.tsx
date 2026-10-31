import { Skeleton } from '@/shared/ui';

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="aspect-[447/403] w-full" />
            <Skeleton className="mx-auto h-4 w-1/2" />
            <Skeleton className="mx-auto h-4 w-1/4" />
        </div>
    );
}
