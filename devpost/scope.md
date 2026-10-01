---
doc: scope
status: approved
---

# AFRIQA

An AI Decision Assistant that turns a real-world problem into practical next actions and a seven-day plan.

## The Unique Kernel
"Don't just tell me what my problem is. Tell me what I can do about it next." AFRIQA translates the user's situation and stated constraints into concrete, prioritized, time-bound actions with a simple way to check progress.

## Who It's For
The proof of concept focuses on an African small-business owner whose business is losing customers, such as a small food business with fewer orders this month. They need realistic next steps rather than broad advice. Their current problem-solving process has not been established. Entrepreneurs, students, and individuals are part of the wider aspiration, not separate workflows in this demo.

## The Core Loop
The owner opens AFRIQA, describes their problem in plain language with any relevant context, and generates a structured decision/action plan. They read the core problem, possible causes, priority/risk level, three recommended actions, and a practical seven-day plan. Context such as location, business type, resources, and constraints shapes recommendations when provided. Each action should be specific enough to try, with a simple success check.

## Inspiration & Identity
Inspired by ChatGPT (https://chatgpt.com/) and business decision-support tools, with a focused path from a problem to next steps. The experience should feel practical, clear, and polished. The learner's food-business example favors actions such as contacting five previous customers, testing an offer based on feedback, and tracking daily orders. Small supporting resources, such as a feedback template or pricing checklist, may appear within the plan when useful; a separate resource library is outside the core loop.

## Why This Matters to the Learner
The learner works with young people, entrepreneurs, and small businesses in Nigeria through AI, technology, cybersecurity, and digital skills training. AFRIQA explores useful AI assistance for their everyday challenges. The learning goal is to work with a coding agent from requirements through delivery and verify that structured AI planning works end-to-end.

## What "Working" Looks Like
A polished web demo published on Vercel (https://vercel.com/) accepts a small-business problem and generates a complete, readable plan using online AI. The demonstration shows a customer-loss problem becoming three feasible next actions and a seven-day plan with a measurable success check, rather than generic marketing advice. The workflow must be tested end-to-end with real AI generation. Delivery includes a short demo video and public GitHub repository, sized for the hackathon's 2–4 hours of active work.

## The POC Boundary
One complete workflow: plain-language problem input, AI analysis, structured plan display. Focus on small-business decisions and the customer-loss demo. Prioritize contextual, resource-aware actions, clear ordering, a seven-day timeline, and simple progress measures. Publish the demo on Vercel; both access and AI generation require internet. Exact input details, priority/risk semantics, output behavior, and validation criteria belong in the PRD. AI provider and implementation choices belong in the technical spec.

## Later
- Adaptive follow-up: report results and generate the next step; deferred to avoid a second workflow.
- Offline/local-model generation and access with limited internet; broader aspirations outside this online demo.
- Broader use cases for students and individuals after the small-business workflow is demonstrated.

## Explicitly Cut
- General-purpose chatbot conversations: the proof of concept centers on structured actionable decisions.
- A local-model setup for this demo: the learner chose Vercel publishing with online AI instead.
- A separate resource library: small useful templates can support the generated plan without building another workflow.
