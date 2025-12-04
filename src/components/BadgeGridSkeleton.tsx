import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

export function BadgeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index} className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <Skeleton className="w-32 h-32 rounded-lg" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
              <Skeleton className="h-3 w-1/3 mx-auto" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
