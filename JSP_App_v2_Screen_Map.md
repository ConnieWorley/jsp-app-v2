# JSP App v2 — Screen Map
**Phase 3 Artifact | UX Designer Role**
*Last updated: June 21, 2026*

---

## How to Read This Map

- **Bold** = primary navigation destination (sidebar)
- *Italic* = secondary view or tab within a section
- [AI] = AI interaction surface present
- [→] = navigates to
- Indentation = hierarchy (child of parent above)

---

## Application Shell

```
┌─────────────────────────────────────────────────────────┐
│ SIDEBAR (persistent, collapsible)                       │
│  ├── Dashboard                                          │
│  ├── Jobs                                               │
│  ├── Resumes                                            │
│  ├── Stories                                            │
│  ├── Target Companies                                   │
│  ├── Networking                                         │
│  ├── Skills Gap                                         │
│  └── ⚙ Settings (gear icon, bottom)                    │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Dashboard

**Entry point for every session.**

```
Dashboard
├── Recent Activity (collapsible, default open)
│    └── Last 2–3 items touched → [→] respective detail page
├── Activity List (collapsible, default open)
│    ├── Filter: Stage
│    ├── Sort: Due Date
│    └── Checklist items due/overdue across all active jobs → [→] Job Detail > Checklist tab
├── Job Pipeline Snapshot (collapsible, default open)
│    └── Stage counts: Saved | Applied | Interviewing | Networking
└── Quick Stats (collapsible, default collapsed)
     └── Active applications, interviews scheduled, follow-ups due
```

---

## 2. Jobs

**Primary workflow section.**

```
Jobs
├── Jobs List (full page)
│    ├── Filter: Status (S/A/I/N)
│    ├── Filter: Stage
│    ├── Filter: Priority (1/2/3)
│    ├── Sort: Date Added, Priority, Company, Status
│    ├── Job Card: Company | Job Title | Status | Stage | Priority
│    └── [+ Add Job] → [→] Job Detail (new, blank)
│
└── Job Detail (full page, drill-down from list)
     ├── Header: Company, Job Title, Status, Stage, Priority
     ├── Tab: Overview
     │    ├── Job details (all fields)
     │    ├── JD paste field
     │    └── [AI] On-demand: JD analysis → [✦ Analyze JD]
     ├── Tab: Checklist
     │    ├── Checklist items (scrollable, sequential)
     │    ├── Completion triggers auto-calculated due dates
     │    ├── User override available on any due date
     │    └── [AI] On-demand prompt button per relevant checklist item → [✦ Get AI prompt]
     ├── Tab: Resume
     │    ├── Associated resume (selected from Resume library)
     │    ├── [AI] On-demand: resume recommendation → [✦ Recommend a resume]
     │    └── [AI] On-demand: tailoring suggestions → [✦ Suggest tailoring]
     ├── Tab: Stories
     │    ├── Associated stories for this role
     │    └── [AI] On-demand: in-context match → [✦ Find matching stories]
     └── Tab: Interview Prep
          ├── Interviewer research notes
          ├── [AI] On-demand: interviewer research → [✦ Research this interviewer]
          ├── [AI] On-demand: focus areas → [✦ Suggest focus areas]
          └── [AI] On-demand: questions to ask → [✦ Suggest questions to ask]
```

---

## 3. Resumes

**Library of tailored resume versions.**

```
Resumes
├── Resume Library (card-based, full page)
│    ├── Resume cards: Title, target role/version label, last modified
│    ├── [+ Add Resume] → [→] Resume Detail (new, blank)
│    └── Select resume → associate to a Job
│
└── Resume Detail (full page, drill-down from library)
     ├── Resume metadata (title, version label, notes)
     ├── Resume content / upload
     └── Associated jobs
```

---

## 4. Stories

**STAR-format experience library with AI match.**

```
Stories
├── Story Library (full page)
│    ├── Search: keyword
│    ├── Filter: skill, theme, role
│    ├── Story cards: title, skills tags, last used
│    └── [+ Add Story] → [→] Story Detail (new, blank)
│
└── Story Detail (full page, drill-down from library)
     ├── Story content (STAR format fields)
     ├── Skills/theme tags
     └── Usage history (which jobs/interviews this story has been used for)

[AI] In-context match (triggered from Job Detail > Stories tab or Interview Prep tab)
     ├── Context: current job title, JD, stage
     └── Returns: ranked story suggestions with relevance rationale
```

---

## 5. Target Companies

**Independent company research and tracking.**

```
Target Companies
├── Companies List (full page)
│    ├── Filter: Status (Active, Watching, Archived)
│    ├── Sort: Name, Date Added, Priority
│    ├── Company card: Company Name, Industry, Status, Notes preview
│    └── [+ Add Company] → [→] Company Detail (new, blank)
│
└── Company Detail (full page, drill-down from list)
     ├── Company metadata (name, industry, size, website, notes)
     ├── Contact log
     ├── Associated jobs (jobs at this company)
     └── [AI] On-demand prompt button: company research assistance
```

---

## 6. Networking

**Contact tracking and relationship management.**

```
Networking
├── Contacts List (full page)
│    ├── Filter: Relationship type, Company, Follow-up due
│    ├── Sort: Name, Last Contact, Follow-up Date
│    ├── Contact card: Name, Company, Role, Last Contact, Follow-up Due
│    └── [+ Add Contact] → [→] Contact Detail (new, blank)
│
└── Contact Detail (full page, drill-down from list)
     ├── Contact metadata (name, company, role, LinkedIn, email, notes)
     ├── Interaction log (date, type, notes)
     ├── Follow-up due date (auto-calculated or manual)
     └── [AI] On-demand prompt button: networking research and outreach assistance
```

---

## 7. Skills Gap

**Gap analysis against target roles.**

```
Skills Gap
├── Skills Gap Overview (full page)
│    ├── Target role(s) defined
│    ├── Current skills inventory
│    ├── [AI] On-demand: gap analysis → [✦ Analyze my skills gap]
│    └── [+ Add Target Role] / [Edit Skills]
│
└── Gap Detail (per target role)
     ├── Role requirements vs. current skills
     ├── Gap items with suggested actions
     └── Associated jobs targeting this role
```

---

## 8. Settings

**Low-frequency configuration. Accessed via gear icon.**

```
Settings
├── Follow-Up Schedule Setup (US-S009)
│    └── Due date offset values per checklist item type
├── Checklist Template
│    └── Master checklist template management (add, edit, reorder items)
├── User Preferences
│    └── Sidebar default state, display preferences
└── Account
     └── Profile info, auth (v3 scope noted)
```

---

## Navigation Flow Summary

```
Dashboard
  └── Activity List item → Job Detail > Checklist tab
  └── Pipeline Snapshot → Jobs List (filtered by stage)

Jobs List → Job Detail
  Job Detail tabs: Overview | Checklist | Resume | Stories | Interview Prep
  Stories tab → Story Library (in-context match)
  Resume tab → Resume Library (associate)

Stories Library → Story Detail
Resumes Library → Resume Detail
Target Companies List → Company Detail
Networking List → Contact Detail
Skills Gap Overview → Gap Detail

Settings (gear icon, always accessible)
```

---

## Out of Scope — v2

- Mobile (phone-sized) layout — hamburger nav structure accounted for but not built
- Multi-user / team features (v3)
- Auth hardening (v3)
- URL-based JD import (paste-only in v2)

---

*Next artifact: Component Inventory*
