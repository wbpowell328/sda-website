// The professor's 10 canonical decision types, from _pages/whatisadecision.md
// (#types-of-decision-settings). Advisory tags on a decision row — never
// enforced beyond "must be one of these if set at all".
export const DECISION_TYPES = [
  'Physical and financial decisions',
  'Complex/strategic decisions',
  'Information acquisition/observation decisions',
  'Information communication/sharing decisions',
  'Performance metrics/objectives',
  'Choosing functions',
  'Setting parameters',
  'Labeling/identification/estimation',
  'Features and behaviors',
  'Deciding what to decide',
];

export function isValidDecisionType(value) {
  return value == null || DECISION_TYPES.includes(value);
}
