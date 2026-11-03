export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse rounded-lg bg-forest-100/70 ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="card p-5">
      <Skeleton className="h-4 w-20 mb-3" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1.5" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
