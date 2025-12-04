import type { CredlyBadge } from './types'

const CREDLY_API_BASE = 'https://www.credly.com/users'

export async function fetchCredlyBadges(username: string): Promise<CredlyBadge[]> {
  const url = `${CREDLY_API_BASE}/${username}/badges.json`
  
  const response = await fetch(url)
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Credly profile not found. Please check the username and ensure the profile is public.')
    }
    throw new Error('Failed to fetch badges from Credly. Please try again later.')
  }
  
  const data = await response.json()
  
  if (!data.data || data.data.length === 0) {
    return []
  }
  
  return data.data.map((badge: any) => ({
    id: badge.id,
    name: badge.name,
    description: badge.description || '',
    image_url: badge.image_url,
    issuer: {
      name: badge.issuer?.name || 'Unknown Issuer',
      image_url: badge.issuer?.image_url,
    },
    issued_at: badge.issued_at,
    expires_at: badge.expires_at,
    skills: badge.badge_template?.skills?.map((skill: any) => skill.name) || [],
    public_url: badge.public_url || `https://www.credly.com/badges/${badge.id}`,
  }))
}

export function extractUsernameFromUrl(input: string): string {
  const trimmed = input.trim()
  
  if (trimmed.includes('credly.com/users/')) {
    const match = trimmed.match(/credly\.com\/users\/([^/]+)/)
    return match ? match[1] : trimmed
  }
  
  return trimmed
}
