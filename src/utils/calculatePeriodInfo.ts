import { Period } from '@/db/db.types';

export const calculatePeriodInfo = (activePeriod: Period, periods: Period[]) => {
  const activeIndex = periods.findIndex((p) => p.id === activePeriod.id) + 1;
  const totalPeriods = periods.length;

  return `${activeIndex < 10 ? `0${activeIndex}` : activeIndex} / ${
    totalPeriods < 10 ? `0${totalPeriods}` : totalPeriods
  }`;
};
