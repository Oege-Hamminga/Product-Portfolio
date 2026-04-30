# Product-Portfolio
Product Portfolio viewer including Commercial vehicle / BOM / Aftersales parts
# AfterParts Portal — Claude Code Scaffold Prompt
 
Paste the following prompt into Claude Code (run `claude` in an empty project folder).
 
---
 
## PROMPT — copy everything below this line
 
Build a full production React + TypeScript + Tailwind CSS web application called **AfterParts Portal** — an aftersales kit viewer for commercial vehicle conversion products.
 
---
 
### TECH STACK
 
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **State**: React useState / useReducer (no external state library needed)
- **Data**: Static seed data to start; structure the data layer so it can be swapped for REST API calls later
- **Icons**: lucide-react
- **Package manager**: npm
Bootstrap with: `npx create-next-app@latest afterparts-portal --typescript --tailwind --app --eslint`
 
---
 
### BUSINESS RULES (encode these as pure functions in `src/lib/rules.ts`)
 
1. **Passenger vans** may only have the **Partition Wall** product category.
2. **Panel vans** may only have **Crew Cab** and **Flex Cab** product categories.
3. **Exception**: Stellantis and Volkswagen panel vans in segment **K1** may have all three categories: Crew Cab, Flex Cab, and Partition Wall.
4. Only **one kit** can be selected at a time on the catalogue page.
---
 
### DATA MODEL (`src/types/index.ts`)
 
```ts
export type VehicleType = 'panel' | 'passenger';
export type Segment     = 'F1' | 'K1' | 'K2/3';
export type Category    = 'Crew Cab' | 'Flex Cab' | 'Partition Wall';
export type Brand       = 'Stellantis' | 'Volkswagen' | 'Renault' | 'Ford' | 'IVECO' | 'Mercedes-Benz' | 'Kia';
export type StockStatus = 'In stock' | 'Low stock' | 'Made to order';
 
export interface Part {
  id: string;           // e.g. "P1"
  name: string;
  ref: string;          // internal reference e.g. "RSA-RPS-01"
  partNumber: string;   // customer-facing part number
  moq: number;          // minimum order quantity
  price: number;        // unit price in EUR
  leadTime: string;     // e.g. "5–8 days"
  leadColor: string;    // hex: green / amber / red based on duration
  stock: StockStatus;
  material: string;
  description: string;
  hotspot: { top: string; left: string }; // % positions on exploded image
}
 
export interface Kit {
  id: string;
  brand: Brand;
  vehicleType: VehicleType;
  segment: Segment;
  category: Category;
  modelName: string;    // e.g. "Ducato"
  displayName: string;  // e.g. "Ducato F1 — Crew Cab"
  ref: string;
  partCount: number;
  isSpecialException: boolean;
  imageUrl?: string;    // optional vehicle photo; fall back to SVG silhouette
  parts: Part[] | null; // null = BOM not yet uploaded
}
```
 
---
 
### VEHICLE MODELS
 
| Brand | Panel van | Passenger van |
|-------|-----------|---------------|
| Stellantis | Ducato | Jumper Combi |
| Volkswagen | Crafter | Crafter Kombi |
| Renault | Master | Master Combi |
| Ford | Transit | Transit Minibus |
| IVECO | Daily | Daily Tourys |
| Mercedes-Benz | Sprinter | Sprinter Tourer |
| Kia | K2500 | Carnival |
 
---
 
### APPLICATION STRUCTURE
 
```
src/
  app/
    page.tsx                  ← catalogue page (default route)
    viewer/[kitId]/page.tsx   ← aftersales viewer for a single kit
    layout.tsx                ← shared nav + font setup
  components/
    catalogue/
      FilterBar.tsx           ← brand / category / segment pills + search input
      KitGrid.tsx             ← responsive grid of KitCard
      KitCard.tsx             ← vehicle silhouette + kit metadata + select state
      SelectionBar.tsx        ← bottom bar showing selected kit + CTA button
    viewer/
      KitHeader.tsx           ← vehicle silhouette + kit name, ref, tags
      ExplodedViewer.tsx      ← image with numbered hotspot overlays
      PartDetailPanel.tsx     ← right panel: part name, price, MOQ, lead time, stock
      BomTable.tsx            ← searchable full parts table
    shared/
      VehicleSilhouette.tsx   ← SVG side-profile illustrations per brand/vehicleType
      Nav.tsx                 ← top navigation bar
  lib/
    rules.ts                  ← getAllowedCategories(), isSpecialException()
    kitGenerator.ts           ← generateAllKits() using rules + model data
    constants.ts              ← BRANDS, SEGMENTS, CATEGORIES, CATEGORY_COLOR, MODEL_NAME
  types/
    index.ts
  data/
    sampleParts.ts            ← 14 sample parts for the Stellantis Ducato F1 Crew Cab demo kit
```
 
---
 
### PAGE 1 — CATALOGUE (`/`)
 
**Layout**: full-height page with sticky nav + filter bar, scrollable kit grid, fixed selection bar at bottom.
 
**Filter bar** (horizontally scrollable on mobile):
- Group 1 — Brand pills: All | Stellantis | Volkswagen | Renault | Ford | IVECO | Mercedes-Benz | Kia
- Group 2 — Category pills: All | Crew Cab | Flex Cab | Partition Wall
- Group 3 — Segment pills: All | F1 | K1 | K2/3
- Text search input (searches brand, model name, ref, category)
- Live kit count on the right
**Kit grid**: `grid-template-columns: repeat(auto-fill, minmax(185px, 1fr))`, 1px gap on background.
 
**KitCard**:
- Top: SVG vehicle silhouette (16:9 aspect ratio), category-coloured bottom border, checkmark overlay top-right
- Body: category label (coloured), brand + model name, ref, tag pills (segment, vehicle type, part count, "Both types" if special exception)
- Selected state: blue-tinted background, filled checkmark
- Dimmed state (another kit is selected): 35% opacity, pointer-events none
- Click to select; click again to deselect
**Selection bar** (fixed at bottom):
- When nothing selected: grey hint text
- When a kit is selected: coloured dot + kit name + ref + "× Deselect" button + "Open aftersales view" primary CTA
- CTA navigates to `/viewer/[kitId]`
---
 
### PAGE 2 — VIEWER (`/viewer/[kitId]`)
 
**Kit header**: vehicle SVG + category (coloured), brand + model, ref, segment, vehicle type, part count tags.
 
**Main area** (two-column grid: `1fr 285px`):
 
Left — **ExplodedViewer**:
- Displays `kit.imageUrl` or a placeholder if null
- Numbered hotspot markers positioned absolutely using `part.hotspot`
- Clicking a hotspot: darkens image overlay, fades other hotspots to 30% opacity, scrolls BOM table to that row
- Click active hotspot again to deselect
Right — **PartDetailPanel**:
- Idle state: centred icon + instruction text
- Active state: part ID + part number, name, ref, description (left-bordered), 2×2 metrics grid (price, MOQ, lead time, material), lead time dot + stock status label, "Add to order" + "Datasheet" action buttons
Bottom — **BomTable**:
- Searchable (name, part number, ref)
- Columns: # | Name & ref | Part number | MOQ | Unit price | Lead time
- Clicking a row selects that part (same as hotspot click)
- Selected row highlighted blue
**If `kit.parts` is null**: show an "Exploded view not yet uploaded" placeholder with instructions.
 
---
 
### VEHICLE SVG SILHOUETTES (`VehicleSilhouette.tsx`)
 
Draw side-profile SVG illustrations for each brand. Use these colour tokens (CSS variables or props):
- body: `#d8dce2`, glass: `#a8c4d8`, wheel: `#888`, rim: `#bbb`, accent: `#c0c5cc`
- Headlight: `#f5c842`, tail light: `#e84040`
Passenger vans: longer roofline, 3 side windows + rear glazing.
Panel vans: short cab with single windscreen, solid cargo body with partition line.
Each brand has distinct cab proportions (see the SVG shapes in the component files I'll provide as reference).
 
For production: replace SVGs with `<Image src={kit.imageUrl} />` (Next.js Image component).
 
---
 
### STYLING CONVENTIONS
 
- Use Tailwind utility classes throughout
- Category colours as JS constants (not Tailwind classes) since they're dynamic:
  - Crew Cab: `#185FA5`, Flex Cab: `#0F6E56`, Partition Wall: `#854F0B`
- Lead time dot colours: green `#1D9E75`, amber `#EF9F27`, red `#E24B4A`
- Font: use `font-sans` (default Tailwind); for a polished look add `Geist` or `DM Sans` via next/font
- Transitions: `transition-colors duration-100` on interactive elements
- No component library — build everything from scratch with Tailwind
---
 
### SAMPLE DATA — seed in `src/data/sampleParts.ts`
 
Seed 14 parts for the Stellantis Ducato F1 Crew Cab (panel van) demo kit:
 
| id | name | partNumber | moq | price (€) | lead time | stock |
|----|------|-----------|-----|-----------|-----------|-------|
| P1 | Rear panel surround | CC-001 | 1 | 186.00 | 10–14 days | Made to order |
| P2 | Inner back panel | CC-002 | 1 | 112.50 | 8–12 days | In stock |
| P3 | Headrest set (×3) | CC-003 | 1 | 94.00 | 5–8 days | In stock |
| P4 | Seat back frame | CC-004 | 1 | 228.00 | 12–18 days | Made to order |
| P5 | Side bracket R | CC-005 | 2 | 38.50 | 5–8 days | In stock |
| P6 | Side trim panel L | CC-006 | 1 | 54.00 | 5–8 days | In stock |
| P7 | Folding mechanism | CC-007 | 1 | 67.00 | 8–12 days | Low stock |
| P8 | Seat cushion assy. | CC-008 | 1 | 158.00 | 10–14 days | In stock |
| P9 | Side trim panel R | CC-009 | 1 | 54.00 | 5–8 days | In stock |
| P10 | Floor rail set | CC-010 | 1 | 72.00 | 6–10 days | In stock |
| P11 | Latch bracket set | CC-011 | 4 | 14.50 | 3–5 days | In stock |
| P12 | Under-seat storage tray | CC-012 | 1 | 42.00 | 5–8 days | In stock |
| P13 | Carpet trim L | CC-013 | 1 | 28.00 | 3–5 days | In stock |
| P14 | Carpet trim R | CC-014 | 1 | 28.00 | 3–5 days | In stock |
 
Set lead time dot colours: ≤5 days = green, 6–12 days = amber, 13+ days = red.
 
---
 
### API INTEGRATION POINTS (for future backend)
 
Structure the data layer so these are easy to swap in:
 
```ts
// src/lib/api.ts  (stub — replace with fetch() calls)
export async function fetchAllKits(): Promise<Kit[]> { return generateAllKits(); }
export async function fetchKitById(id: string): Promise<Kit | undefined> { return generateAllKits().find(k => k.id === id); }
export async function fetchPartsByKitId(kitId: string): Promise<Part[]> { /* GET /api/kits/:id/parts */ return []; }
```
 
---
 
### DELIVERABLES CHECKLIST
 
- [ ] `npx create-next-app` bootstrapped and running on `localhost:3000`
- [ ] All types defined in `src/types/index.ts`
- [ ] Business rules in `src/lib/rules.ts` with unit-testable pure functions
- [ ] All kits generated dynamically from rules (no hardcoded kit list)
- [ ] Catalogue page with working filters (brand, category, segment, search)
- [ ] Single-select kit behaviour with dimming
- [ ] Navigation to viewer page on CTA click
- [ ] Viewer page with hotspot interactions, part detail panel, and BOM table
- [ ] Vehicle SVG silhouettes for all 7 brands × 2 vehicle types
- [ ] Responsive layout (catalogue grid reflows; viewer stacks on mobile)
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] `npm run build` succeeds with no errors
---
 
Start by scaffolding the Next.js project, then implement in this order:
1. Types + business rules + kit generator
2. Shared components (Nav, VehicleSilhouette)
3. Catalogue page (FilterBar → KitGrid → KitCard → SelectionBar)
4. Viewer page (KitHeader → ExplodedViewer + PartDetailPanel → BomTable)
