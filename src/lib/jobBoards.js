export const JOB_BOARDS = [
  {
    slug: "built-in",
    name: "Built In (tech)",
    url: "https://builtin.com/jobs",
    search_prompt:
      "Pick your tech hub or 'Remote', then filter by company size, remote level, and salary band. Set up a Job Alert in your profile for weekly emails.",
  },
  {
    slug: "flexjobs",
    name: "FlexJobs",
    url: "https://www.flexjobs.com/",
    search_prompt:
      "Search by role with the Remote/Hybrid + Schedule (Full-Time, Part-Time, Freelance) filters. Saved searches send daily or weekly emails based on your filter settings.",
  },
  {
    slug: "glassdoor",
    name: "Glassdoor",
    url: "https://www.glassdoor.com/Job/index.htm",
    search_prompt:
      "Search by role + location, then filter Company Rating to 3.5+ for better culture signal. Save the search and enable Email Alerts under your profile for a daily digest.",
  },
  {
    slug: "google-jobs",
    name: "Google Jobs",
    url: "https://www.google.com/search?ibp=htl;jobs",
    search_prompt:
      "Type your role plus location or 'remote' (for example, 'operations manager remote'). Use the filters at the top — Date posted, Job type, and Employer — to tighten results. Scroll to the bottom of the listings and toggle on 'Get email alerts about new jobs for: [your query]'. Confirm the subscription in Gmail.",
  },
  {
    slug: "indeed",
    name: "Indeed",
    url: "https://www.indeed.com/",
    search_prompt:
      'Use title:"[your role]" for exact-title matches (e.g., title:"Project Manager"). Add a city or "Remote" in the Where field. Below the results, click "Get new jobs by email" and set frequency to Daily.',
  },
  {
    slug: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/jobs/",
    search_prompt:
      "Search by exact role title under the Jobs tab. Apply filters: Date Posted = Past Week, Experience Level matching yours, and your preferred Work Type (Remote / Hybrid / Onsite). On the results page, toggle 'Job Alert' on for daily emails.",
  },
  {
    slug: "we-work-remotely",
    name: "We Work Remotely",
    url: "https://weworkremotely.com/",
    search_prompt:
      "Use the category filter (Programming, Design, Customer Support, etc.) plus keyword search. No location filter needed — every job is remote. Subscribe to category RSS or the weekly email.",
  },
  {
    slug: "wellfound",
    name: "Wellfound (startups)",
    url: "https://wellfound.com/jobs",
    search_prompt:
      "Filter by role, company size (e.g., 11–50, 51–200), and funding stage. Use keywords for your stack. Save the search and enable a weekly digest under Email Preferences.",
  },
  {
    slug: "ziprecruiter",
    name: "ZipRecruiter",
    url: "https://www.ziprecruiter.com/",
    search_prompt:
      "Search by title + zip or city. Upload your resume so the matching algorithm kicks in. Tune relevance and frequency under Account → Email Preferences.",
  },
]
