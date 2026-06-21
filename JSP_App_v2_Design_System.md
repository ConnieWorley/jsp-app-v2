# JSP App v2 — Design System
**Phase 3 Artifact | UX Designer Role**
*Last updated: June 21, 2026*

---

## 1. Design Principles

### Core Philosophy
The app provides structure, prompts, and guardrails. The job seeker does their own thinking. The UI should make that distinction visible — AI is present when you want it, quiet when you do not.

### Aesthetic Direction
Clean. Minimal. Warm. Encouraging. Personal enough to feel like yours, professional enough to take seriously.

### Personality in Practice
- Empty states are written in Connie's voice — direct, encouraging, never generic
- Micro-interactions are subtle and satisfying (checklist completions, transitions)
- AI surfaces are clearly distinct from user-owned content — never intrusive
- Copy uses active voice, sentence case, plain verbs

### Empty State Voice Examples
- Jobs (empty): "Nothing here yet — let's change that. Add your first opportunity."
- Checklist (not started): "Time to dig in. Your first step is waiting."
- Stories (empty): "Your experience is already here. Let's get it out of your head and into the app."
- Skills Gap (empty): "Add a target role and we will take a look at where you stand."

---

## 2. Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-background` | `#FAF7F2` | App background (warm cream) |
| `--color-surface` | `#FDFAF5` | Cards, panels, elevated surfaces |
| `--color-primary` | `#1d6b5e` | Primary actions, sidebar, active states |
| `--color-primary-hover` | `#175a4e` | Primary hover state |
| `--color-primary-light` | `#e8f2f0` | Teal tint for backgrounds, badges |
| `--color-text-primary` | `#1a2333` | Body text, headings |
| `--color-text-secondary` | `#6b7280` | Supporting text, labels, metadata |
| `--color-text-inverse` | `#FAF7F2` | Text on dark (sidebar) |
| `--color-border` | `#e5e0d8` | Dividers, input borders, card borders |
| `--color-priority-2` | `#4a9e8e` | Priority 2 indicator |
| `--color-priority-3` | `#a8d5cd` | Priority 3 indicator |
| `--color-warning` | `#4a6fa5` | Warning states, attention indicators |
| `--color-error` | `#C00000` | Error states, destructive actions |
| `--color-sidebar-bg` | `#1d6b5e` | Sidebar background |
| `--color-sidebar-text` | `#FAF7F2` | Sidebar text and icons |
| `--color-sidebar-active` | `#175a4e` | Active sidebar item background |

> **Note for Phase 4:** Verify `#FAF7F2` against connieworley.netlify.app source and adjust if needed.

---

## 3. Typography

### Font Families
| Role | Font | Usage |
|---|---|---|
| Display / Headers | Playfair Display | Page titles, section headers, H1–H2 |
| Body | Inter | All body text, labels, UI copy, H3–H6 |

### Type Scale
| Token | Font | Size | Weight | Usage |
|---|---|---|---|---|
| `--text-h1` | Playfair Display | 2rem (32px) | 700 | Page titles |
| `--text-h2` | Playfair Display | 1.5rem (24px) | 600 | Section headers |
| `--text-h3` | Inter | 1.25rem (20px) | 600 | Card titles, subsection headers |
| `--text-h4` | Inter | 1rem (16px) | 600 | Form labels, list headers |
| `--text-body` | Inter | 1rem (16px) | 400 | Body text |
| `--text-small` | Inter | 0.875rem (14px) | 400 | Metadata, supporting text |
| `--text-micro` | Inter | 0.75rem (12px) | 500 | Badges, status labels, tags |

### Line Height
- Headers: 1.2
- Body: 1.6
- Small/micro: 1.4

---

## 4. Spacing

Base unit: `4px`

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro spacing |
| `--space-2` | 8px | Tight spacing, icon gaps |
| `--space-3` | 12px | Inner padding (compact) |
| `--space-4` | 16px | Default inner padding |
| `--space-5` | 20px | Section padding |
| `--space-6` | 24px | Card padding, section gaps |
| `--space-8` | 32px | Large section gaps |
| `--space-10` | 40px | Page-level padding |
| `--space-12` | 48px | Major section separation |

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 4px | Inputs, tight elements |
| `--radius-md` | 8px | Cards, buttons, dropdowns |
| `--radius-lg` | 12px | Modals, panels |
| `--radius-full` | 9999px | Badges, pills, status indicators |

---

## 6. Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08)` | Cards, subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` | Dropdowns, active panels |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, overlays |

---

## 7. Component Patterns

### Buttons
| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| Primary | `#1d6b5e` | `#FAF7F2` | None | Main CTA |
| Secondary | Transparent | `#1d6b5e` | `#1d6b5e` | Secondary actions |
| Ghost | Transparent | `#6b7280` | None | Tertiary, destructive cancel |
| Danger | `#C00000` | White | None | Destructive actions |

- Border radius: `--radius-md`
- Padding: `12px 20px`
- Font: Inter 14px, weight 500
- All buttons: active voice labels ("Save changes", "Add job", "Run analysis")

### Form Inputs
- Background: `--color-surface`
- Border: `--color-border`
- Border radius: `--radius-sm`
- Focus ring: `#1d6b5e` 2px outline
- Error state: `#C00000` border + error message below
- Padding: `10px 12px`

### Cards
- Background: `--color-surface`
- Border: `1px solid --color-border`
- Border radius: `--radius-md`
- Shadow: `--shadow-sm`
- Padding: `--space-6`

### Status Badges (Jobs)
| Status | Label | Color |
|---|---|---|
| Saved | S | `--color-text-secondary` |
| Applied | A | `--color-warning` |
| Interviewing | I | `--color-primary` |
| Networking | N | `--color-success` |

- Font: Inter 12px, weight 500
- Border radius: `--radius-full`
- Padding: `2px 8px`

### Priority Indicators
| Priority | Display | Color | Hex |
|---|---|---|---|
| 1 | ● | Error red | `#C00000` |
| 2 | ● | Medium teal | `#4a9e8e` |
| 3 | ● | Light teal | `#a8d5cd` |

### AI Interaction Surface Patterns
**Design Principle:** AI is a thinking partner, not a job search engine. The user controls the search. AI surfaces are always one tap away but never intrude — they wait for the user to engage.

| # | AI Surface | Pattern | Location |
|---|---|---|---|
| 1 | JD Analysis | On-demand button | Job Detail > Overview |
| 2 | Resume Recommendation | On-demand button | Job Detail > Resume tab |
| 3 | Resume Tailoring Suggestions | On-demand button | Job Detail > Resume tab |
| 4 | Story Match | On-demand button | Job Detail > Stories tab, Interview Prep |
| 5 | Interview Focus Areas + Questions | On-demand button | Job Detail > Interview Prep tab |
| 6 | Interviewer Research | On-demand button | Job Detail > Interview Prep tab |
| 7 | Skills Gap Analysis | On-demand button | Skills Gap section |
| 8 | Target Company Research | On-demand button | Company Detail |
| 9 | Networking Research & Outreach | On-demand button | Contact Detail |

**Consistent pattern across all 9 surfaces:**
- AI indicator: subtle `✦` icon + short label ("Analyze JD", "Recommend resume", "Suggest questions") as a Ghost button or secondary button
- Clicking triggers the AI interaction and displays results in an AI Content Container below
- AI Content Container: `#e8f2f0` background, clearly labeled "AI Suggestion", dismissible
- Never auto-runs. Never the first thing the user sees on a page.
- User owns the search. AI supports the thinking.

---

## 8. Sidebar

- Background: `--color-sidebar-bg` (`#1d6b5e`)
- Text/icons: `--color-sidebar-text` (`#FAF7F2`)
- Active item background: `--color-sidebar-active` (`#175a4e`)
- Width expanded: `240px`
- Width collapsed: `60px` (icons only)
- Toggle: user-controlled, preference persisted
- Gear icon: bottom of sidebar, always visible
- Transition: smooth collapse/expand (200ms ease)

---

## 9. Responsiveness

- **Floor:** Tablet (768px and up)
- **Sidebar:** Expanded on wide tablet/desktop; user can collapse to icon-only rail
- **Smaller screens:** Hamburger menu (out of v2 scope, accounted for in structure)
- **Layout:** Single column on narrow tablet, two-column where applicable on wider screens

---

## 10. Motion & Micro-interactions

- **Checklist item completion:** Subtle checkmark animation + item fade/strike (satisfying, not dramatic)
- **Sidebar collapse/expand:** 200ms ease transition
- **AI banner appearance:** Gentle fade-in on section load
- **Page transitions:** Minimal — content fade, no sliding panels
- **Hover states:** Subtle background shift on interactive elements
- **Principle:** Motion serves clarity, not decoration. Respect `prefers-reduced-motion`.

---

## 11. Copy & Voice Guidelines

- **Case:** Sentence case throughout (not Title Case for UI labels)
- **Voice:** Active, direct, encouraging — never apologetic, never generic
- **Errors:** Explain what happened and how to fix it. No vague messages.
- **Empty states:** An invitation to act, written in Connie's voice
- **AI prompts/callouts:** Clearly labeled as AI-generated. Never presented as user content.
- **Labels:** Name things by what the user controls, not how the system works

---

*Next artifact: Screen Map*
