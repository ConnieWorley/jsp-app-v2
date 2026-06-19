# JSP App v2 — Stakeholder Register
*Solo build | All roles filled by Connie Worley | Role identities assigned for process clarity and portfolio documentation*

---

## Purpose

This register defines the key stakeholders for JSP App v2 and the role each plays in the project. Although this is a solo build, roles are explicitly assigned to support clear process documentation, credible portfolio presentation, and a foundation for scaling in v3.

---

## Stakeholder Definitions

---

### End User — Job Seeker
**Filled by:** Connie Worley (v2 sole user)

The person actively navigating a job search. Has a real, felt problem: the search process is fragmented, inconsistent, and draining without a structured system to manage it. Makes all decisions about how to pursue opportunities; the app provides structure, prompts, and guardrails — it does not replace the job seeker's thinking or judgment.

**Goals:**
- Manage an active job search without losing track of opportunities, tasks, or preparation steps
- Apply to roles with confidence that resume and materials are tailored and ready
- Walk into interviews prepared, not scrambling

**Constraints:**
- Limited time and cognitive bandwidth during an already stressful process
- Cannot afford a tool that adds friction or requires constant maintenance

**v3 Note:** In v3, the End User role expands to a defined persona as part of documenting the scaling of the process — from a single user solving their own problem to a repeatable product serving a broader market. Persona development is a planned v3 planning artifact.

---

### Product Owner
**Filled by:** Connie Worley

Holds the product vision and business case. Prioritizes the backlog, owns scope decisions, and is accountable for whether the product delivers value to the end user. The voice of the market and the monetization strategy. Makes final calls on v2 vs. v3 feature placement and defines what "done" looks like.

**Key responsibilities:**
- Backlog prioritization and scope management
- v2 / v3 / Cut decisions
- Monetization strategy (v3)
- Acceptance of delivered features

---

### Project Manager
**Filled by:** Connie Worley

Owns the SDLC, timeline, budget, and risk. Keeps the build on track and artifacts current. Accountable for delivery against the July 15, 2026 official target (July 4 internal target). Maintains the project budget tracker and flags schedule or scope risk early.

**Key responsibilities:**
- SDLC and phase tracking
- Budget vs. actual monitoring
- Risk identification and mitigation
- Artifact inventory and currency

---

### Process Analyst
**Filled by:** Connie Worley

Owns the "before" and "after" — documents the broken process, diagnoses root causes, and defines the redesigned workflow. The BPMN diagrams and process documentation live here. This role is the core of the portfolio narrative: broken process → diagnosis → AI-integrated redesign → working product.

**Key responsibilities:**
- Current-state process documentation (the problem)
- Root cause and gap analysis
- Future-state process design (the solution)
- BPMN diagrams and workflow artifacts
- Handoff of process specs to UX Designer and Systems Analyst

---

### UX Designer
**Filled by:** Connie Worley

Owns the user flow, interaction design, and interface decisions. Translates process flows into screens and experiences. Responsible for ensuring the app reduces friction for a user who is already under stress — not a power user, not a developer, just someone trying to get hired.

**Key responsibilities:**
- User flow documentation
- Wireframes and interaction decisions
- Navigation and information architecture
- Handoff of UX specs to Developer

---

### Systems Analyst
**Filled by:** Connie Worley

Translates process and UX requirements into technical specifications. Owns the data model, API structure, and integration decisions. Bridges process design and implementation — ensures that what the Process Analyst and UX Designer define is buildable and that the Developer has clear specs to work from.

**Key responsibilities:**
- Data model design
- API structure and Supabase schema
- Anthropic API integration specifications
- Technical requirements documentation
- Handoff of technical specs to Developer

---

### AI / Prompt Engineer
**Filled by:** Connie Worley

Owns the AI integration strategy — which decisions AI supports, where the boundaries are, and how prompts are designed, tested, and refined. Maintains the Prompt Engineering Log as a living SDLC artifact. This role is central to the portfolio differentiation: demonstrating thoughtful, bounded AI integration rather than AI for its own sake.

**Key responsibilities:**
- AI role definition (what AI does and does not do in the app)
- Prompt design and iteration
- Prompt Engineering Log maintenance
- AI output evaluation and refinement

---

### Developer
**Filled by:** Connie Worley (directed); Claude Code (primary implementation tool)

Builds the product. Owns the codebase, environment setup, and deployment. Works from specifications produced upstream by the Systems Analyst, UX Designer, and AI/Prompt Engineer. Claude Code handles heavy implementation lifting; Connie directs, reviews, and owns all prompt engineering and AI integration logic.

**Key responsibilities:**
- Environment setup (React + Vite, Supabase, Anthropic API)
- Feature implementation per backlog stories
- Code review and quality
- Deployment (Vercel or Netlify)

---

### QA / Tester
**Filled by:** Connie Worley

Owns the test plan, acceptance criteria validation, and bug triage. Signs off before deployment. Ensures the build matches the backlog and that the end user experience holds up under real use conditions.

**Key responsibilities:**
- Test plan development
- Acceptance criteria validation per user story
- Bug identification, logging, and triage
- Pre-deployment sign-off

---

### Technical Writer
**Filled by:** Connie Worley

Owns the README, case study narrative, and any end-user documentation. Translates the work into something an evaluator, hiring manager, or future user can understand without a walkthrough. The case study artifact produced in Phase 12 is the primary deliverable of this role.

**Key responsibilities:**
- GitHub README
- Case study narrative (Phase 12)
- End-user documentation (if applicable in v2)
- Portfolio presentation copy

---

## Role Summary

| Role | Filled By | Primary Artifact(s) |
|---|---|---|
| End User — Job Seeker | Connie Worley (v2) | — |
| Product Owner | Connie Worley | Feature matrix, backlog |
| Project Manager | Connie Worley | SDLC, budget tracker |
| Process Analyst | Connie Worley | BPMN diagrams, process docs |
| UX Designer | Connie Worley | User flow, wireframes |
| Systems Analyst | Connie Worley | Data model, tech specs |
| AI / Prompt Engineer | Connie Worley | Prompt Engineering Log |
| Developer | Connie Worley + Claude Code | Codebase, deployment |
| QA / Tester | Connie Worley | Test plan, sign-off |
| Technical Writer | Connie Worley | README, case study |

---

*Next: BPMN process diagrams — current state and future state per app stage*
