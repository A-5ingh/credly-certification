import { Card } from '@/components/ui/card'
import type { CredlyBadge } from '@/lib/types'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

interface BadgeCardProps {
  badge: CredlyBadge
  onClick: () => void
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  const formattedDate = badge.issued_at 
    ? format(new Date(badge.issued_at), 'MMM yyyy')
    : 'Date unknown'

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer border-border hover:border-accent hover:shadow-xl transition-all duration-200 h-full"
        onClick={onClick}
      >
        <div className="p-6 flex flex-col items-center text-center gap-4 h-full">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img 
              src={badge.image_url} 
              alt={badge.name}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-1 flex flex-col gap-2 w-full">
            <h3 className="font-heading font-semibold text-lg text-foreground leading-tight line-clamp-2">
              {badge.name}
            </h3>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">{badge.issuer.name}</p>
              <p className="text-xs">{formattedDate}</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
