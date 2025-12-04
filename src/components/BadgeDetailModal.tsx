import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { CredlyBadge } from '@/lib/types'
import { ArrowSquareOut, CheckCircle } from '@phosphor-icons/react'
import { format } from 'date-fns'

interface BadgeDetailModalProps {
  badge: CredlyBadge | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BadgeDetailModal({ badge, open, onOpenChange }: BadgeDetailModalProps) {
  if (!badge) return null

  const formattedDate = badge.issued_at 
    ? format(new Date(badge.issued_at), 'MMMM d, yyyy')
    : 'Date unknown'
    
  const expiresDate = badge.expires_at 
    ? format(new Date(badge.expires_at), 'MMMM d, yyyy')
    : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">
            Badge Details
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-40 h-40 mx-auto md:mx-0">
                <img 
                  src={badge.image_url} 
                  alt={badge.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="flex-1 space-y-3 text-center md:text-left">
                <h3 className="font-heading font-bold text-xl text-foreground">
                  {badge.name}
                </h3>
                
                <div className="flex items-center gap-2 text-muted-foreground justify-center md:justify-start">
                  <CheckCircle weight="fill" className="text-accent" size={20} />
                  <span className="font-medium">{badge.issuer.name}</span>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium">Earned:</span> {formattedDate}
                  </p>
                  {expiresDate && (
                    <p>
                      <span className="font-medium">Expires:</span> {expiresDate}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {badge.description && (
              <>
                <Separator />
                <div>
                  <h4 className="font-heading font-semibold text-sm text-foreground mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </>
            )}
            
            {badge.skills && badge.skills.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-heading font-semibold text-sm text-foreground mb-3">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {badge.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-accent/10 text-accent-foreground border-accent/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <Separator />
            
            <div className="flex justify-center md:justify-start">
              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
              >
                <a 
                  href={badge.public_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on Credly
                  <ArrowSquareOut size={18} />
                </a>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
