# JSP App v2 — Annotated Layout Spec
**Phase 3 Artifact | UX Designer Role**
*Last updated: June 21, 2026*

---

## How to Read This Spec

Each major view is described with:
- **Layout structure** — ASCII wireframe showing spatial arrangement
- **Annotations** — behavioral and design notes Claude Code needs to implement correctly
- **Component references** — maps to Component Inventory
- **AI surfaces** — explicitly called out with trigger and behavior

Dimensions are relative. Sidebar widths and breakpoints are defined in the Design System Doc.

---

## 1. Application Shell

```
┌──────────────────────────────────────────────────────────────────┐
│ ┌────────┐ ┌────────────────────────────────────────────────┐    │
│ │        │ │                                                │    │
│ │        │ │            MAIN CONTENT AREA                   │    │
│ │ SIDE   │ │                                                │    │
│ │  BAR   │ │                                                │    │
│ │        │ │                                                │    │
│ │        │ │                                                │    │
│ │        │ │                                                │    │
│ │        │ │                                                │    │
│ │  ⚙    │ │                                                │    │
│ └────────┘ └────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Sidebar background: `#1d6b5e`. Text and icons: `#FAF7F2`
- Sidebar expanded: 240px. Collapsed: 60px (icons only)
- Toggle button: visible at top of sidebar. Persists preference to local state
- Active nav item: `#175a4e` background, full-width highlight
- Gear icon: pinned to bottom of sidebar, always visible in both states
- Collapsed state: show icon only. Tooltip on hover shows section label
- Main content area background: `#FAF7F2`
- No top nav bar — sidebar is the sole navigation chrome
- Sidebar and main content area are siblings in the layout, not nested

---

## 2. Dashboard

```
┌────────────────────────────────────────────────────────────────┐
│ Dashboard                                          [page title] │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Recent Activity                                    [−]   │   │
│ │  • [Item] Company — Checklist item name        [link →]  │   │
│ │  • [Item] Company — Checklist item name        [link →]  │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│ ┌───────────────────────────────┐ ┌──────────────────────────┐ │
│ │ Activity List          [−]    │ │ Job Pipeline       [−]   │ │
│ │ Filter: [Stage ▾]             │ │                          │ │
│ │ Sort:   [Due Date ▾]          │ │  Saved        3          │ │
│ │                               │ │  Applied      7          │ │
│ │  ● Item overdue   [Company]   │ │  Interviewing 2          │ │
│ │  ● Item due today [Company]   │ │  Networking   4          │ │
│ │  ● Item due soon  [Company]   │ │                          │ │
│ │  ...                          │ │                          │ │
│ └───────────────────────────────┘ └──────────────────────────┘ │
│                                                                 │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Quick Stats                                        [+]   │   │
│ │ (collapsed by default)                                   │   │
│ └──────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Page title: Playfair Display H1, `#1a2333`
- Each dashboard section has a collapse toggle [−] / expand toggle [+] in the top right corner
- Recent Activity: max 3 items. Each item links directly to the relevant Job Detail > Checklist tab
- Activity List: left column, approximately 60% width. Pipeline Snapshot: right column, approximately 40% width
- Activity List items: overdue items display due date in `#C00000`. Due today in `--color-warning`. Upcoming in `--color-text-secondary`
- Pipeline Snapshot: simple label + count rows. No chart or visualization. Clean and scannable
- Quick Stats: collapsed by default. Contains active application count, interviews scheduled, follow-ups due
- Dashboard sections stack to single column on narrow tablet widths

---

## 3. Jobs List

```
┌────────────────────────────────────────────────────────────────┐
│ Jobs                                    [page title]           │
├────────────────────────────────────────────────────────────────┤
│ Filter: [Status ▾] [Stage ▾] [Priority ▾]   Sort: [Sort by ▾] │
│                                                    [+ Add Job] │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ [●1] Acme Corp          Senior PM           [A] Applied  │   │
│ │      Stage: Phone Screen                                 │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ [●2] Globex              Operations Lead    [I] Interview │   │
│ │      Stage: Final Round                                  │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ [●3] Initech             Process Analyst    [S] Saved    │   │
│ │      Stage: —                                            │   │
│ └──────────────────────────────────────────────────────────┘   │
│  ...                                                           │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Filter bar sits above the list, below the page header. Filters and sort on same row
- [+ Add Job] button: right-aligned, primary button style
- Job card: full width, card component with `--shadow-sm`
- Card left edge: Priority indicator dot (colored per priority level)
- Card content: Company name (H3, Inter 600) + Job Title (body) on first line. Status badge right-aligned on same line
- Second line: Stage label in `--color-text-secondary`
- Clicking anywhere on card navigates to Job Detail (full page)
- Empty state: "Nothing in the pipeline yet — let's change that. Add your first opportunity." + [+ Add Job] button
- Filter/sort state persists within the session

---

## 4. Job Detail

```
┌────────────────────────────────────────────────────────────────┐
│ ← Jobs                                      [breadcrumb back]  │
│ Acme Corp — Senior PM                       [page title]       │
│ [●1 Priority]  [A Applied]  [Phone Screen]  [Edit] [Archive]   │
├────────────────────────────────────────────────────────────────┤
│ [Overview] [Checklist] [Resume] [Stories] [Interview Prep]     │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│   TAB CONTENT AREA (see tab specs below)                       │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Breadcrumb "← Jobs" navigates back to Jobs List, preserving filter/sort state
- Page title: Company — Job Title, Playfair Display H1
- Header metadata row: Priority indicator, Status badge, Stage label, [Edit] and [Archive] action buttons
- Tab bar: Overview | Checklist | Resume | Stories | Interview Prep
- Active tab: `#1d6b5e` underline indicator, Inter 600
- Tab content area fills remaining page height, scrollable within tab

---

## 4a. Job Detail — Overview Tab

```
┌────────────────────────────────────────────────────────────────┐
│ Job Details                                                     │
│ ┌──────────────────────────────────────────────────────────┐    │
│ │ Location         │  Salary Range                        │    │
│ │ [value]          │  [value]                             │    │
│ └──────────────────────────────────────────────────────────┘    │
│                                                                 │
│ Source          [dropdown]                                      │
│ Date Added      [date]                                          │
│ Notes           [textarea]                                      │
│                                                                 │
│ Job Description                                                 │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ [Paste JD here...]                                       │   │
│ │                                                          │   │
│ └──────────────────────────────────────────────────────────┘   │
│                              [✦ Analyze JD]                    │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- [✦ Analyze JD] button: appears below JD paste field once content exists. Ghost/secondary button style. On-demand — never auto-runs
- Clicking expands AI Content Container below the button: `#e8f2f0` background, labeled "AI Suggestion", dismissible
- Button absent until JD content exists
- Job details: two-column grid for short fields, full width for longer fields and textarea
- JD paste field: large textarea, placeholder text "Paste the job description here"
- All fields auto-save on blur (no explicit save button for individual fields)
- [Edit] in page header opens all fields for editing. Read-only view is default

---

## 4b. Job Detail — Checklist Tab

```
┌────────────────────────────────────────────────────────────────┐
│ Checklist — Phone Screen Stage              [progress: 3 / 8]  │
├────────────────────────────────────────────────────────────────┤
│ ☑ Research company                          Completed Jun 18   │
│ ☑ Tailor resume                             Completed Jun 19   │
│ ☑ Write cover letter                        Completed Jun 20   │
│ ─────────────────────────────────────────────────────────────  │
│ ☐ Submit application                        Due Jun 22         │
│                                                                 │
│ ☐ Follow up if no response                  Due Jun 29         │
│   [✦ Get AI prompt]                                            │
│                                                                 │
│ ☐ Prepare for phone screen                  Due Jul 1          │
│   [✦ Get AI prompt]                                            │
│                                                                 │
│ ☐ Send thank you note                       Due Jul 3          │
│   [✦ Get AI prompt]                                            │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Progress indicator: top right, "X / Y items complete" for current stage
- Completed items: checkmark filled, label dimmed, completion date shown. Subtle animation on completion
- Divider line separates completed from remaining items
- Due dates: auto-calculated from prior item completion + offset values from Settings. Shown in `--color-text-secondary`
- Overdue due dates: `#C00000`
- Due date is tappable → opens date override popover
- [✦ Get AI prompt] button: appears only on checklist items that have an associated AI prompt. Teal icon, Ghost button style
- Clicking [✦ Get AI prompt] expands an inline AI Prompt Panel beneath the item (see AI Interaction Components)
- AI Prompt Panel: `#e8f2f0` background, clearly labeled "AI Suggestion", dismissible
- Checklist is scoped to current stage. Items for future stages visible but clearly delineated

---

## 4c. Job Detail — Resume Tab

```
┌────────────────────────────────────────────────────────────────┐
│ Associated Resume                                               │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Operations Lead — v2              Last modified Jun 15   │   │
│ │                              [Change Resume] [View →]    │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│ No resume associated yet?                                       │
│ [Select Resume from Library]                                    │
│                                                                 │
│              [✦ Recommend a resume]  [✦ Suggest tailoring]     │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- [✦ Recommend a resume] button: on-demand. Requires JD to exist. Analyzes JD against resume library and recommends best match with rationale. Result appears in AI Content Container below
- [✦ Suggest tailoring] button: on-demand. Requires both a resume associated and JD to exist. Suggests tailoring edits. Result appears in AI Content Container below
- Both buttons absent until JD exists. [✦ Suggest tailoring] additionally absent until resume is associated
- AI Content Container: `#e8f2f0` background, labeled "AI Suggestion", dismissible
- Neither button auto-runs. User decides when to consult AI
- [Change Resume] replaces the associated resume. [View →] opens Resume Detail

---

## 4d. Job Detail — Stories Tab

```
┌────────────────────────────────────────────────────────────────┐
│ Stories for this Role                    [✦ Find matching stories] │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Led cross-functional redesign        [Operations] [PM]   │   │
│ │ Used in: Application, Interview Prep                     │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Reduced vendor costs 30%             [Finance] [Ops]     │   │
│ │ Used in: Application                                     │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│ [+ Associate a story manually]                                  │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- [✦ Find matching stories] button: triggers AI in-context story match (modal or side panel)
- AI Story Match Panel: ranked list of suggested stories with relevance rationale. `#e8f2f0` background. User selects which to associate
- Manually associated stories shown as cards with skill/theme tags and usage history
- [+ Associate a story manually] opens Story Library for manual selection
- Empty state: "No stories linked yet. Use AI match to find the right ones, or add them manually."

---

## 4e. Job Detail — Interview Prep Tab

```
┌────────────────────────────────────────────────────────────────┐
│ Interviewer Research                                            │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Interviewer name, role, notes...                         │   │
│ │                          [✦ Research this interviewer]   │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│ Prepared Questions                                              │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ [Your questions here...]                                 │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│       [✦ Suggest focus areas]  [✦ Suggest questions to ask]    │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- [✦ Suggest focus areas] button: on-demand. Based on job title, JD, and current stage. Result appears in AI Content Container below
- [✦ Suggest questions to ask] button: on-demand. Stage-aware — phone screen questions differ from final round. Result appears in AI Content Container below
- [✦ Research this interviewer] button: on-demand per interviewer (US-I03). Expands inline AI Prompt Panel beneath the field
- All three buttons are on-demand. Nothing auto-runs on tab open
- AI Content Container: `#e8f2f0` background, labeled "AI Suggestion", dismissible
- Prepared Questions: freeform textarea, user-owned content — visually distinct from AI content

---

## 5. Stories Library

```
┌────────────────────────────────────────────────────────────────┐
│ Stories                                         [page title]   │
├────────────────────────────────────────────────────────────────┤
│ [Search stories...]   Filter: [Skill ▾] [Theme ▾]  [+ Add]    │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Led cross-functional redesign        [Operations] [PM]   │   │
│ │ Last used: Jun 20 · Used in 2 applications               │   │
│ └──────────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Reduced vendor costs 30%             [Finance] [Ops]     │   │
│ │ Last used: Jun 15 · Used in 1 application                │   │
│ └──────────────────────────────────────────────────────────┘   │
│  ...                                                           │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Search: keyword search across story title and content
- Filter: by skill tag and theme tag (checkbox group dropdowns)
- Story cards: title, skill/theme tags as pills, last used date and usage count
- Clicking card navigates to Story Detail (full page)
- Empty state: "Your experience is already here. Let's get it out of your head and into the app." + [+ Add Story]

---

## 6. Skills Gap

```
┌────────────────────────────────────────────────────────────────┐
│ Skills Gap                                      [page title]   │
├────────────────────────────────────────────────────────────────┤
│ Target Roles                            [+ Add Target Role]    │
│ ┌──────────────────────────────────────────────────────────┐   │
│ │ Operations Analyst                        [View gaps →]  │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│ Your Skills                                      [Edit Skills] │
│ [skill tag] [skill tag] [skill tag] ...                        │
│                                                                 │
│                              [✦ Analyze my skills gap]         │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- [✦ Analyze my skills gap] button: on-demand. Requires at least one target role and skills to exist. Result appears in AI Content Container below
- AI Content Container: `#e8f2f0` background, labeled "AI Suggestion", dismissible
- Button absent until both target roles and skills exist
- [✦ Analyze my skills gap] can be re-triggered any time after editing skills or target roles
- Empty state (no target roles): "Add a target role and we will take a look at where you stand." + [+ Add Target Role]
- Target Roles: list of defined target roles, each linking to Gap Detail view
- Your Skills: displayed as pill tags, editable via [Edit Skills]

---

## 7. Settings

```
┌────────────────────────────────────────────────────────────────┐
│ Settings                                        [page title]   │
├────────────────────────────────────────────────────────────────┤
│ ▼ Follow-Up Schedule                                           │
│   Configure the number of days between checklist steps.        │
│   [Item label]                    Offset: [  7  ] days         │
│   [Item label]                    Offset: [  3  ] days         │
│   ...                                            [Save]        │
│                                                                 │
│ ▼ Checklist Template                                           │
│   Manage the master checklist applied to all new jobs.         │
│   ☰ [Item label]          [Edit] [Delete]                      │
│   ☰ [Item label]          [Edit] [Delete]                      │
│   ...                          [+ Add Item] [Reorder mode]     │
│                                                                 │
│ ▼ Preferences                                                  │
│   Sidebar default: [Expanded ▾]                                │
│                                                                 │
│ ▼ Account                                                      │
│   Profile info (v3 scope)                                      │
└────────────────────────────────────────────────────────────────┘
```

**Annotations:**
- Settings sections are collapsible. All expanded by default
- Follow-Up Schedule: number inputs for offset values per checklist item type. [Save] button explicit — this is not auto-save
- Checklist Template: drag-to-reorder via ☰ handle. [Edit] opens inline edit. [Delete] triggers confirmation dialog
- Preferences: sidebar default state (expanded or collapsed). Persists to user preferences
- Account section: placeholder for v3 auth/profile features. Visible but clearly scoped out

---

## Layout Spec Notes for Claude Code

1. **Tailwind classes only** — no inline styles. All color values via CSS custom properties defined in the Design System
2. **shadcn components** — import and customize per Component Inventory. Do not override shadcn defaults with inline styles
3. **Auto-save pattern** — field-level auto-save on blur for Job Detail fields. Explicit save button only for Settings offsets and destructive actions
4. **AI content rule** — every AI-generated content block must use `bg-[#e8f2f0]` or the equivalent CSS variable. Never styled identically to user content
5. **Empty states** — every list and section must have an empty state component. Copy provided in Design System Doc Section 1; rewrite in Connie's final voice before Phase 5
6. **Responsive behavior** — sidebar collapses to icon rail on narrow tablet. Dashboard sections stack to single column. All layouts fluid within tablet-and-up floor
7. **Checklist completion animation** — subtle only. Respect `prefers-reduced-motion`
8. **Confirmation dialogs** — required before any destructive action (delete, archive). Use `AlertDialog` from shadcn

---

*Phase 3 complete. All four artifacts produced:*
*Design System Doc · Screen Map · Component Inventory · Annotated Layout Spec*
