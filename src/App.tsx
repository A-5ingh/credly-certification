import { useState, useEffect, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { fetchCredlyBadges, extractUsernameFromUrl } from '@/lib/credly-api'
import type { CredlyBadge } from '@/lib/types'
import { ProfileSetup } from '@/components/ProfileSetup'
import { BadgeCard } from '@/components/BadgeCard'
import { BadgeDetailModal } from '@/components/BadgeDetailModal'
import { EmptyState } from '@/components/EmptyState'
import { BadgeGridSkeleton } from '@/components/BadgeGridSkeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { MagnifyingGlass, GearSix, Certificate, Sparkle } from '@phosphor-icons/react'

function App() {
  const [storedUsername, setStoredUsername] = useKV<string | null>('credly-username', null)
  const [badges, setBadges] = useState<CredlyBadge[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrg, setSelectedOrg] = useState<string>('all')
  const [selectedBadge, setSelectedBadge] = useState<CredlyBadge | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadBadges = async (username: string) => {
    setIsLoading(true)
    try {
      const extractedUsername = extractUsernameFromUrl(username)
      const fetchedBadges = await fetchCredlyBadges(extractedUsername)
      setBadges(fetchedBadges)
      setStoredUsername(extractedUsername)
      
      if (fetchedBadges.length === 0) {
        toast.info('No badges found for this profile')
      } else {
        toast.success(`Loaded ${fetchedBadges.length} badge${fetchedBadges.length === 1 ? '' : 's'}!`)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load badges')
      setBadges([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (storedUsername) {
      loadBadges(storedUsername)
    }
  }, [])

  const organizations = useMemo(() => {
    const orgs = new Set(badges.map(badge => badge.issuer.name))
    return Array.from(orgs).sort()
  }, [badges])

  const filteredBadges = useMemo(() => {
    return badges.filter(badge => {
      const matchesSearch = 
        badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        badge.issuer.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesOrg = selectedOrg === 'all' || badge.issuer.name === selectedOrg
      
      return matchesSearch && matchesOrg
    })
  }, [badges, searchQuery, selectedOrg])

  const handleBadgeClick = (badge: CredlyBadge) => {
    setSelectedBadge(badge)
    setIsModalOpen(true)
  }

  const handleChangeProfile = () => {
    setStoredUsername(null)
    setBadges([])
    setSearchQuery('')
    setSelectedOrg('all')
  }

  if (!storedUsername && !isLoading) {
    return <ProfileSetup onSubmit={loadBadges} isLoading={isLoading} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        <header className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Certificate size={24} weight="duotone" className="text-accent" />
              </div>
              <div>
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground tracking-tight">
                  Badge Showcase
                </h1>
                <p className="text-sm text-muted-foreground">
                  @{storedUsername}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleChangeProfile}
              className="gap-2 self-start md:self-auto"
            >
              <GearSix size={18} />
              Change Profile
            </Button>
          </div>

          {badges.length > 0 && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkle size={18} weight="fill" className="text-accent" />
              <span className="font-medium">
                {badges.length} Badge{badges.length === 1 ? '' : 's'} Earned
              </span>
            </div>
          )}
        </header>

        {isLoading ? (
          <BadgeGridSkeleton />
        ) : badges.length === 0 ? (
          <EmptyState
            title="No Badges Found"
            description="This profile doesn't have any public badges yet, or the profile may be set to private. Make sure the Credly profile is public to display badges."
          />
        ) : (
          <>
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <MagnifyingGlass 
                  size={20} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  id="search-badges"
                  type="text"
                  placeholder="Search badges or organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {organizations.length > 1 && (
                <Select value={selectedOrg} onValueChange={setSelectedOrg}>
                  <SelectTrigger className="w-full md:w-64" id="filter-org">
                    <SelectValue placeholder="All Organizations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Organizations</SelectItem>
                    {organizations.map(org => (
                      <SelectItem key={org} value={org}>
                        {org}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {filteredBadges.length === 0 ? (
              <EmptyState
                title="No Matching Badges"
                description="Try adjusting your search or filter to find what you're looking for."
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBadges.map(badge => (
                  <BadgeCard
                    key={badge.id}
                    badge={badge}
                    onClick={() => handleBadgeClick(badge)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <BadgeDetailModal
        badge={selectedBadge}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}

export default App