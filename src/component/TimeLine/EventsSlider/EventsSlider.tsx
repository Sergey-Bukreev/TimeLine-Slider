import React, { useRef } from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import s from './EventsSlider.module.scss';
import { Button } from '@/component/ui/button';

interface Event {
  id: string;
  title: string;
  description: string;
}

interface EventSliderProps {
  events: Event[];
  handlePrevPeriod: () => void;
  handleNextPeriod: () => void;
  periodInfo?: string;
}

export const EventSlider = ({
  events,
  handlePrevPeriod,
  handleNextPeriod,
  periodInfo,
}: EventSliderProps) => {
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
        {periodInfo && <span>{periodInfo}</span>}
        <div className={s.buttonsBlock}>
          <Button onClick={handlePrevPeriod} className={s.controlButton}>
            {'<'}
          </Button>
          <Button onClick={handleNextPeriod} className={s.controlButton}>
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
        {events.map((item) => (
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
