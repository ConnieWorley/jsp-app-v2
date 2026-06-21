# JSP App v2 — Component Inventory
**Phase 3 Artifact | UX Designer Role**
*Last updated: June 21, 2026*

---

## How to Read This Inventory

- **shadcn/ui** = use shadcn component directly or with light customization
- **Custom** = build from scratch, no shadcn equivalent
- **shadcn + Custom** = shadcn base with significant brand/behavior customization
- [AI] = component involves AI interaction surface

---

## 1. Shell & Navigation

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| App Shell | Custom | — | Overall layout wrapper, sidebar + main content area |
| Sidebar | shadcn + Custom | — | Collapsible, 240px expanded / 60px collapsed, brand teal |
| Sidebar Nav Item | shadcn + Custom | — | Icon + label expanded, icon-only collapsed, active state |
| Sidebar Toggle Button | Custom | — | Collapse/expand control, persists preference |
| Gear Icon (Settings) | shadcn + Custom | — | Bottom of sidebar, always visible |
| Page Header | Custom | — | Page title (Playfair Display) + contextual actions |
| Breadcrumb | shadcn | `Breadcrumb` | List → Detail navigation |

---

## 2. Dashboard Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Dashboard Section | Custom | — | Collapsible wrapper with section title and toggle |
| Recent Activity Card | Custom | — | 2–3 items, links to respective detail pages |
| Activity List | Custom | — | Checklist items due/overdue across active jobs |
| Activity List Filter | shadcn + Custom | `Select` | Filter by Stage |
| Activity List Sort | shadcn + Custom | `Select` | Sort by Due Date |
| Pipeline Snapshot | Custom | — | Stage counts: Saved / Applied / Interviewing / Networking |
| Quick Stats Bar | Custom | — | Active applications, interviews scheduled, follow-ups due |

---

## 3. Layout & Container Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Page Container | Custom | — | Max-width wrapper, page-level padding |
| Card | shadcn + Custom | `Card` | Surface `#FDFAF5`, warm border, `--radius-md` |
| Divider | Custom | — | `--color-border`, horizontal rule |
| Section Header | Custom | — | H2 (Playfair Display) + optional action button |
| Tab Group | shadcn + Custom | `Tabs` | Job Detail tabs: Overview / Checklist / Resume / Stories / Interview Prep |
| Tab Panel | shadcn | `TabsContent` | Tab content area |
| Collapsible Section | shadcn + Custom | `Collapsible` | Dashboard sections, Settings sections |
| Split Layout | Custom | — | Two-column layout (list + detail where applicable) |

---

## 4. List & Table Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| List Page Header | Custom | — | Title, item count, filter/sort controls, [+ Add] button |
| Filter Bar | shadcn + Custom | `Select` | Reusable across Jobs, Companies, Networking, Stories |
| Sort Control | shadcn + Custom | `Select` | Reusable sort dropdown |
| Jobs List | Custom | — | Full page list of job cards |
| Job Card | Custom | — | Company, Job Title, Status badge, Stage, Priority indicator |
| Company Card | Custom | — | Company name, industry, status, notes preview |
| Contact Card | Custom | — | Name, company, role, last contact, follow-up due |
| Resume Card | Custom | — | Title, version label, last modified |
| Story Card | Custom | — | Title, skills tags, last used |
| Empty State | Custom | — | Illustration + encouraging copy in Connie's voice + CTA |

---

## 5. Form Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Text Input | shadcn + Custom | `Input` | Brand focus ring (`#1d6b5e`), warm border |
| Textarea | shadcn + Custom | `Textarea` | For JD paste, notes, story content |
| Dropdown (single select) | shadcn + Custom | `Select` | PostgreSQL enums rendered as dropdowns |
| Radio Group | shadcn + Custom | `RadioGroup` | Single-option fields where radio is preferred |
| Checkbox Group | shadcn + Custom | `Checkbox` | Multi-select fields (`text[]` arrays) |
| Date Picker | shadcn + Custom | `Calendar` + `Popover` | Due date override |
| Form Label | shadcn | `Label` | Inter 14px, weight 500 |
| Form Error Message | Custom | — | `#C00000`, below input field |
| Form Section | Custom | — | Grouped fields with section label |
| Save / Cancel Actions | Custom | — | Primary + Ghost button pair, bottom of form |

---

## 6. Button & Action Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Primary Button | shadcn + Custom | `Button` | `#1d6b5e` background, warm cream text |
| Secondary Button | shadcn + Custom | `Button` | Outlined, teal border and text |
| Ghost Button | shadcn + Custom | `Button` | Transparent, grey text |
| Danger Button | shadcn + Custom | `Button` | `#C00000` background, white text |
| Icon Button | shadcn + Custom | `Button` | Icon only, for toolbar actions |
| FAB (Floating Action Button) | Custom | — | [+ Add] on list pages, primary teal |
| AI Prompt Button | Custom | — | [AI] On-demand trigger within checklist items, company detail, contact detail |

---

## 7. Status & Indicator Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Status Badge | Custom | — | S / A / I / N, pill shape, color-coded |
| Priority Indicator | Custom | — | Colored dot: ● Priority 1 (red) / 2 (teal) / 3 (light teal) |
| Stage Label | Custom | — | Text label for current stage within status |
| Progress Indicator | Custom | — | Checklist completion progress (items done / total) |
| Due Date Label | Custom | — | Date display, overdue state in `#C00000` |
| AI On-Demand Button | Custom | — | [AI] ✦ icon + label, consistent across all 9 surfaces |
| Success Toast | shadcn + Custom | `Toast` | Completion confirmation, success green |
| Error Toast | shadcn + Custom | `Toast` | Error state, `#C00000` |

---

## 8. AI Interaction Components

**Design Principle:** AI is a thinking partner, not a job search engine. All AI surfaces are on-demand — never auto-appearing. The user controls when AI is consulted.

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| AI On-Demand Button | Custom | — | Consistent `✦` icon + short label across all 10 surfaces. Ghost or secondary button style |
| AI Content Container | Custom | — | Wrapper for all AI-generated output. `#e8f2f0` background, clearly labeled "AI Suggestion", dismissible. Used across all surfaces |
| AI Prompt Panel (inline) | Custom | — | Expands beneath the triggering button. Used in Checklists, Company Detail, Contact Detail |
| AI Story Match Panel | Custom | — | Modal or side panel with ranked story suggestions + relevance rationale. Triggered from Stories tab, Interview Prep |

---

## 9. Checklist Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Checklist Container | Custom | — | Scrollable, full checklist visible, lives in Job Detail > Checklist tab |
| Checklist Item | Custom | — | Checkbox, label, due date, completion state |
| Checklist Item (complete) | Custom | — | Subtle checkmark animation + visual completion treatment |
| Due Date Display | Custom | — | Auto-calculated from prior completion; overdue state |
| Due Date Override | shadcn + Custom | `Calendar` + `Popover` | User-editable due date per item |
| AI Prompt Button (inline) | Custom | — | [AI] Per relevant checklist item, on-demand |

---

## 10. Modal & Overlay Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Modal / Dialog | shadcn + Custom | `Dialog` | Confirmations, AI story match panel |
| Popover | shadcn + Custom | `Popover` | Date picker, quick info overlays |
| Tooltip | shadcn + Custom | `Tooltip` | Icon labels, collapsed sidebar item labels |
| Confirmation Dialog | shadcn + Custom | `AlertDialog` | Destructive action confirmation (delete, archive) |

---

## 11. Settings Components

| Component | Type | shadcn Component | Notes |
|---|---|---|---|
| Settings Page Layout | Custom | — | Form-based, clearly sectioned |
| Settings Section | shadcn + Custom | `Collapsible` | Follow-up Schedule, Checklist Template, Preferences, Account |
| Offset Input | shadcn + Custom | `Input` | Number input for due date offset values (US-S009) |
| Checklist Template Editor | Custom | — | Add, edit, reorder master checklist items |
| Drag Handle | Custom | — | Reorder checklist template items |

---

## Component Count Summary

| Category | shadcn | Custom | shadcn + Custom |
|---|---|---|---|
| Shell & Navigation | 1 | 3 | 3 |
| Dashboard | 0 | 5 | 2 |
| Layout & Container | 2 | 3 | 3 |
| List & Table | 0 | 9 | 2 |
| Form | 1 | 2 | 7 |
| Button & Action | 0 | 3 | 4 |
| Status & Indicator | 0 | 6 | 2 |
| AI Interaction | 0 | 4 | 0 |
| Checklist | 0 | 5 | 1 |
| Modal & Overlay | 0 | 0 | 4 |
| Settings | 0 | 3 | 2 |
| **Total** | **4** | **43** | **30** |

---

## Prompt Engineering Log — Additions Flagged in Phase 3

The following AI surfaces were identified during Phase 3 and require prompt entries in the Prompt Engineering Log. All are on-demand pattern (✦ button).

1. JD Analysis (Job Detail > Overview) — on-demand
2. Resume Recommendation (Job Detail > Resume tab) — on-demand *(added Phase 3)*
3. Resume Tailoring Suggestions (Job Detail > Resume tab) — on-demand
4. Story Match (Job Detail > Stories tab + Interview Prep) — on-demand
5. Interview Focus Areas (Job Detail > Interview Prep tab) — on-demand
6. Interview Questions to Ask (Job Detail > Interview Prep tab) — on-demand *(added Phase 3)*
7. Interviewer Research (Job Detail > Interview Prep tab, US-I03) — on-demand
8. Skills Gap Analysis (Skills Gap section) — on-demand
9. Target Company Research (Company Detail) — on-demand *(added Phase 3)*
10. Networking Research & Outreach (Contact Detail) — on-demand *(added Phase 3)*

---

*Next artifact: Annotated Layout Spec*
