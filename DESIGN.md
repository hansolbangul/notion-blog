# istp.builders — The builder's workbench

Editorial technical blog, led by the owner's supplied box-head character.
A warm paper surface, charcoal ink, cardboard artwork and muted green tape make a quiet, practical workspace.

## Brand

Name: istp.builders. Production domain: https://hansolbangul.com (the brand is independent of the host).
Use /brand/chibi-icon-v1.svg as the icon. All blog mascots use the owner’s two-head-tall pose sheet /brand/chibi-poses-v1.png, displayed through SVG viewBox windows: standing in the hero, laptop in service/author notes, thinking in the reading sidebar, raised hands at article end, crouching for recommendations, and lying down in the footer and empty state. Preserve original artwork and proportions. No competing invented mascot or logo. Characters appear in the intro, small author note, reading sidebar and end of an article.

## System

Paper #f7f5ef; ink #262724; muted #6b6d64; line #dcded3; green ink #52672b; tape #c5d88a. Green is the only interface accent. Code syntax gets its own accessible palette. Korean system sans and system monospace. 4px spacing base. Flat editorial surfaces, 1px rules, no decorative shadows. Corners: icons 7–9px, code 8px, other surfaces square.

## Homepage

One brand introduction, then directly to the archive. No repeated featured post, fake statistics, redundant promotional copy, subscription funnels or floating tool launcher. Keep functional search, topics and pagination. Counts are derived from real published posts. Reveal the original thumbnail color on hover.

## Article

One semantic h1 outside the Notion renderer. Title, short summary, author/date and reading time from the complete body. Readable 760px body, 17px text, 1.95 line height; 16px on mobile. Sticky desktop table of contents; collapsible mobile contents. Heading anchors align below the header. A thin reading progress indicator replaces the intrusive floating recommendation panel.
Code: dark charcoal, syntax highlighting, exact-source copy, language label, line numbers, optional wrapping, keyboard-scrollable overflow. Unsupported languages remain escaped plain text. No horizontal page overflow. Inline code uses a quiet green surface. Tables scroll locally. Comments are optional disclosure. Previous/next navigation sits after the article.

## Accessibility & motion

Visible focus, named controls, status for copy, reduced-motion support. One short entrance and subtle interactive color/arrow changes. Decorative characters never cover text or controls.

## Reference lineage

https://getdesign.md/wired/design-md — editorial hierarchy and minimal containers.
https://getdesign.md/vercel/design-md — legible developer navigation.
The owner's character, Korean readability and minimal content take priority over those references.

## End-of-reading invitation

At 85% reading progress, a crouching mascot rises from the bottom with the Korean request “이것도 읽어주면 안돼요?”. Recommend at most two other published posts, ranked by shared topics; omit the current post. Dismissal lasts for the current article visit, Escape also dismisses, and hidden recommendations are not focusable. The desktop character sits beside the speech bubble; on mobile it sits above the bubble. Respect reduced motion and safe-area insets. Use the crouching pose from the shared chibi sheet, preserving the original artwork.

## Connected services

Visual thesis: quiet paper-and-ink editorial framing around real product screenshots; each service keeps its own visual identity.
Content: the existing blog introduction, a bounded selection of two services, then the article archive. /services is the complete catalog, followed by a link back to development notes.
Interaction: one click on the complete service preview opens the actual service in a new tab; subtle image zoom and arrow movement explain this affordance. The all-services link and header menu lead to /services. Reduced motion disables zoom transitions.

Maintain apps/blog/src/libs/services.ts as the single source of truth. Add a service there and save its screenshot in public/services/. featuredOrder sets the selection priority, and HOME_SERVICE_LIMIT caps the homepage at two. Entries without featuredOrder appear only in the complete catalog. No search, filters, or carousel until the collection warrants them. On mobile the previews stack vertically. New-tab behavior is visible and included in accessible link names. Domain text is replaced with benefit-led descriptions and explicit calls to action.

Preview images are screenshots of the actual public landing pages, captured 2026-09-13 with the browser tool. Sources: https://yeondang.hansolbangul.com and https://marry.hansolbangul.com. The latter currently brands itself as 메리와; preserve Marry Me as the project name and display the live name in its category.
