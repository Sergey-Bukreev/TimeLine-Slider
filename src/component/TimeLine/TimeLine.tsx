import { TimelineData } from '@/db/db.types';
import s from './TimeLine.module.scss';
import { TimelineWheel } from '@/component/TimeLine/TimeLineWheel';

import { calculatePeriodInfo } from '@/utils/calculatePeriodInfo';

import { EventSlider } from '@/component/TimeLine/EventsSlider/EventsSlider';
import { useTimeLine } from '@/hooks/useTimeLine';
import { FC } from 'react';

export interface PeriodSlidingSettings {
  handlePrevPeriod: () => void;
  handleNextPeriod: () => void;
  periodInfo?: string;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}
interface TimelineProps {
  periods: TimelineData;
}

export const Timeline: FC<TimelineProps> = ({ periods }) => {
  const { activePeriod, handlePeriodChange, rotationAngle, circleRef, navigatePeriod } =
    useTimeLine(periods);

  const periodSlidingSettings: PeriodSlidingSettings = {
    handlePrevPeriod: () => {
      navigatePeriod('prev');
    },
    handleNextPeriod: () => {
      navigatePeriod('next');
    },
    periodInfo: calculatePeriodInfo(activePeriod!, periods),
    isPrevDisabled: periods.findIndex((p) => p.id === activePeriod?.id) === 0,
    isNextDisabled: periods.findIndex((p) => p.id === activePeriod?.id) === periods.length - 1,
  };
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
        <EventSlider items={activePeriod.events} periodSlidingSettings={periodSlidingSettings} />
      )}
    </div>
  );
};
