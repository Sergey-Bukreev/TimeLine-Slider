import React, { useRef, useState } from 'react';
import styles from './TimelineWheel.module.scss';
import gsap from 'gsap';
import { Period } from '@/db/db.types';

interface TimelineWheelProps {
  periods: Period[];
  activePeriod: Period;
  onChangePeriod: (id: string) => void;
}

export const TimelineWheel: React.FC<TimelineWheelProps> = ({
  periods,
  activePeriod,
  onChangePeriod,
}) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredPeriodId, setHoveredPeriodId] = useState<string | null>(null); // Состояние для наведенной точки
  const circleRef = useRef<HTMLDivElement>(null);

  const targetAngleDeg = 0;

  const calculateRotationOffset = (activeIndex: number, total: number) => {
    const anglePerPoint = 360 / total;
    const angleForPoint = anglePerPoint * activeIndex;
    let rotationOffset = targetAngleDeg - angleForPoint;

    if (Math.abs(rotationOffset) === 180) {
      rotationOffset = rotationOffset > 0 ? 180 : -180;
    } else if (rotationOffset > 180) {
      rotationOffset -= 360;
    } else if (rotationOffset < -180) {
      rotationOffset += 360;
    }

    return rotationOffset;
  };

  const handlePeriodClick = (id: string) => {
    const activeIndex = periods.findIndex((period) => period.id === id);
    const rotationOffset = calculateRotationOffset(activeIndex, periods.length);

    onChangePeriod(id);

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
          className={`${styles.timelinePoint} ${isActive ? styles.active : ''}`}
          onClick={() => handlePeriodClick(id)}
          onMouseEnter={() => setHoveredPeriodId(id)}
          onMouseLeave={() => setHoveredPeriodId(null)}
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
        >
          {(isActive || isHovered) && (
            <span
              className={styles.index}
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
    <div className={styles.timelineCircleWrapper}>
      <div ref={circleRef} className={styles.timelineCircle}>
        {renderCirclePoints()}
      </div>

      {activePeriod && (
        <div className={styles.periodDetails}>
          <span className={styles.startDate}>{activePeriod.startDate}</span>
          <span className={styles.endDate}>{activePeriod.endDate}</span>
        </div>
      )}
    </div>
  );
};
