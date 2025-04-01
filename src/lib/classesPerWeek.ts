export const frequencyMapping: Record<string, { classPerWeek: number; frequency: number }> = {
  "TR": { classPerWeek: 1, frequency: 1 },     // Trial: 1 class/week for 1 week
  "M_1": { classPerWeek: 1, frequency: 4 },    // Monthly: 1 class/week → 4 lessons per month
  "M_2": { classPerWeek: 2, frequency: 8 },    // Monthly: 2 classes/week → 8 lessons per month
  "M_3": { classPerWeek: 3, frequency: 12 },   // Monthly: 3 classes/week → 12 lessons per month
  "Q_1": { classPerWeek: 1, frequency: 12 },   // Quarterly: 1 class/week → 12 lessons per 3 months
  "Q_2": { classPerWeek: 2, frequency: 24 },   // Quarterly: 2 classes/week → 24 lessons per 3 months
  "Q_3": { classPerWeek: 3, frequency: 36 },   // Quarterly: 3 classes/week → 36 lessons per 3 months
  "Y_1": { classPerWeek: 1, frequency: 48 },   // Yearly: 1 class/week → 48 lessons per year
  "Y_2": { classPerWeek: 2, frequency: 96 },   // Yearly: 2 classes/week → 96 lessons per year
  "Y_3": { classPerWeek: 3, frequency: 144 },  // Yearly: 3 classes/week → 144 lessons per year
};

export const getFrequencyValue = (key: string): { classPerWeek: number; frequency: number } | null => {
  return frequencyMapping[key] || null;
};
