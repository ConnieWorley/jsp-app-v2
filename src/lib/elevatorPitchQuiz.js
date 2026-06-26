export const PITCH_QUESTIONS = [
  {
    key: "who",
    title: "How would you describe your role in one phrase?",
    subtitle: "Think 'operations leader', 'data scientist', 'product designer'. Use what you actually call yourself, not just your last job title.",
    placeholder: "e.g. operations leader",
    required: true,
  },
  {
    key: "superpower",
    title: "What is the one thing you do really well?",
    subtitle: "The skill or knack people would say sets you apart. Action-y. 💪",
    placeholder: "e.g. cut messy process and ship faster",
    required: true,
  },
  {
    key: "audience",
    title: "Who do you do it for?",
    subtitle: "Your audience. Could be an industry, a company stage, a team type.",
    placeholder: "e.g. mid-market SaaS teams",
    required: true,
  },
  {
    key: "outcome",
    title: "What is the result for them?",
    subtitle: "The impact. Why it matters. Use a verb.",
    placeholder: "e.g. saving them weeks of friction per launch",
    required: true,
  },
  {
    key: "ask",
    title: "What are you looking for next?",
    subtitle: "Useful for networking pitches; skip it for an interview-room pitch.",
    placeholder: "e.g. Looking for my next ops lead role at a Series B company",
    required: false,
  },
]

const VOWELS = new Set(["a", "e", "i", "o", "u"])

function indefiniteArticle(word) {
  if (!word) return "a"
  const first = word.trim().charAt(0).toLowerCase()
  return VOWELS.has(first) ? "an" : "a"
}

export function assemblePitch(answers) {
  const who = (answers.who ?? "").trim()
  const superpower = (answers.superpower ?? "").trim()
  const audience = (answers.audience ?? "").trim()
  const outcome = (answers.outcome ?? "").trim()
  const ask = (answers.ask ?? "").trim()

  const article = indefiniteArticle(who)
  const main = `I am ${article} ${who} who ${superpower} for ${audience}, ${outcome}.`

  return ask ? `${main} ${ask}` : main
}
