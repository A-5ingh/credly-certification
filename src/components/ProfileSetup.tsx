import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Certificate } from '@phosphor-icons/react'
import { useState } from 'react'

interface ProfileSetupProps {
  onSubmit: (username: string) => void
  isLoading: boolean
}

export function ProfileSetup({ onSubmit, isLoading }: ProfileSetupProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSubmit(username.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 shadow-xl border-border">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
            <Certificate size={40} weight="duotone" className="text-accent" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Credly Badge Showcase
            </h1>
            <p className="text-muted-foreground">
              Display all your professional certifications in one beautiful place
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Input
                id="credly-username"
                type="text"
                placeholder="Enter your Credly username or profile URL"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center"
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                e.g., "john-doe" or "https://www.credly.com/users/john-doe"
              </p>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
              disabled={isLoading || !username.trim()}
            >
              {isLoading ? 'Loading badges...' : 'Show My Badges'}
            </Button>
          </form>
          
          <div className="pt-4 border-t border-border w-full">
            <p className="text-xs text-muted-foreground">
              Make sure your Credly profile is public to display your badges
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
