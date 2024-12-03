import React, { useState, useRef } from 'react';
import { TimelineData } from '@/db/db.types';
import s from './TimeLine.module.scss';
import { TimelineWheel } from '@/component/TimeLine/TimeLineWheel';
import { EventSlider } from '@/component/TimeLine/EventsSlider';

import gsap from 'gsap';
import { calculatePeriodInfo } from '@/utils/calculatePeriodInfo';
import { calculateRotationOffset } from '@/utils/calculateRotationOffset';

interface TimelineProps {
  periods: TimelineData;
}

export const Timeline: React.FC<TimelineProps> = ({ periods }) => {
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

  const handleNextPeriod = () => {
    const currentIndex = periods.findIndex((period) => period.id === activePeriodId);
    const nextIndex = (currentIndex + 1) % periods.length;
    handlePeriodChange(periods[nextIndex].id);
  };

  const handlePrevPeriod = () => {
    const currentIndex = periods.findIndex((period) => period.id === activePeriodId);
    const prevIndex = (currentIndex - 1 + periods.length) % periods.length;
    handlePeriodChange(periods[prevIndex].id);
  };

  const activePeriod = periods.find((period) => period.id === activePeriodId);
  const periodInfo = calculatePeriodInfo(activePeriod!, periods);

  return (
    <div className={s.timeLine}>
      <div className={s.labelWrapper}>
        <span className={s.label}>{'Исторические даты'}</span>
      </div>
      <TimelineWheel
        periods={periods}
        activePeriod={activePeriod!}
        onChangePeriod={handlePeriodChange}
        rotationAngle={rotationAngle}
        ref={circleRef}
      />

      {activePeriod && (
        <EventSlider
          events={activePeriod.events}
          handlePrevPeriod={handlePrevPeriod}
          handleNextPeriod={handleNextPeriod}
          periodInfo={periodInfo}
        />
      )}
    </div>
  );
};
