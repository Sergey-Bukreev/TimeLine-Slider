import React, { forwardRef, useState } from 'react';
import s from './TimelineWheel.module.scss';

import { Period } from '@/db/db.types';
import clsx from 'clsx';

interface TimelineWheelProps {
  periods: Period[];
  activePeriod: Period;
  onChangePeriod: (id: string) => void;
  rotationAngle: number;
}

export const TimelineWheel = forwardRef<HTMLDivElement, TimelineWheelProps>(
  ({ periods, activePeriod, onChangePeriod, rotationAngle }, ref) => {
    const [hoveredPeriodId, setHoveredPeriodId] = useState<string | null>(null);

    const renderCirclePoints = () => {
      const anglePerPoint = 360 / periods.length;

      return periods.map(({ id }, index) => {
        const angle = anglePerPoint * index - 60;
        const x = Math.cos((angle * Math.PI) / 180) * 265;
        const y = Math.sin((angle * Math.PI) / 180) * 265;
        const isActive = activePeriod.id === id;
        const isHovered = hoveredPeriodId === id;
        const inverseRotationAngle = -rotationAngle;

        return (
          <div
            key={id}
            className={clsx(s.timelinePoint, isActive && s.active)}
            onClick={() => onChangePeriod(id)}
            onMouseEnter={() => setHoveredPeriodId(id)}
            onMouseLeave={() => setHoveredPeriodId(null)}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {(isActive || isHovered) && (
              <span
                className={s.index}
                style={{
                  transform: `rotate(${inverseRotationAngle}deg)`,
                  transformOrigin: 'center',
                }}
              >
                {index + 1}
              </span>
            )}
          </div>
        );
      });
    };

    return (
      <div className={s.timelineCircleWrapper}>
        <div ref={ref} className={s.timelineCircle}>
          {renderCirclePoints()}
        </div>
        {activePeriod && (
          <div className={s.periodDetails}>
            <span className={s.startDate}>{activePeriod.startDate}</span>
            <span className={s.endDate}>{activePeriod.endDate}</span>
          </div>
        )}
      </div>
    );
  }
);

TimelineWheel.displayName = 'TimelineWheel';
