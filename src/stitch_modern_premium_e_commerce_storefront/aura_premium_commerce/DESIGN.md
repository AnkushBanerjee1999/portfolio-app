---
name: Aura Premium Commerce
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#2b6954'
  on-secondary: '#ffffff'
  secondary-container: '#adedd3'
  on-secondary-container: '#306d58'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display:
    fontFamily: Epilogue
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  h1:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
  section-gap: 120px
---

## Brand & Style

The design system is rooted in the philosophy of "Essentialism"—the belief that by stripping away the superfluous, the inherent quality of the product can shine. It targets a discerning audience that values craftsmanship, exclusivity, and a seamless digital experience. 

The visual style is a blend of **Minimalism** and **Corporate Modernism**, characterized by expansive white space that allows products to breathe. The emotional response is one of calm confidence and prestige, utilizing high-contrast monochromatic themes to establish an editorial feel. Every transition is intentional, favoring slow, eased motion over snappy animations to reinforce a sense of luxury and grace.

## Colors

This design system employs a strict monochromatic palette to maintain a high-end, editorial aesthetic. 
- **Primary:** Pure Black (#000000) is used for critical branding, primary actions, and high-level headings.
- **Accent:** A sophisticated Emerald (#064E3B) is used sparingly for interactive highlights, success states, and subtle calls to action to signify growth and quality.
- **Neutrals:** A range of soft grays (Cool Gray scale) provides depth without adding visual noise. 
- **Surfaces:** Pure White (#FFFFFF) is the primary canvas, with extremely light gray (#F9FAFB) used for secondary containers to create soft contrast.

## Typography

The typographic strategy relies on the tension between the geometric, expressive nature of **Epilogue** for headlines and the utilitarian precision of **Inter** for UI and body text. 

Headlines should be set with tight letter spacing to feel "locked" and intentional. Body text uses generous line heights to ensure maximum readability and a premium feel. Small labels should occasionally use uppercase styling with increased letter spacing to act as "eyebrows" for content sections.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a boutique, curated feel, centering the content within a 1280px container. On mobile, the system transitions to a fluid model with generous side margins.

Spacing follows an 8px base unit but prioritizes large "Section Gaps" (up to 120px) to separate different product stories. This excessive vertical whitespace is a key identifier of the premium nature of the design system, signaling that the content is not cramped or rushed.

## Elevation & Depth

Depth in this design system is achieved through **Ambient Shadows** and **Tonal Layers** rather than heavy gradients. 

- **Surface Levels:** The base is always White. Elevated cards use a subtle "Floating" shadow—a very large blur (30px+) with extremely low opacity (4-6% black) and a slight Y-axis offset.
- **Subtle Borders:** All containers utilize a 1px border in a very light gray (#E5E7EB) to provide definition against white backgrounds without the weight of a shadow.
- **Glassmorphism:** Navigation bars and overlays use a backdrop blur (20px) with a semi-transparent white fill (80%) to maintain context of the content beneath while ensuring text legibility.

## Shapes

The design system utilizes **Rounded** shapes to soften the high-contrast monochromatic palette. While the grid is rigid, the elements themselves feel approachable and modern.

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Large Containers:** Product cards and hero images use a 1.5rem (24px) radius to create a distinct, "object-like" appearance.
- **Interactive States:** On hover, certain elements may subtly increase their corner radius or expand slightly (1.02x scale) to signal interactivity.

## Components

- **Buttons:** Primary buttons are solid Black with White text, using a 0.5rem radius. Secondary buttons are "Ghost" style with a 1px subtle border. The accent color is reserved for the "Add to Cart" or "Checkout" success states.
- **Input Fields:** Minimalist design with only a bottom border that thickens and turns Black on focus. Labels are small and placed above the field in Inter (Label-sm).
- **Cards:** Product cards are borderless with a very soft ambient shadow on hover. Images within cards must have a consistent aspect ratio (typically 4:5 for fashion or 1:1 for tech).
- **Chips/Badges:** Small, pill-shaped elements with a light gray background and dark gray text, used for categories or status (e.g., "New Arrival", "Limited Edition").
- **Lists:** Clean, horizontal dividers (1px) with generous padding (24px) between items. Use chevron-right icons sparingly to indicate drill-down actions.
- **Additional Suggestion:** **Quick-Look Drawer.** A slide-out panel from the right that uses the backdrop-blur effect to allow users to view product details without leaving the current gallery.