import { useState, useRef, RefObject } from 'react';
import { Period, TimelineData } from '@/db/db.types';
import gsap from 'gsap';
import { calculateRotationOffset } from '@/utils/calculateRotationOffset';
interface UseTimelineReturn {
  rotationAngle: number;
  circleRef: RefObject<HTMLDivElement>;
  handlePeriodChange: (id: string) => void;
  navigatePeriod: (direction: 'next' | 'prev') => void;
  activePeriod: Period | undefined;
}
export const useTimeLine = (periods: TimelineData): UseTimelineReturn => {
  const [activePeriodId, setActivePeriodId] = useState(periods[0]?.id);
  const [rotationAngle, setRotationAngle] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);

  const handlePeriodChange = (id: string) => {
    const activeIndex = periods.findIndex((period) => period.id === id);
    const rotationOffset = calculateRotationOffset(activeIndex, periods.length, 0);

    setActivePeriodId(id);

    if (circleRef.current) {
      gsap.to(circleRef.current, {
        rotation: rotationOffset,
        transformOrigin: 'center',
        duration: 2,
        ease: 'power2.out',
      });

      setRotationAngle(rotationOffset);
    }
  };

  const navigatePeriod = (direction: 'next' | 'prev') => {
    const currentIndex = periods.findIndex((period) => period.id === activePeriodId);
    const newIndex =
      direction === 'next'
        ? (currentIndex + 1) % periods.length
        : (currentIndex - 1 + periods.length) % periods.length;
    handlePeriodChange(periods[newIndex].id);
  };

  const activePeriod = periods.find((period) => period.id === activePeriodId);

  return {
    rotationAngle,
    handlePeriodChange,
    navigatePeriod,
    activePeriod,
    circleRef,
  };
};
