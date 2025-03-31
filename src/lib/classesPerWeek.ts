export const frequencyMapping: any = {
    0: 1, // 1 class/week for 1 week
    1: 1, // 1 class/week for 1 week
    4: 1, // 1 class/week for 1 month
    8: 2, // 2 classes/week for 1 month
    16: 3, // 3 classes/week for 1 month
    24: 1, // 1 class/week for 3 months
    32: 2, // 2 classes/week for 3 months
    36: 3, // 3 classes/week for 3 months
    48: 1, // 1 class/week for 1 year
    72: 2, // 2 classes/week for 1 year
    96: 3, // 3 classes/week for 1 year
  };

  export function getFrequencyValue(frequency: number): number {
    return frequencyMapping[frequency];
  }