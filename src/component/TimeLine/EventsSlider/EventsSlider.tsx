import React, { useRef } from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import s from './EventsSlider.module.scss';
import { Button } from '@/component/ui/button';
import { Event } from '@/db/db.types';
import { PeriodSlidingSettings } from '@/component/TimeLine/TimeLine';

interface CustomSliderProps {
  items: Event[];
  periodSlidingSettings?: PeriodSlidingSettings;
}

export const EventSlider: React.FC<CustomSliderProps> = ({ items, periodSlidingSettings }) => {
  const prevSlideButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextSlideButtonRef = useRef<HTMLButtonElement | null>(null);

  const sliderSettings: SwiperProps = {
    modules: [Navigation],
    spaceBetween: 20,
    slidesPerView: 3,
    navigation: {
      prevEl: prevSlideButtonRef.current,
      nextEl: nextSlideButtonRef.current,
      disabledClass: s.disabled,
    },
    loop: false,
    onInit: (swiper) => {
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevSlideButtonRef.current;
        swiper.params.navigation.nextEl = nextSlideButtonRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    },
  };

  return (
    <div className={s.sliderContainer}>
      <div className={s.controlsWrapper}>
        {periodSlidingSettings?.periodInfo && <span>{periodSlidingSettings?.periodInfo}</span>}
        <div className={s.buttonsBlock}>
          <Button
            onClick={periodSlidingSettings?.handlePrevPeriod}
            className={s.controlButton}
            disabled={periodSlidingSettings?.isPrevDisabled}
          >
            {'<'}
          </Button>
          <Button
            onClick={periodSlidingSettings?.handleNextPeriod}
            className={s.controlButton}
            disabled={periodSlidingSettings?.isNextDisabled}
          >
            {'>'}
          </Button>
        </div>
      </div>

      <Button ref={prevSlideButtonRef} className={s.prevButton} variant={'secondary'}>
        {'<'}
      </Button>
      <Button ref={nextSlideButtonRef} className={s.nextButton} variant={'secondary'}>
        {'>'}
      </Button>

      <Swiper {...sliderSettings}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={s.eventItem}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
