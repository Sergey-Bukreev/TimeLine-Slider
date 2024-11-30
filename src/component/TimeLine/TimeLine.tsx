import React, { useState } from 'react';
import { TimelineData } from '@/db/db.types';
import s from './TimeLine.module.scss';
import { TimelineWheel } from '@/component/TimeLine/TimeLineWheel';
import { EventSlider } from '@/component/TimeLine/EventsSlider';
interface TimelineProps {
  periods: TimelineData;
}

export const Timeline: React.FC<TimelineProps> = ({ periods }) => {
  const [activePeriodId, setActivePeriodId] = useState(periods[0]?.id);

  const activePeriod = periods.find((period) => period.id === activePeriodId);

  return (
    <div className={s.timeLine}>
      <TimelineWheel
        periods={periods}
        activePeriodId={activePeriodId}
        onChangePeriod={setActivePeriodId}
      />

      {activePeriod && <EventSlider events={activePeriod.events} />}
    </div>
  );
};
