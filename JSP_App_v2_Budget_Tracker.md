# JSP App v2 — Budget Tracker
*Labor rate: $150/hr | Target: July 15, 2026*

---

## Labor Budget — By Phase

| Phase | Description | Est. Hours | Labor Cost |
|---|---|---|---|
| 1 — Discovery & Requirements | User flow, feature matrix, backlog | 8 | $1,200 |
| 2 — Architecture & Stack Decision | Tech stack, data model, API structure | 4 | $600 |
| 3 — Environment Setup | Repo, Supabase, Vite/React scaffold, Claude API | 3 | $450 |
| 4 — Core Build: Setup & Auth | Auth, onboarding wizard, all setup features | 12 | $1,800 |
| 5 — Core Build: JD Intake & Scoring | JD import, fit scoring, gap analysis, story match | 10 | $1,500 |
| 6 — Core Build: Tailoring & Status | Resume checklist, AI coach, status tracking | 8 | $1,200 |
| 7 — Core Build: Networking | Networking checklist, AI networking coach | 6 | $900 |
| 8 — Core Build: Interview Prep | Story match, elevator pitch, prep checklist, recommendations | 6 | $900 |
| 9 — Core Build: Dashboard & Action List | Home screen, action list, in-app reminders | 6 | $900 |
| 10 — Integration & QA | End-to-end testing, bug fixes, edge cases | 8 | $1,200 |
| 11 — Polish & Deploy | UI cleanup, responsive design, deployment | 6 | $900 |
| 12 — Case Study Documentation | Portfolio write-up, artifact compilation | 4 | $600 |
| **Total** | | **81 hrs** | **$12,150** |

---

## API & Tool Costs — Usage Assumptions

### Anthropic API (Claude Sonnet 4.6)
*Pricing as of June 2026: ~$3.00 per million input tokens / ~$15.00 per million output tokens*

| Feature | Calls Est. | Avg Input Tokens | Avg Output Tokens | Est. Monthly Cost |
|---|---|---|---|---|
| JD Fit Scoring (3 scores per JD) | 3 calls/JD | 2,000 | 500 | — |
| Skills Gap Analysis | 1 call/JD | 2,500 | 800 | — |
| Story Match | 1 call/JD | 3,000 | 600 | — |
| AI Resume Coach | ~10 turns/job | 1,500 | 400 | — |
| AI Networking Coach | ~8 turns/job | 1,500 | 500 | — |
| Storybank STAR Assist | ~3 calls/story | 800 | 300 | — |
| Elevator Pitch Builder | ~4 calls (one time setup) | 600 | 200 | — |

**Usage scenario: Active job search, 10 active JDs/month, moderate AI coaching use**

| Cost Component | Monthly Est. |
|---|---|
| JD processing (scoring + gap + story match) per 10 JDs | ~$0.80 |
| AI coaching sessions (resume + networking) per 10 jobs | ~$3.50 |
| Setup AI calls (storybank + pitch, one-time) | ~$0.15 |
| **Total API cost — active search month** | **~$4.50/month** |
| **Total API cost — light use month** | **~$1.50/month** |

---

### Tool & Infrastructure Costs

| Tool | Plan | Monthly Cost | Notes |
|---|---|---|---|
| Supabase | Free tier | $0 | Sufficient for v2 single user; upgrade at ~500MB storage |
| Vercel / Netlify | Free tier | $0 | Sufficient for v2 traffic |
| GitHub | Free tier | $0 | Private repo |
| Claude.ai (development) | Pro | $20/month | Used for planning, artifacts, and Claude Code sessions |
| **Total Monthly Tool Cost** | | **$20/month** | |

---

## Project Cost Summary

| Category | Cost |
|---|---|
| Labor (81 hrs @ $150/hr) | $12,150 |
| API costs — build phase (est. 4 weeks) | $18 |
| Tool costs — build phase (est. 4 weeks) | $20 |
| **Total Project Cost (v2)** | **$12,188** |

---

## Case Study Talking Points — Budget
- **Total project value at market rate: $12,150** for a fully scoped, AI-integrated web application
- **API cost to operate: ~$4.50/month** per active user — demonstrates low marginal cost at scale
- **Infrastructure cost: $0** in v2 on free tiers — intentional architecture decision
- **AI-assisted development reduced build time** vs. traditional solo development