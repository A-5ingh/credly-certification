import { Certificate } from '@phosphor-icons/react'

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Certificate size={48} weight="duotone" className="text-accent" />
      </div>
      
      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md">
        {description}
      </p>
    </div>
  )
}
