# JSP App v2 — SDLC & Project Timeline
*Solo build | 30 hrs/week | Official target: July 15, 2026 | Internal target: July 4, 2026*

---

## Phase Overview

| Phase | Description | Est. Hours | Cumulative |
|---|---|---|---|
| 1 — Discovery & Requirements | User flow, feature matrix, backlog | 8 | 8 |
| 2 — Architecture & Stack Decision | Tech stack, data model, API structure | 4 | 12 |
| 3 — Environment Setup | Repo, Supabase, Vite/React scaffold, Claude API | 3 | 15 |
| 4 — Core Build: Setup & Auth | Auth, onboarding wizard, all setup features | 12 | 27 |
| 5 — Core Build: JD Intake & Scoring | JD import, fit scoring, gap analysis, story match | 10 | 37 |
| 6 — Core Build: Tailoring & Status | Resume checklist, AI coach, status tracking | 8 | 45 |
| 7 — Core Build: Networking | Networking checklist, AI networking coach | 6 | 51 |
| 8 — Core Build: Interview Prep | Story match, elevator pitch, prep checklist, recommendations | 6 | 57 |
| 9 — Core Build: Dashboard & Action List | Home screen, action list, in-app reminders | 6 | 63 |
| 10 — Integration & QA | End-to-end testing, bug fixes, edge cases | 8 | 71 |
| 11 — Polish & Deploy | UI cleanup, responsive design, deployment | 6 | 77 |
| 12 — Case Study Documentation | Portfolio write-up, artifact compilation | 4 | 81 |

**Total estimated hours: 81**

---

## Reality Check — Revised Schedule

| | |
|---|---|
| Phase 1 complete (already done) | ~8 hrs |
| Remaining estimated hours | ~73 hrs |
| Available hours at 30 hrs/week | ~90 hrs by July 15 |
| Buffer | ~17 hrs |

**Internal target: July 4** — full build and QA complete
**Official target: July 15** — buffer for polish, deploy, case study, and the unexpected

---

## Week-by-Week Schedule

| Week | Dates | Hours | Phases | Deliverables |
|---|---|---|---|---|
| Week 1 | June 18–22 | 30 | 2, 3, 4 (start) | Architecture doc, environment running, auth + onboarding wizard started |
| Week 2 | June 23–29 | 30 | 4 (finish), 5 | Setup features complete, JD intake + scoring + gap analysis done |
| Week 3 | June 30–July 6 | 30 | 6, 7, 8, 9 | Tailoring, networking, interview prep, dashboard all complete — internal target met |
| Week 4 | July 7–13 | 30 | 10, 11, 12 | QA, polish, deploy, case study — official target buffer |
| **Total** | | **120 hrs available** | | **~40 hrs buffer for overruns** |

---

## Detailed Phase Breakdown

### Phase 1 — Discovery & Requirements ✅ COMPLETE
*~8 hours | Done*
- Project kickoff and requirements gathering
- User flow documentation
- Feature matrix
- Agile backlog (all epics and user stories)
- Stakeholder register
- BPMN diagrams (current state + future state Stages 0–5)

---

### Phase 2 — Architecture & Stack Decision
*~4 hours | Start: June 18*
- Confirm tech stack: React + Vite, Supabase, Anthropic API
- Define data model: users, jobs, resumes, stories, checklists, due dates, follow-up schedule offsets
- Define API structure: which calls hit Supabase vs. Claude API
- Document architecture decisions as SDLC artifact
- Prompt engineering strategy documented

---

### Phase 3 — Environment Setup
*~3 hours*
- Initialize GitHub repo
- Scaffold React + Vite project
- Configure Supabase project (auth, storage, tables)
- Connect Anthropic API
- Confirm local dev environment running end to end
- Claude Code enabled for heavy lifting

---

### Phase 4 — Core Build: Setup & Auth
*~12 hours*
- Supabase Auth: signup, login, logout, session persistence (US-CC01)
- Onboarding wizard shell and navigation
- Ideal Company Quiz (US-S001)
- Role Target Profile (US-S002)
- Resume Library: upload, label, map to role target (US-S003)
- Pitch Library (US-S004)
- Storybank: STAR entry, AI assist, tagging (US-S005)
- Job Board Preferences + tip content (US-S006)
- Elevator Pitch Builder (US-S007)
- Setup completion state tracking (US-S008)
- Follow-Up Schedule: offset configuration, default values, settings revisability (US-S009)
- Test-as-you-build: each feature validated before moving on

---

### Phase 5 — Core Build: JD Intake & Scoring
*~10 hours*
- JD import: URL scrape with paste fallback (US-J01)
- JD fit scoring: three-score unified scorecard (US-J02)
- Skills gap analysis: hard vs. soft gaps (US-J03)
- Training recommendations: curated static list (US-J04)
- Story match engine: rank and surface top 4 (US-J05)
- Prompt engineering: scoring and matching prompts documented
- Test-as-you-build

---

### Phase 6 — Core Build: Tailoring & Status
*~8 hours*
- Resume tailoring checklist: default items, auto-calculated due dates from US-S009, custom items (US-A01)
- AI resume coach: context-aware, scoped per job (US-A02)
- Application status tracking: status field, trigger logic (US-A03)
- Status change → checklist trigger wiring
- Test-as-you-build

---

### Phase 7 — Core Build: Networking
*~6 hours*
- Networking checklist: trigger on Applied, default items, auto-calculated due dates (US-N01)
- AI networking coach: context-aware drafts, revision loop (US-N02)
- Prompt engineering: outreach drafting prompts documented
- Test-as-you-build

---

### Phase 8 — Core Build: Interview Prep
*~6 hours*
- Storybank match re-surface on Interview Scheduled (US-I01)
- Elevator pitch review and edit from Interview Prep view (US-I02)
- Interview prep checklist: trigger, default items, auto-calculated due dates, interviewer research AI prompt (US-I03)
- External practice tool recommendations: static curated list (US-I04)
- Prompt engineering: interviewer research prompt documented
- Test-as-you-build

---

### Phase 9 — Core Build: Dashboard & Action List
*~6 hours*
- Home screen: action list as primary view (US-D01)
- Active jobs snapshot: grouped by stage (US-D02)
- Quick Add JD shortcut (US-D03)
- Setup completion prompt / feature gating (US-D04)
- Unified action list: aggregated due dates, grouped view, real-time cascade on completion (US-AL01)
- In-app reminders: notification badge, enable/disable setting (US-AL02)
- Test-as-you-build

---

### Phase 10 — Integration & QA
*~8 hours*
- End-to-end run-through of all user flows
- Cross-feature integration testing (status triggers, checklist propagation, due date cascade, action list sync)
- Edge case testing: empty states, incomplete setup, missing data
- Bug fixes
- Formal QA checklist documented as SDLC artifact

---

### Phase 11 — Polish & Deploy
*~6 hours*
- UI cleanup and consistency pass
- Responsive design check (desktop primary, mobile acceptable)
- Performance review: API call efficiency, Supabase query optimization
- Deploy to production (Vercel or Netlify recommended)
- Smoke test on production build

---

### Phase 12 — Case Study Documentation
*~4 hours*
- Compile PM artifacts: user flow, feature matrix, backlog, SDLC, budget tracker, stakeholder register, BPMN diagrams
- Write case study narrative: problem → process analysis → AI integration → build → outcome
- Integrate into cwconsultingusa.com: app + case study side by side
- Final portfolio review

---

## Prompt Engineering Log
*Documented here as SDLC artifact — updated as prompts are built and refined*

| Feature | Prompt Purpose | Status |
|---|---|---|
| JD Fit Scoring | Score resume, company, and role match against JD | Not started |
| Skills Gap Analysis | Identify hard and soft gaps between JD and resume | Not started |
| Story Match | Rank storybank entries by JD relevance | Not started |
| AI Resume Coach | Context-aware resume tailoring guidance | Not started |
| AI Networking Coach | Draft outreach messages by recipient type | Not started |
| Storybank STAR Assist | Prompt user to complete thin STAR sections | Not started |
| Elevator Pitch Builder | Guide user through 12-second pitch construction | Not started |
| Interviewer Research Prompt | Surface what to research, what to note, and how to use findings in the interview | Not started |

---

## Discovery / Requirements — Labor Log
*Backfill manually; used as baseline for future project scoping*

| Date | Activity | Hours |
|---|---|---|
| June 17, 2026 | Project kickoff, requirements gathering, user flow | TBD |
| June 18, 2026 | Feature matrix, backlog (all epics) | TBD |
| June 19, 2026 | Stakeholder register, BPMN diagrams (current + future state) | TBD |
| | **Total Discovery Hours** | **TBD** |

---
*Next: Stack confirmation and data model (Phase 2)*
