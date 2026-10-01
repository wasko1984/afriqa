// Fictional test data, never used as live AI output.
export function samplePlan() {
  return {
    coreProblem: 'Your food business has fewer returning customers.',
    possibleCauses: ['Customers may be dissatisfied with consistency.'],
    priority: { level: 'Medium', explanation: 'Investigate this week before losses grow.' },
    actions: [1, 2, 3].map(n => ({ title: `Action ${n}`, task: `Contact ${n + 2} past customers for feedback.`, successCheck: 'Record the responses.' })),
    sevenDayPlan: Array.from({length: 7}, (_, i) => ({ day: i + 1, task: 'Record daily orders and customer feedback.', successCheck: 'Log the order count.' })),
    successCheck: 'Compare daily orders before and after the change.',
    assumptions: ['The exact budget is unknown.'], resources: []
  };
}
