# Planning Guide

A modern, open-source certification showcase platform that automatically displays and syncs professional badges from Credly, providing a beautiful, shareable portfolio of achievements.

**Experience Qualities**:
1. **Effortless** - Zero-friction setup with just a Credly profile URL, automatic syncing without manual updates
2. **Professional** - Clean, achievement-focused design that highlights credentials with credibility and polish
3. **Accessible** - Fast loading, mobile-responsive, and shareable for portfolios, resumes, and professional networks

**Complexity Level**: Light Application (multiple features with basic state)
  - Single feature focus (badge display) with filtering, search, and persistence for user preferences

## Essential Features

### Credly Profile Connection
- **Functionality**: Input Credly username/profile URL to fetch all earned badges via public API
- **Purpose**: Single source of truth for certifications, eliminating manual entry and keeping data current
- **Trigger**: User enters their Credly username in a prominent input field on first visit
- **Progression**: Empty state with input → API fetch → Loading state → Grid display of badges
- **Success criteria**: Successfully fetches and displays all public badges from valid Credly profile, shows helpful error for invalid usernames

### Badge Display Grid
- **Functionality**: Visual grid showcasing each certification with badge image, name, issuing organization, and earned date
- **Purpose**: Professional presentation of achievements in a scannable, visually appealing format
- **Trigger**: Automatic after successful profile fetch
- **Progression**: Data loaded → Badges rendered in responsive grid → Hover reveals additional details → Click opens badge detail view
- **Success criteria**: All badges display correctly with images, metadata visible, grid adapts to screen sizes

### Search and Filter
- **Functionality**: Real-time search across badge names and organizations, optional filter by organization
- **Purpose**: Quick navigation for users with many certifications, helps viewers find specific credentials
- **Trigger**: User types in search box or selects filter dropdown
- **Progression**: User input → Instant grid filtering → Results update live → Clear to reset
- **Success criteria**: Search returns accurate matches, filters work independently and combined, empty states show helpful messages

### Profile Persistence
- **Functionality**: Saves Credly username locally so badges load automatically on return visits
- **Purpose**: Eliminates repeated setup, makes app feel personalized and instant
- **Trigger**: Automatic save after first successful fetch
- **Progression**: Username entered → Badges fetched → Username saved to KV → Future visits auto-load
- **Success criteria**: Username persists across sessions, app loads badges immediately on return, option to change username

### Badge Detail Modal
- **Functionality**: Expanded view showing full badge details, description, skills, and link to Credly verification
- **Purpose**: Provides complete certification context and verification pathway
- **Trigger**: Click on any badge card
- **Progression**: Badge click → Modal opens with full details → View verification link → Close to return
- **Success criteria**: Modal displays all badge metadata, external verification link works, smooth open/close transitions

## Edge Case Handling
- **Invalid Username**: Clear error message guiding user to check spelling and Credly profile visibility settings
- **No Badges Found**: Friendly empty state explaining that profile may be private or has no earned badges
- **API Rate Limiting**: Graceful fallback with cached data message and retry option
- **Network Failures**: Show offline state with last successful data if available
- **Slow Connections**: Progressive loading with skeleton screens, prevents layout shift

## Design Direction
The design should evoke trust, professionalism, and achievement celebration - like a digital trophy case that feels modern and prestigious. It should balance formality (these are professional credentials) with warmth (celebrating accomplishments). Visual weight should emphasize the badges themselves while maintaining clean, uncluttered space.

## Color Selection
A sophisticated palette anchored in deep navy blues conveying professionalism and trust, accented with warm gold tones that evoke achievement and excellence.

- **Primary Color**: Deep Navy `oklch(0.25 0.05 250)` - Conveys professionalism, trust, and authority appropriate for credentials
- **Secondary Colors**: Cool Gray `oklch(0.45 0.01 250)` for supporting text and subtle UI elements, maintains professional tone without heaviness
- **Accent Color**: Achievement Gold `oklch(0.75 0.15 85)` - Highlights badges, CTAs, and success states with warmth suggesting accomplishment
- **Foreground/Background Pairings**: 
  - Background (Soft White `oklch(0.98 0 0)`): Navy text `oklch(0.25 0.05 250)` - Ratio 10.8:1 ✓
  - Primary (Deep Navy `oklch(0.25 0.05 250)`): White text `oklch(1 0 0)` - Ratio 10.8:1 ✓
  - Accent (Achievement Gold `oklch(0.75 0.15 85)`): Navy text `oklch(0.25 0.05 250)` - Ratio 5.2:1 ✓
  - Card (White `oklch(1 0 0)`): Navy text `oklch(0.25 0.05 250)` - Ratio 10.8:1 ✓

## Font Selection
Typography should project contemporary professionalism with excellent readability - clean sans-serif that feels modern and trustworthy without being sterile.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold / 36px / -0.02em letter spacing / Navy
  - H2 (Section Headers): Space Grotesk Semibold / 24px / -0.01em / Navy
  - H3 (Badge Names): Space Grotesk Medium / 18px / normal / Navy
  - Body (Organizations, Dates): Inter Regular / 14px / normal / Cool Gray
  - Labels (Form Fields): Inter Medium / 13px / 0.01em / Cool Gray
  - Small (Meta Info): Inter Regular / 12px / normal / Muted Gray

## Animations
Subtle, purposeful micro-interactions that acknowledge user actions and guide attention - badge cards should have gentle hover lifts suggesting interactivity, modals should slide in smoothly establishing spatial relationships, and loading states should feel organic rather than mechanical. All animations under 300ms to feel responsive.

## Component Selection

- **Components**:
  - **Card**: Primary container for each badge with hover states, custom shadow on hover for depth
  - **Input**: Search field with icon prefix, focus ring in accent gold
  - **Select**: Organization filter dropdown with custom styling
  - **Dialog**: Badge detail modal with backdrop blur, custom close button
  - **Button**: Primary (gold accent), Secondary (navy outline), Ghost (for close actions)
  - **Skeleton**: Loading placeholders matching card dimensions
  - **Badge** (shadcn): Pill-style tags for badge categories/skills
  - **Separator**: Subtle dividers in modal content
  - **ScrollArea**: Smooth scrolling for long badge lists in modal

- **Customizations**:
  - Custom badge card component with image, metadata overlay, and hover lift animation
  - Empty state component with illustration-style icon and helpful messaging
  - Search/filter toolbar component combining input and select with responsive layout
  - Profile setup card with prominent input and animated submission

- **States**:
  - Buttons: Default (solid/outline), Hover (brightness increase + shadow), Active (pressed scale), Focus (gold ring), Disabled (reduced opacity)
  - Cards: Default (flat white), Hover (lifted shadow + border highlight), Active (scale down slightly)
  - Inputs: Default (subtle border), Focus (gold ring + border), Error (red border with shake), Success (green checkmark)
  - Modal: Enter (fade + slide up), Exit (fade out), Backdrop (blur backdrop-filter)

- **Icon Selection**:
  - MagnifyingGlass: Search input prefix
  - Funnel: Filter controls
  - Certificate: Empty state and app branding
  - CheckCircle: Verification indicators
  - X: Modal close
  - ArrowSquareOut: External Credly links
  - GearSix: Settings/profile change
  - Sparkle: Achievement accents

- **Spacing**:
  - Container: px-4 md:px-8 lg:px-12 (responsive horizontal padding)
  - Card Grid: gap-6 (24px between cards)
  - Card Internal: p-6 (24px padding inside cards)
  - Sections: mb-8 (32px between major sections)
  - Form Elements: gap-4 (16px between inputs)
  - Modal: p-8 (32px padding)

- **Mobile**:
  - Grid: 1 column on mobile (< 768px), 2 columns tablet (768-1024px), 3-4 columns desktop (> 1024px)
  - Search/Filter: Stack vertically on mobile, horizontal row on desktop
  - Badge Cards: Full width mobile with reduced padding (p-4), compact metadata
  - Modal: Full screen on mobile with slide-up animation, centered dialog on desktop
  - Typography: Reduce H1 to 28px, H2 to 20px on mobile
  - Touch targets: Minimum 44px height for all interactive elements
