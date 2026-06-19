# JSP App v2 — Backlog
*Agile user stories with acceptance criteria | Persona: Job Seeker*

---

## EPIC: Dashboard / Home

---

### US-D01 — Action List View (Primary)

**As a** job seeker,
**I want** to land on my action list when I open the app,
**so that** I immediately know what needs my attention without navigating anywhere.

**Acceptance Criteria:**
- [ ] Home screen displays action items grouped in three sections: Overdue, Due Today, Upcoming
- [ ] Each action item shows: task name, associated job (company + title), and due date
- [ ] Overdue items are visually distinct (color or indicator) from due today and upcoming
- [ ] If no action items exist, the screen displays an empty state with a prompt to add a job or complete setup
- [ ] Action items are sorted within each group by due date, ascending
- [ ] Tapping / clicking an action item navigates to the associated job and stage

---

### US-D02 — Active Jobs Snapshot

**As a** job seeker,
**I want** to see all my active jobs grouped by stage below my action list,
**so that** I can assess my pipeline at a glance without leaving the home screen.

**Acceptance Criteria:**
- [ ] Jobs are displayed in a secondary section below the action list (below the fold is acceptable)
- [ ] Jobs are grouped by status: Saved / Applied / Interview / Offer
- [ ] Each job card shows: company name, role title, and current status
- [ ] Closed jobs are excluded from this view by default
- [ ] Tapping / clicking a job card navigates to that job's detail view
- [ ] Section updates in real time when a job status changes

---

### US-D03 — Quick Add JD

**As a** job seeker,
**I want** a shortcut to add a new job directly from the home screen,
**so that** I can capture a new opportunity immediately without hunting through navigation.

**Acceptance Criteria:**
- [ ] A clearly labeled "Add Job" action is visible on the home screen without scrolling
- [ ] Triggering it opens the JD intake flow (paste URL or raw JD text)
- [ ] After JD is saved, user is returned to the home screen with the new job visible in the Active Jobs Snapshot
- [ ] The shortcut is accessible on both first-time and returning user home screens

---

### US-D04 — Setup Completion Prompt

**As a** job seeker who has not completed setup,
**I want** to see a clear prompt directing me to finish setup when I return to the app,
**so that** I do not try to use features that depend on setup data that does not exist yet.

**Acceptance Criteria:**
- [ ] If setup is incomplete, a banner or prompt is displayed at the top of the home screen
- [ ] The prompt identifies specifically which setup sections are incomplete
- [ ] Tapping / clicking the prompt navigates directly to the first incomplete setup section
- [ ] The prompt is dismissed automatically once setup is fully complete
- [ ] The action list and active jobs snapshot are still visible but gated features display a "Complete setup to unlock" message

---

## EPIC: Stage 0 — Onboarding & Setup

---

### US-S001 — Ideal Company Quiz

**As a** job seeker,
**I want** to complete a guided quiz that defines my ideal company profile,
**so that** the app can score job opportunities against what actually matters to me.

**Acceptance Criteria:**
- [ ] Quiz covers: company size, industry, culture indicators, values, and deal-breakers
- [ ] Each question includes contextual guidance to help the user answer meaningfully
- [ ] User can save progress and return to complete the quiz later
- [ ] Completed quiz outputs a named Ideal Company Profile stored in the user's account
- [ ] User can edit the profile after initial completion
- [ ] Profile is accessible by the JD fit scoring engine downstream

---

### US-S002 — Role Target Profile

**As a** job seeker,
**I want** to define the roles I am targeting by title, salary, and location preference,
**so that** the app can evaluate how well a job matches what I am actually looking for.

**Acceptance Criteria:**
- [ ] User can enter one or more target job titles
- [ ] User can set a salary range (minimum and target)
- [ ] User can specify location preference: remote, hybrid, onsite, or any combination
- [ ] Profile is saved to the user's account and editable at any time
- [ ] At least one role target must be defined before JD intake is unlocked
- [ ] Profile is accessible by the JD fit scoring engine downstream

---

### US-S003 — Resume Library

**As a** job seeker,
**I want** to upload and store up to three master resumes mapped to different role targets,
**so that** the app can use the right resume when scoring and tailoring for a specific job.

**Acceptance Criteria:**
- [ ] User can upload up to 3 resume files (PDF or Word)
- [ ] Each resume can be given a label (e.g., "Operations," "Project Management")
- [ ] Each resume can be mapped to one or more role targets from the Role Target Profile
- [ ] Uploaded resumes are stored securely in the user's account (Supabase storage)
- [ ] User can replace or delete a resume at any time
- [ ] At least one resume must be uploaded before JD intake is unlocked

---

### US-S004 — Pitch Library

**As a** job seeker,
**I want** to store two to three tailored professional summaries,
**so that** I have a ready pitch matched to different role targets without rewriting from scratch each time.

**Acceptance Criteria:**
- [ ] User can create up to 3 pitch entries as free text
- [ ] Each pitch can be labeled and mapped to a role target
- [ ] AI-assisted drafting is available as an optional prompt — not required
- [ ] Pitches are stored in the user's account and editable at any time
- [ ] Pitch library is accessible during resume tailoring and interview prep stages

---

### US-S005 — Storybank

**As a** job seeker,
**I want** to build and store five to six behavioral stories in STAR format,
**so that** I have a ready library the app can match to specific job requirements at interview time.

**Acceptance Criteria:**
- [ ] User can create up to 6 story entries structured in STAR format (Situation, Task, Action, Result)
- [ ] AI assists with structure and completeness — prompts user if a STAR section is thin or missing
- [ ] Each story can be tagged with competencies or themes (e.g., leadership, problem-solving)
- [ ] Stories are stored in the user's account and editable at any time
- [ ] Storybank is accessible by the story match engine in Stage 1 and Stage 4

---

### US-S006 — Job Board Preferences

**As a** job seeker,
**I want** to select my preferred job boards and receive setup guidance,
**so that** I am running targeted alerts on the right platforms from day one.

**Acceptance Criteria:**
- [ ] User can select 3–4 job boards from a curated list
- [ ] For each selected board, the app displays setup tips (how to configure alerts effectively)
- [ ] App includes a general tip about using job board data analytics to identify top-performing boards (no named attribution in v2)
- [ ] Preferences are saved and editable at any time
- [ ] No direct integration with job boards in v2 — guidance only

---

### US-S007 — Elevator Pitch Builder

**As a** job seeker,
**I want** to build a 12-second elevator pitch with AI assistance during setup,
**so that** I have a concise, practiced answer ready before I ever walk into an interview.

**Acceptance Criteria:**
- [ ] AI guides the user through building a 12-second pitch (approximately 30–40 words)
- [ ] Pitch is saved to the user's account as a single named entry
- [ ] User can edit and refine the pitch at any time after initial creation
- [ ] Completed pitch is surfaced again in Stage 4 (Interview Prep) as a review prompt
- [ ] AI provides feedback on clarity and conciseness if requested

---

### US-S008 — Setup Completion State

**As a** job seeker,
**I want** the app to track which setup sections I have completed,
**so that** I can finish setup across multiple sessions without losing progress or missing a step.

**Acceptance Criteria:**
- [ ] Each setup section has a tracked completion state (complete / incomplete)
- [ ] A setup progress indicator shows which sections are done and which remain
- [ ] User can navigate to any setup section in any order, but incomplete sections are flagged
- [ ] Setup is considered complete when all required sections are finished: Ideal Company Quiz, Role Target Profile, Resume Library (min. 1), Storybank (min. 1 story), and Follow-Up Schedule
- [ ] Pitch Library and Elevator Pitch are recommended but not required to unlock the app
- [ ] Completion state drives the Dashboard prompt in US-D04

---

### US-S009 — Follow-Up Schedule Setup

**As a** job seeker,
**I want** to configure my follow-up schedule once during setup,
**so that** the app can automatically calculate due dates for checklist items across all stages without me having to set them manually each time.

**Acceptance Criteria:**
- [ ] Follow-Up Schedule is a named section in the Setup wizard
- [ ] User can define offset values (in days) for each key transition: days to tailor resume after saving a job, days to initiate networking after applying, days to follow up after sending outreach
- [ ] Default offset values are pre-populated (e.g., tailor resume: 1 day, networking initiation: 2 days, follow-up: 4 days) and editable
- [ ] When a checklist item is completed, the app uses the configured offset to calculate the due date for the next item in the sequence
- [ ] Due dates are calculated from the timestamp of prior item completion, not from a stage trigger date
- [ ] User can revisit and update offset values at any time from Settings without affecting already-completed items
- [ ] Updated offsets apply to future due date calculations only; existing due dates on open items are not retroactively changed unless the user edits them manually

---

## EPIC: Stage 1 — JD Intake

---

### US-J01 — JD Import / Scrape

**As a** job seeker,
**I want** to import a job description by pasting a URL or raw text,
**so that** I can get the app working on a new opportunity without manually re-entering job details.

**Acceptance Criteria:**
- [ ] User can paste a URL and the app attempts to scrape the JD content
- [ ] If scraping fails or returns incomplete content, user is prompted to paste the raw JD text as a fallback
- [ ] User can paste raw JD text directly without attempting a URL scrape
- [ ] AI parses the JD and extracts: job title, company name, location, salary (if listed), key responsibilities, and required skills
- [ ] Parsed fields are displayed for user review and correction before saving
- [ ] JD is saved to the user's account and associated with a new job entry
- [ ] User can re-import or manually edit the JD after initial save

---

### US-J02 — JD Fit Scoring

**As a** job seeker,
**I want** to see how well a job scores against my resume, my ideal company profile, and my role targets,
**so that** I can make an informed decision about whether to invest time pursuing it.

**Acceptance Criteria:**
- [ ] Upon JD save, the app automatically runs all three scores simultaneously
- [ ] Three scores are presented as a unified scorecard: Resume Match, Ideal Company Fit, Role Target Fit
- [ ] Each score is displayed with a brief AI-generated rationale explaining the rating
- [ ] User can select which master resume to score against if more than one is on file
- [ ] Scores are recalculated if the user updates their resume, ideal company profile, or role target profile
- [ ] Scorecard is accessible from the job detail view at any time

---

### US-J03 — Skills Gap Analysis

**As a** job seeker,
**I want** to see which skills the job requires that are missing or undersold in my resume,
**so that** I know exactly what to address before I apply.

**Acceptance Criteria:**
- [ ] AI compares required skills in the JD against the selected master resume
- [ ] Gaps are categorized as: Hard Gap (skill absent from resume) or Soft Gap (skill present but undersold)
- [ ] Each gap is listed with the specific JD requirement it maps to
- [ ] Results are displayed in the job detail view alongside the fit scorecard
- [ ] User can mark individual gaps as "not applicable"; doing so strikes through the gap item — note is optional
- [ ] Gap list feeds directly into the Resume Tailoring Checklist in Stage 2

---

### US-J04 — Training Recommendations

**As a** job seeker,
**I want** to see recommended training resources for each hard skills gap,
**so that** I have a clear path to address gaps I cannot claim on my current resume.

**Acceptance Criteria:**
- [ ] For each hard gap identified in US-J03, the app surfaces at least one training recommendation
- [ ] Recommendations are drawn from a curated internal list in v2 (no live search)
- [ ] Each recommendation includes: resource name, format (course, certification, book, etc.), and a link
- [ ] User can dismiss a recommendation if it is not relevant
- [ ] Recommendations are accessible from the skills gap view within the job detail

---

### US-J05 — Story Match

**As a** job seeker,
**I want** to see which of my storybank entries are most relevant to this job,
**so that** I know which stories to lead with if I get an interview.

**Acceptance Criteria:**
- [ ] AI ranks all storybank entries by relevance to the imported JD
- [ ] Top 3 stories are surfaced prominently in the job detail view
- [ ] Full ranked list is accessible if the user wants to see all stories
- [ ] Each story match includes a brief AI rationale explaining why it is relevant to this JD
- [ ] Story match results are stored with the job entry and accessible at any time
- [ ] Results are re-ranked automatically if the user updates a storybank entry

---

## EPIC: Stage 2 — Application & Tailoring

---

### US-A01 — Resume Tailoring Checklist

**As a** job seeker,
**I want** a checklist triggered when I am ready to tailor my resume for a specific job,
**so that** I do not miss a step and submit a resume that is not optimized for the role.

**Acceptance Criteria:**
- [ ] Checklist is triggered automatically when a job entry is created from a JD import
- [ ] Default checklist items include: update job title, reorder key skills, review for keywords, address soft gaps, address hard gaps, verify formatting, tailor summary / pitch
- [ ] Skills gaps from US-J03 are pulled in automatically as individual checklist items
- [ ] Each checklist item is assigned a due date automatically, calculated from the completion timestamp of the prior item plus the offset configured in the Follow-Up Schedule (US-S009)
- [ ] User can override any auto-calculated due date manually
- [ ] Completed items are visually marked without being removed from the list
- [ ] Checklist progress is visible from the job detail view and the Dashboard action list
- [ ] User can add custom checklist items

---

### US-A02 — AI Resume Coach

**As a** job seeker,
**I want** conversational AI assistance while tailoring my resume for a specific job,
**so that** I can make targeted improvements without starting from scratch or guessing what to change.

**Acceptance Criteria:**
- [ ] AI coach is accessible from within the job detail view during the tailoring stage
- [ ] Coach has context of: the imported JD, the selected master resume, and the skills gap analysis
- [ ] User can ask open-ended questions (e.g., "How should I reframe my operations experience for this role?")
- [ ] Coach provides specific, actionable suggestions — it does not rewrite the resume for the user
- [ ] Conversation is scoped to the current job — context does not bleed across jobs
- [ ] Coach session is not saved between visits in v2 (stateless per session)

---

### US-A03 — Application Status Tracking

**As a** job seeker,
**I want** to update the status of each job as I move through the process,
**so that** the app knows where I am and can trigger the right checklists and actions at each stage.

**Acceptance Criteria:**
- [ ] Each job has a status field with the following options: Saved, Applied, Interview Scheduled, Offer, Closed
- [ ] User can update status manually at any time from the job detail view
- [ ] Status change to Applied triggers the Networking Checklist (Stage 3)
- [ ] Status change to Interview Scheduled triggers the Interview Prep Checklist (Stage 4)
- [ ] Current status is visible on the job card in the Dashboard Active Jobs Snapshot
- [ ] Closed jobs are removed from the active pipeline view but remain accessible in a separate archive
- [ ] Status change is logged with a timestamp for reference

---

## EPIC: Stage 3 — Networking & Outreach

---

### US-N01 — Networking Checklist

**As a** job seeker,
**I want** a networking checklist triggered when I update a job status to Applied,
**so that** I have a structured outreach plan ready to execute immediately after submitting.

**Acceptance Criteria:**
- [ ] Checklist is triggered automatically when job status changes to Applied (US-A03)
- [ ] Default checklist items include: identify hiring manager, identify internal connections, send LinkedIn connection request, send outreach message, follow up if no response within 3 business days
- [ ] Each checklist item is assigned a due date automatically, calculated from the completion timestamp of the prior item plus the offset configured in the Follow-Up Schedule (US-S009)
- [ ] User can override any auto-calculated due date manually
- [ ] Due dates surface on the Dashboard action list
- [ ] Completed items are visually marked without being removed from the list
- [ ] User can add custom checklist items
- [ ] Checklist progress is visible from the job detail view

---

### US-N02 — AI Networking Coach

**As a** job seeker,
**I want** AI assistance drafting outreach messages tailored to the specific job and company,
**so that** my networking communications are relevant and compelling rather than generic.

**Acceptance Criteria:**
- [ ] AI coach is accessible from within the networking checklist in the job detail view
- [ ] Coach has context of: the imported JD, the selected master resume, the user's storybank, and company name
- [ ] Coach can draft: LinkedIn connection requests, initial outreach messages, referral ask messages, and follow-up messages
- [ ] User can specify the recipient type (hiring manager, recruiter, internal connection, cold contact) to tailor tone
- [ ] Coach output is a draft — user reviews and sends manually; app does not send messages on the user's behalf
- [ ] User can request revisions conversationally (e.g., "Make it shorter" or "Less formal")
- [ ] Conversation is scoped to the current job — context does not bleed across jobs
- [ ] Coach session is stateless per session in v2

---

## EPIC: Stage 4 — Interview Prep

---

### US-I01 — Storybank Match (Interview)

**As a** job seeker,
**I want** my top matching stories surfaced when my interview is scheduled,
**so that** I am practicing the right stories for this specific role rather than reviewing all of them.

**Acceptance Criteria:**
- [ ] Story match results are re-surfaced automatically when job status changes to Interview Scheduled
- [ ] Top 4 ranked stories are displayed prominently in the Interview Prep view
- [ ] Full ranked storybank list is accessible if the user wants to review all stories
- [ ] Each story match includes the AI rationale from US-J05 explaining its relevance to this JD
- [ ] User can navigate directly from a story match to the full story entry in the storybank
- [ ] Results reflect any storybank edits made since the original Stage 1 match

---

### US-I02 — Elevator Pitch Review

**As a** job seeker,
**I want** my elevator pitch surfaced as a review prompt when I have an interview scheduled,
**so that** I do not forget to practice it before walking in.

**Acceptance Criteria:**
- [ ] Elevator pitch is displayed in the Interview Prep view when status = Interview Scheduled
- [ ] User can read, edit, and save the pitch directly from this view
- [ ] A prompt encourages the user to practice delivering it aloud before the interview
- [ ] If no elevator pitch exists, user is prompted to complete it with a link to the Setup stage

---

### US-I03 — Interview Prep Checklist

**As a** job seeker,
**I want** a structured checklist triggered when my interview is scheduled,
**so that** I cover every preparation step and walk in confident rather than hoping I did not miss something.

**Acceptance Criteria:**
- [ ] Checklist is triggered automatically when job status changes to Interview Scheduled
- [ ] Default checklist items include: review top 4 matched stories (user can adjust the number), practice elevator pitch, research each interviewer on LinkedIn, prepare 3–5 questions to ask, review the JD one more time, confirm interview logistics
- [ ] Each checklist item is assigned a due date automatically, calculated from the completion timestamp of the prior item plus the offset configured in the Follow-Up Schedule (US-S009)
- [ ] User can override any auto-calculated due date manually
- [ ] When the user opens the "research each interviewer" checklist item, an AI prompt surfaces covering: what to look for (role history, shared connections, published content, interview style indicators), what to note, and how to use findings during the interview
- [ ] Due dates surface on the Dashboard action list
- [ ] Completed items are visually marked without being removed from the list
- [ ] User can add custom checklist items
- [ ] Checklist progress is visible from the job detail view

---

### US-I04 — Practice Interview Recommendations

**As a** job seeker,
**I want** in-app tips pointing me to external interview practice tools,
**so that** I know where to go to practice without the app having to build that capability itself.

**Acceptance Criteria:**
- [ ] A curated list of external interview practice tools is displayed in the Interview Prep view
- [ ] Each recommendation includes: tool name, brief description, and a link
- [ ] Recommendations are static in v2 — no personalization or live search
- [ ] List is accessible at any time from the Interview Prep view, not just when an interview is scheduled
- [ ] User can dismiss the recommendations panel if they do not want to see it

---

## EPIC: Stage 5 — Action List & Reminders

---

### US-AL01 — Unified Action List

**As a** job seeker,
**I want** a single view that aggregates every due date across all my active jobs and stages,
**so that** I never have to dig into individual job entries to know what needs my attention today.

**Acceptance Criteria:**
- [ ] Action list aggregates all checklist due dates across all jobs and all stages
- [ ] Items are grouped into three sections: Overdue, Due Today, Upcoming
- [ ] Each item displays: task name, associated job (company + title), stage, and due date
- [ ] Overdue items are visually distinct from due today and upcoming
- [ ] Items within each group are sorted by due date, ascending
- [ ] Tapping / clicking an item navigates to the associated job and checklist item
- [ ] Completed checklist items are removed from the action list automatically; completing an item triggers the auto-calculated due date for the next item in the sequence per US-S009
- [ ] Action list updates in real time when due dates are added, changed, or completed
- [ ] User can edit any due date directly from the action list view

---

### US-AL02 — In-App Reminders

**As a** job seeker,
**I want** to receive reminders within the app when a checklist item is due or overdue,
**so that** I do not miss deadlines just because I did not open the app that day.

**Acceptance Criteria:**
- [ ] App displays an in-app notification badge when items are due or overdue
- [ ] Notification indicates the number of items requiring attention
- [ ] Clicking / tapping the notification navigates to the action list
- [ ] Reminders are generated automatically based on due dates set on checklist items
- [ ] User can enable or disable in-app reminders in settings
- [ ] Reminders persist until the associated checklist item is marked complete or the due date is changed
- [ ] No calendar integration in v2 — reminders are in-app only

---

## EPIC: Cross-Cutting Concerns

---

### US-CC01 — Auth / User Accounts

**As a** job seeker,
**I want** my data to persist between sessions behind a secure login,
**so that** I do not lose my setup, job entries, or progress every time I close the app.

**Acceptance Criteria:**
- [ ] User can create an account with email and password
- [ ] User can log in and log out securely
- [ ] All user data (setup profiles, resumes, storybank, job entries, checklists) is scoped to the authenticated user
- [ ] Session persists across browser closes until the user explicitly logs out
- [ ] Authentication handled via Supabase Auth in v2
- [ ] Single user per account in v2 — no multi-user or team support

---

### US-CC02 — v3 Parking Lot (Out of Scope for v2)

*The following items are formally out of scope for v2. Documented here for backlog continuity and v3 planning.*

| Story ID | Feature | Notes |
|---|---|---|
| US-CC03 | Multi-User / Team Accounts | Multiple job seekers under one account |
| US-CC04 | Billing / Monetization | Subscription or pay-per-use for external users |
| US-CC05 | Returning User Flow | Dedicated re-entry experience for users resuming a search |
| US-CC06 | Resume Version Control | Track changes to master resumes over time |
| US-CC07 | Calendar Integration | Google Calendar / Outlook sync for due dates |
| US-CC08 | In-App Reminders — Push Notifications | Browser-level push notifications beyond basic in-app badge; revisit with calendar integration |
| US-CC09 | Native Interview Practice | In-app AI mock interview |
| US-CC10 | LinkedIn Integration | Direct API integration for profile or messaging |
| US-CC11 | Sam Write / hunter.co Attribution | Named tip attribution pending contact and clearance |
| US-CC12 | Training Recommendations — Live Search | Dynamic resource search replacing curated static list |
| US-CC13 | AI Coach Session Memory | Persistent coaching history per job across sessions |

---
*Backlog v2 — updated to reflect auto-calculated due dates, US-S009 Follow-Up Schedule, and US-I03 interviewer research AI prompt.*
