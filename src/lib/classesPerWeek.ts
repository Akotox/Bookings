export const frequencyMapping: any = {
    0: 1, // 1 class/week for 1 week
    1: 1, // 1 class/week for 1 week
    4: 1, // 1 class/week for 1 month
    8: 2, // 2 classes/week for 1 month
    12: 3, // 3 classes/week for 1 month
    13: 1, // 1 class/week for 3 months
    24: 2, // 2 classes/week for 3 months
    36: 3, // 3 classes/week for 3 months
    52: 1, // 1 class/week for 1 year
    104: 2, // 2 classes/week for 1 year
    156: 3, // 3 classes/week for 1 year
  };

  export function getFrequencyValue(frequency: number): number {
    return frequencyMapping[frequency];
  }