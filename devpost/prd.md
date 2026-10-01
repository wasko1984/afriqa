---
doc: prd
status: approved
---

# AFRIQA — Product Requirements

An AI Decision Assistant for African small-business owners that turns a plain-language problem into realistic next actions and a seven-day plan.
Source: `scope.md > Who It's For`, `The Unique Kernel`.

## The Core Journey
1. The owner opens a welcome page with a short introduction, a labeled problem-entry box, and a Submit button.
2. They describe their main problem and may include business type, location, available resources, and constraints in the same text.
3. Submit starts analysis immediately, without a follow-up interview. A visible loading state confirms the request is in progress.
4. Successful generation opens a separate results page containing the structured decision/action plan.
5. If generation fails, a clear error offers Retry using the same problem, without requiring the owner to retype it.

Success is a complete plan whose next steps fit the supplied situation and include a simple way to measure progress.
Source: `scope.md > The Core Loop`, `What "Working" Looks Like`.

## Screens and Layout
### Welcome and Problem Entry
A simple, focused page: AFRIQA identity, welcome note explaining the outcome, a prominent problem-entry box, and Submit. Guidance invites useful context without requiring separate fields.

### Decision and Action Plan
A separate results page. The proposed layout leads with the core problem and priority, then possible causes, three numbered action cards, and a seven-day timeline. Success checks and any small supporting templates remain close to the relevant actions. This arrangement was selected by the agent under the learner's request to choose a professional design.

## Look and Feel
The learner delegated selection of a professional, modern web design. The selected direction is a warm ivory background, deep navy text, teal accents, clean sans-serif typography, generous spacing, and rounded cards. Use a readable layout on phones and desktop screens. Priority labels must include text rather than communicate urgency through color alone. These specifics are an agent-selected design, not independently stated learner preferences.
Source: `scope.md > Inspiration & Identity`.

## Features and Behavior
### Problem Submission
- Accept a natural-language problem in one text box.
- Analyze immediately on Submit; the learner's latest direction supersedes the earlier request for follow-up questions.
- Use supplied context and constraints. Do not invent missing business facts.
- Proposed validation: empty or whitespace-only input stays on the entry page with a clear prompt to enter a problem.
- Proposed loading behavior: show analysis in progress and prevent duplicate submissions until the current request finishes.
Source: `scope.md > The Core Loop`, `The POC Boundary`.

### Structured Plan
Every successful result contains all five required sections below, with no blank or skipped sections:
- **Core problem:** a concise interpretation grounded in the input.
- **Possible causes:** plausible explanations labeled as possibilities, not verified facts.
- **Priority:** Low, Medium, or High, reflecting how urgently the owner should act, with a short explanation grounded in the situation. It varies by problem. The learner indicated Medium for the customer-loss example; this is illustrative rather than a fixed label for every customer-loss case.
- **Three recommended actions:** exactly three, ordered by what to do first, each expressed as a concrete task feasible within the stated resources and constraints.
- **Seven-day plan:** Day 1 through Day 7, with practical tasks that support the recommended actions and a simple observable success check.
- **Supporting resources when useful:** short, directly usable text such as a customer-feedback template or pricing checklist within the plan; a separate library is outside scope.

For sparse input, identify missing context or assumptions within the plan, keep recommendations provisional, and still generate immediately. Do not present guessed location, business type, budgets, sales figures, or causes as user-supplied facts.
Source: `scope.md > The Unique Kernel`, `The Core Loop`, `The POC Boundary`.

### Generation Failure and Retry
Show a clear failure message and Retry. Retain the submitted problem for retry. Network/service failure or an incomplete/unusable AI response must not appear as a successful complete plan. Retry begins a new attempt; success proceeds to results and repeated failure remains recoverable.
Source: `scope.md > What "Working" Looks Like`.

## States and Boundaries
- **First use:** welcome and empty problem-entry box.
- **Empty submission:** proposed inline prompt; no analysis starts.
- **Generating:** proposed visible progress indicator with duplicate submissions prevented.
- **Success:** separate results page with all required sections.
- **Failure:** error and Retry, with the submitted text retained.
- **Results opened without a generated plan:** proposed guidance back to the entry page rather than an empty or broken result.
- **Connectivity:** the Vercel demo and online AI generation require internet access.
- **Session assumption:** no account, saved-plan history, or cross-session persistence is proposed for this proof of concept. The current input and result need only remain available through the active workflow and retry.

## Acceptance Criteria
1. The welcome page visibly contains an introduction, labeled problem box, and Submit.
2. A nonempty business problem begins generation immediately, with no clarifying-question step.
3. Successful generation navigates to a separate results page displaying the core problem, possible causes, explained priority, exactly three ordered actions, and all seven days.
4. A real-AI demo using a food business losing customers produces concrete tasks rather than only general advice. Examples of acceptable specificity include contacting a stated number of past customers, testing an offer based on feedback, and tracking orders. Exact wording and recommendations need not match these examples.
5. When the input supplies a resource constraint, the plan respects it. Missing context is not asserted as fact, and causes remain explicitly possible.
6. The plan includes a simple measurement, such as comparing daily orders before and after an action, without promising an increase.
7. Priority can vary across problems and includes an explanation; Medium is not hard-coded for all inputs.
8. A generation failure visibly offers Retry and preserves the input. A successful retry completes the same workflow.
9. Proposed empty-input, loading, and missing-result behaviors work as described under States and Boundaries.
10. The deployed Vercel demo completes the real AI workflow; the same flow can be shown in the short demo video, with source delivered in a public GitHub repository.

## Product Decisions
- Welcome note, problem entry, and Submit form the first screen.
- Generate immediately after submission; this is the final decision on clarification behavior.
- Display the plan on a separate results page.
- The learner asked the agent to select a professional, modern visual design.
- Failed generation offers user-initiated retry.
- AI selects Low/Medium/High according to urgency rather than always showing Medium.
- Use Vercel publishing and online AI; offline/local-model generation is deferred.

## What We're Building
Two user-facing surfaces and one complete generation workflow, with contextual structured output, retry, and a professional presentation. Verify structure, action usefulness, and real end-to-end generation, then publish the web demo.

## Deferred From the POC
- Adaptive follow-up based on reported outcomes: adds a second workflow.
- Offline/local-model operation: replaced by the online Vercel demo.
- Saved-plan history and accounts: proposed exclusions because they are unnecessary to demonstrate the core loop.
- Separate workflows for students and individuals: demonstrate the small-business case first.

## Non-Goals
- General-purpose chatbot conversation.
- A separate resource library.
- Verified diagnosis of a business from limited text or guaranteed business outcomes; recommendations remain suggestions grounded in supplied context.
Source: `scope.md > Explicitly Cut`, `Later`.

## Open Questions and Adopted Defaults
Approval of this draft adopts the agent-proposed empty-input/loading/missing-result behavior and exclusion of saved history/accounts. These originated as agent proposals, not independently stated learner preferences.

AI provider, technical validation approach, input length limits, and deployment setup belong in `4-spec`. No provider or model has been selected in this PRD.
