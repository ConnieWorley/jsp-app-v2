# Job Search Playbook App — v2

**A solo-built, AI-integrated web application for structured job searching.**  
Built as a functional tool and portfolio piece demonstrating process analysis, AI integration, and prompt engineering skills.

---

## What This Is

Job searching is a broken process. Most people apply, wait, and wonder — with no system, no consistency, and no visibility into where things stand.

This app is the playbook I wish I had. It guides a job seeker from initial setup through every stage of an active search: evaluating job postings, tailoring resumes, building a networking plan, and preparing for interviews.

This is not an AI job search tool. The job seeker does the thinking — AI provides the structure, the prompts, and the guardrails to help them think better. The goal is a more organized, more intentional search, not an outsourced one.

**v2** is a ground-up rebuild of an earlier prototype, scoped for a single user and designed as a portfolio deliverable alongside the working application.

---

## What It Does

**Setup (one time):**

- Guided quiz to define your ideal company profile  
- Role targeting: titles, salary range, location preference  
- Resume library: upload 2–3 master resumes mapped to different role types  
- Storybank: 5–6 behavioral STAR stories for interviews  
- Elevator pitch builder with AI-generated role-tailored variants  
- Job board preferences with setup guidance

**Active Search (per job posting):**

- Import a JD by URL or paste — AI parses it automatically  
- Fit scoring against three dimensions: resume match, ideal company fit, role target fit  
- Skills gap analysis with training resource recommendations  
- Resume tailoring checklist specific to each JD  
- AI Resume Coach: context-aware guidance tied to the JD and your resume

**Post-Application:**

- Status-triggered networking checklist (hiring manager ID, outreach plan, referral paths)  
- AI Networking Coach: drafts LinkedIn messages and follow-ups in context  
- Interview Prep: top storybank matches surfaced, elevator pitch review, prep checklist  
- Action List dashboard: overdue / due today / upcoming across all active jobs

---

## Tech Stack

*(Phase 2 — to be confirmed)*

Planned: React \+ Vite, Supabase (auth \+ database), Claude API (Anthropic), deployed via Vercel or Netlify.

---

## Project Approach

This was built using an agile methodology with full PM documentation from day one. I treated it as a real client engagement — not a side project — because the artifact trail is part of the point.

AI was used as a collaborative partner across every role: product management, prompt engineering, and development. Every decision is documented.

---

## Repository Structure

jsp-app-v2/

├── README.md

├── docs/

│   ├── JSP\_App\_v2\_User\_Flow\_Draft.md       ← Stage-by-stage user flow

│   ├── JSP\_App\_v2\_Feature\_Matrix.md        ← Feature scope by version (v2 / v3 / Cut / TBD)

│   ├── JSP\_App\_v2\_Backlog.md               ← Agile backlog: 18 v2 stories with acceptance criteria

│   ├── JSP\_App\_v2\_SDLC.md                  ← 12-phase plan, timeline, week-by-week schedule

│   ├── JSP\_App\_v2\_Budget\_Tracker.md        ← Budget narrative with API cost analysis

│   └── JSP\_App\_v2\_Budget\_Tracker.xlsx      ← Live spreadsheet: hours log \+ budget vs. actual

└── src/                                    ← Application code (Phase 3+)

---

## Project Metrics

| Item | Detail |
| :---- | :---- |
| Total estimated build hours | 81 hours |
| Labor value at market rate | $12,150 ($150/hr) |
| Estimated API cost per active user | \~$4.50/month |
| Infrastructure cost (v2) | $0 (free tiers) |
| Build target | July 15, 2026 |
| Internal target | July 4, 2026 |

---

## Status

**Phase 1 — Discovery & Requirements: Complete**  
User flow locked. Feature matrix, backlog, SDLC, and budget tracker finalized.  
Phase 2 (Architecture & Stack) begins next.

---

## About

Built by Connie Worley — process analyst and AI integration consultant.  
Portfolio: [connieworley.netlify.app](https://connieworley.netlify.app/)  

