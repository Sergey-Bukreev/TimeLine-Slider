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
}

export const EventSlider = ({ events }: EventSliderProps) => {
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  const sliderSettings: SwiperProps = {
    modules: [Navigation],
    spaceBetween: 20,
    slidesPerView: 3,
    navigation: {
      prevEl: prevButtonRef.current,
      nextEl: nextButtonRef.current,
      disabledClass: s.disabled,
    },
    loop: false,
    onInit: (swiper) => {
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevButtonRef.current;
        swiper.params.navigation.nextEl = nextButtonRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    },
  };

  return (
    <div className={s.sliderContainer}>
      <Button ref={prevButtonRef} className={s.prevButton} variant={'secondary'}>
        {'<'}
      </Button>
      <Button ref={nextButtonRef} className={s.nextButton} variant={'secondary'}>
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
