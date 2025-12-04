export interface CredlyBadge {
  id: string
  name: string
  description: string
  image_url: string
  issuer: {
    name: string
    image_url?: string
  }
  issued_at: string
  expires_at?: string
  skills?: string[]
  public_url: string
}

export interface CredlyApiResponse {
  data: CredlyBadge[]
  metadata: {
    total_count: number
    page: number
    per_page: number
  }
}
