import os

with open('audit_table.md', 'r') as f:
    audit_content = f.read()

# Filter audit table to keep it concise but representative (top 20 largest and a few others)
lines = audit_content.strip().split('\n')
headers = lines[0:2]
data_lines = lines[2:]

def get_kb(line):
    # | `path` | 2031.3 KB | 1248x832 | PNG | Gallery | High |
    try:
        parts = line.split('|')
        size_str = parts[2].strip().replace(' KB', '')
        return float(size_str)
    except:
        return 0

data_lines.sort(key=get_kb, reverse=True)
top_lines = data_lines[:30] # Top 30 largest images

filtered_table = "\n".join(headers + top_lines) + "\n| ... | ... | ... | ... | ... | ... |\n| *Note: 90+ additional images listed in full audit* | | | | | |"

artifact_content = f"""# Kings Court Hotel - Image Optimization Strategy & Implementation Guide

## A. Image Audit Spreadsheet (Top 30 Priority Targets)

The following table highlights the heaviest images currently affecting LCP and page load times. Many of these PNGs and unoptimized JPGs are over 2-4 MB and need immediate conversion.

{filtered_table}

---

## B. Conversion Script & Instructions

To achieve the 30-40% size reduction, we will migrate from PNG/JPG to WebP. 

### 1. Automated Batch Conversion Script (Mac/Linux)
Using ImageMagick and `cwebp` (Google's WebP encoder), you can batch convert all images. If you don't have `cwebp` installed, install it via Homebrew: `brew install webp`.

Create a script `optimize_images.sh` in your project root:

```bash
#!/bin/bash
# Convert and generate responsive WebP variants

TARGET_DIR="assets/images"

# 1. Convert all PNGs to WebP (Quality 85)
find "$TARGET_DIR" -type f -iname "*.png" | while read img; do
    cwebp -q 85 "$img" -o "${{img%.*}}.webp"
done

# 2. Convert all JPGs to WebP (Quality 85)
find "$TARGET_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) | while read img; do
    cwebp -q 85 "$img" -o "${{img%.*}}.webp"
    
    # Optional: Generate Responsive Sizes for Hero/Gallery
    # Mobile (480px)
    cwebp -q 80 -resize 480 0 "$img" -o "${{img%.*}}-sm.webp"
    # Tablet (1024px)
    cwebp -q 80 -resize 1024 0 "$img" -o "${{img%.*}}-md.webp"
done

echo "Conversion complete!"
```

### 2. Tool Recommendations
- **Command Line**: `cwebp` (Google), `ImageMagick`
- **Online Tools**: [Squoosh.app](https://squoosh.app) (Highly recommended for fine-tuning hero images), [TinyPNG](https://tinypng.com) for quick bulk compression if command line is unavailable.
- **Mac App**: [ImageOptim](https://imageoptim.com/mac) (Drop existing JPGs/PNGs here before deployment to strip EXIF data without losing quality).

---

## C. Ready-to-Use HTML Code

Replace your standard `<img>` tags with the `<picture>` element pattern to leverage browser-level format negotiation and responsive loading.

### 1. Hero Images (Above the fold)
**Key Adjustments**: `loading="eager"`, explicit `fetchpriority="high"`, no lazy loading!

```html
<picture>
  <!-- Modern WebP format with responsive sizing -->
  <source 
    srcset="
      assets/images/hero/hero-main-sm.webp 480w,
      assets/images/hero/hero-main-md.webp 1024w,
      assets/images/hero/hero-main.webp 1920w
    "
    type="image/webp"
    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 100vw, 1920px"
  >
  <!-- Fallback JPEG format with responsive sizing -->
  <source 
    srcset="
      assets/images/hero/hero-main-sm.jpg 480w,
      assets/images/hero/hero-main-md.jpg 1024w,
      assets/images/hero/hero-main.jpg 1920w
    "
    type="image/jpeg"
    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 100vw, 1920px"
  >
  <!-- IE11 / Legacy Fallback -->
  <img 
    src="assets/images/hero/hero-main.jpg" 
    alt="Kings Court Hotel exterior at sunset"
    width="1920"
    height="1080"
    class="hero-image"
    fetchpriority="high"
    loading="eager"
    decoding="async"
  >
</picture>
```

### 2. Gallery & Content Images (Below the fold)
**Key Adjustments**: `loading="lazy"`, explicit width/height to prevent Cumulative Layout Shift (CLS).

```html
<picture>
  <source 
    srcset="
      assets/images/gallery/compressed-kings-court-2-sm.webp 480w,
      assets/images/gallery/compressed-kings-court-2.webp 1920w
    "
    type="image/webp"
    sizes="(max-width: 768px) 100vw, 50vw"
  >
  <img 
    src="assets/images/gallery/compressed-kings-court-2.jpg" 
    alt="Comfortable en-suite bedroom at Kings Court Hotel"
    width="1920"
    height="1280"
    class="gallery-img"
    loading="lazy"
    decoding="async"
  >
</picture>
```

---

## D. Implementation Guide

### Phase 1: High-Priority Targets (First 2-3 Days)
1. **Target**: All images located on `index.html` (Hero banner, featured rooms, about preview).
2. **Action**: Convert these specific images using Squoosh.app or `cwebp`.
3. **Action**: Swap the single `<img>` tags on `index.html` to the responsive `<picture>` template. Remove `loading="lazy"` from the main Hero image to vastly improve LCP.

### Phase 2: Bulk Processing (Remaining 14 days)
1. **Target**: `/assets/images/gallery/` and `/assets/images/weddings/`
2. **Action**: Run the bash batch conversion script to generate WebP and `-sm` / `-md` variants.
3. **Action**: Systematically update `rooms.html`, `dining.html`, `weddings.html`. Ensure every image has explicit `width` and `height` attributes to prevent CLS.

### Vercel Hosting / CDN Caching
Since you are using modern hosting architectures, you can opt into automatic image optimization during build:
If using Next.js/Vercel later, Vercel dynamically serves WebP/AVIF. In this vanilla HTML setup, ensure your `vercel.json` applies aggressive caching headers to `/assets/images/`:
```json
{{
  "headers": [
    {{
      "source": "/assets/images/(.*)",
      "headers": [
        {{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }}
      ]
    }}
  ]
}}
```

---

## E. CSS Snippet

Adding these CSS properties globally prevents Layout Shifts and ensures images always scale beautifully.

```css
/* Core Image Optimization CSS */
img, picture {
  display: block;
  max-width: 100%;
  height: auto;
  /* Prevent horizontal layout shifts while images load */
  aspect-ratio: attr(width) / attr(height); 
}

/* Specific component aspect ratios */
.hero-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
}

.gallery-img, .room-card img {
  width: 100%;
  aspect-ratio: 3/2; /* Standardizes all gallery items */
  object-fit: cover;
  background-color: var(--clr-cream-light, #f4f0ea); /* Placeholder color */
}

/* Smooth fade-in for lazy-loaded images (requires minor JS hook or modern native support) */
img[loading="lazy"] {
  transition: opacity 0.3s ease-in-out;
}
```

---

## F. Monitoring Dashboard Setup

To accurately measure the 30-40% performance gain:

### 1. Establish Baselines (Before Deployment)
Go to **Google PageSpeed Insights** and test:
1. Homepage (`/`)
2. Weddings Page (`/weddings.html` - very heavy currently due to unoptimized 4MB+ PNGs)
3. Rooms Page (`/rooms.html`)
*Record the LCP (secs), CLS score, and total Page Size (MB).*

### 2. Google Search Console (Core Web Vitals)
- Navigate to **GSC > Experience > Core Web Vitals**.
- GSC uses 28-day rolling average field data (CrUX). Changes made today won't fully reflect in the "Good" URLs chart for roughly 3-4 weeks.

### 3. Continuous Monitoring Toolkit
- **Chrome DevTools (Lighthouse)**: Run in Incognito mode with "Simulated Throttling" enabled for mobile tests. Target >90 Performance score.
- **WebPageTest.org**: Run a standard test from a UK server location (London). Look at the "Waterfall" chart to verify WebP images are downloading, and the visual progress filmstrip shows the Hero image loading in under 2.0s.

### Expected Outcome Timeline:
- **Immediate**: Page size drops from ~10-15MB to ~3-4MB on gallery pages.
- **1-3 Days**: Lighthouse tests instantly show LCP dropping below 2.5s.
- **14 Days**: GSC starts recording "Fast" URLs in validation phases.
- **30-60 Days**: Improved Core Web Vitals metric directly impacts mobile rankings, resulting in a 10-15% organic boost.
"""

with open('image_optimization_strategy.md', 'w') as f:
    f.write(artifact_content)
