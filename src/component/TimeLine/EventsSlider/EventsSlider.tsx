import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import s from './EventsSlider.module.scss';

interface Event {
  id: string;
  title: string;
  description: string;
}

interface EventSliderProps {
  events: Event[];
}

export const EventSlider = ({ events }: EventSliderProps) => {
  return (
    <div className={s.sliderContainer}>
      <Swiper modules={[Navigation]} spaceBetween={20} slidesPerView={3} navigation loop={false}>
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
