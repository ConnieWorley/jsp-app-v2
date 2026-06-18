# JSP App v2 — Feature Matrix
*Organized by app stage | Leadership view (Epic level)*

**Version Key:**
- **v2** — Build now
- **v3** — Next release
- **CUT** — Out of scope
- **TBD** — Needs decision before build

---

## Dashboard / Home

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Action List View (Primary) | Landing screen leads with overdue / due today / upcoming across all active jobs | v2 | This IS the home screen for returning users; not a separate dashboard |
| Active Jobs Snapshot | Secondary section showing all jobs in progress, grouped by stage | v2 | Below the fold from the action list; quick status at a glance |
| Quick Add JD | Shortcut to enter a new JD from the home screen | v2 | Reduces friction for active searchers adding new opportunities |
| Setup Completion Prompt | If setup is incomplete, surface a banner directing user to finish | v2 | Replaces dashboard content for first-time users until setup is done |

---

## Stage 0 — Onboarding & Setup

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Ideal Company Quiz | Guided quiz to define company size, culture, industry, values, deal-breakers | v2 | Outputs Ideal Company Profile used for JD scoring downstream |
| Role Target Profile | User defines target titles, salary range, location preference (remote/hybrid/onsite) | v2 | Feeds JD fit scoring and job alert setup |
| Resume Library | Upload 2–3 master resumes mapped to different role targets | v2 | Supabase storage; versioning is v3 |
| Pitch Library | Store 2–3 tailored professional summary / pitch variants | v2 | AI-assisted drafting optional |
| Storybank | Build 5–6 behavioral stories in STAR format for interviews | v2 | AI assists with structure; used downstream in Interview Prep |
| Job Board Preferences | User selects 3–4 preferred job boards; app provides setup guidance | v2 | No direct integration — guidance + tips only in v2 |
| Job Board Data Tip | In-app tip referencing job board analytics resources — no name or attribution in v2 | v2 | Contact Sam Write after app concept is finalized; add attribution in future version if cleared |
| Elevator Pitch Builder | AI-assisted 12-second elevator pitch; built once, refined over time | v2 | Lives in Setup; surfaced again in Interview Prep stage |

---

## Stage 1 — JD Intake

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| JD Import / Scrape | Paste URL or raw JD text; AI parses key fields | v2 | URL scraping may have reliability issues — fallback to paste |
| JD Fit Scoring | Three scores: resume match, ideal company fit, role target fit | v2 | Presented as unified scorecard; all three run simultaneously |
| Skills Gap Analysis | AI identifies skills in JD missing from selected resume | v2 | Flags hard gaps (missing) vs. soft gaps (undersold) |
| Training Recommendations | For each skills gap, recommend external training resources | v2 | Curated list preferred over live search in v2 |
| Story Match | AI ranks storybank entries by relevance to this JD | v2 | Top 3 surfaced; full list accessible |

---

## Stage 2 — Application & Tailoring

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Resume Tailoring Checklist | Stage-triggered checklist: title change, skills alignment, gap fill, formatting | v2 | Checklist items assignable to due dates |
| AI Resume Coach | Conversational AI to assist with resume edits in context of the JD | v2 | Knows JD + selected master resume; does not write the resume for the user |
| Application Status Tracking | User updates status (Saved → Applied → Interview → Offer → Closed) | v2 | Status change triggers downstream stage checklists |

---

## Stage 3 — Networking & Outreach

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Networking Checklist | Triggered when status = Applied; includes hiring manager ID, outreach steps | v2 | Checklist items assignable to due dates |
| AI Networking Coach | Drafts LinkedIn messages, follow-ups, referral asks in context of JD + resume | v2 | Context-aware: knows JD, resume, user stories |
| LinkedIn Integration | Direct API integration for profile or messaging | v3 | API restrictions likely prohibitive; revisit for v3 |

---

## Stage 4 — Interview Prep

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Storybank Match (Interview) | Re-surfaces top 3 matched stories when status = Interview Scheduled | v2 | Same engine as Stage 1 story match; different trigger point |
| Elevator Pitch Review | Surfaces user's 12-sec pitch for review and practice before interview | v2 | Built in Setup; pulled forward here as a reminder |
| Interview Prep Checklist | Review stories, research interviewers, prepare questions to ask | v2 | Flagged for deeper expansion in a future session |
| Practice Interview Recommendations | In-app tips pointing to external interview practice tools | v2 | No native practice tool; external referrals only in v2 |
| Native Interview Practice | In-app mock interview via AI | v3 | Valuable but out of scope for v2 |

---

## Stage 5 — Action List & Reminders

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Unified Action List | Aggregates all checklist due dates across all jobs and stages | v2 | Shows overdue / due today / upcoming |
| In-App Reminders | Notification system within the app for due dates | v2 | No calendar integration in v2 — in-app only |
| Calendar Integration | Google Calendar / Outlook sync for due dates | v3 | Parked; in-app reminders cover v2 needs |

---

## Cross-Cutting Concerns

| Feature Area | Description | Version | Notes / Open Questions |
|---|---|---|---|
| Auth / User Accounts | Basic authentication so data persists between sessions | v2 | Supabase Auth; single user (you) in v2 |
| Multi-User / Team | Support for multiple job seekers under one account | v3 | — |
| Billing / Monetization | Subscription or pay-per-use model for external users | v3 | — |
| Returning User Flow | Experience for users re-entering an active search | v3 | — |
| Resume Version Control | Track changes to master resumes over time | v3 | — |

---
*Next: User stories and acceptance criteria per v2 feature area (backlog build-out)*