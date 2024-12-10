import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import s from './EventsSlider.module.scss';
import { Button } from '@/component/ui/button';
import { Event } from '@/db/db.types';
import { PeriodSlidingSettings } from '@/component/TimeLine/TimeLine';
import { Modal } from '@/component/ui/modal';

interface BaseProps {
  items: Event[];
}

interface SlidingEnabledProps extends BaseProps {
  isPeriodSlidingEnabled: true;
  periodSlidingSettings: PeriodSlidingSettings;
}

interface SlidingDisabledProps extends BaseProps {
  isPeriodSlidingEnabled?: false;
  periodSlidingSettings?: never;
}

type CustomSliderProps = SlidingEnabledProps | SlidingDisabledProps;

export const EventSlider: React.FC<CustomSliderProps> = ({
  items,
  isPeriodSlidingEnabled = false,
  periodSlidingSettings,
}) => {
  const prevSlideButtonRef = useRef<HTMLButtonElement | null>(null);
  const nextSlideButtonRef = useRef<HTMLButtonElement | null>(null);

  const sliderSettings: SwiperProps = {
    modules: [Navigation, Pagination], // Подключаем оба модуля
    spaceBetween: 20,
    navigation: {
      prevEl: prevSlideButtonRef.current,
      nextEl: nextSlideButtonRef.current,
      disabledClass: s.disabled,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    loop: false,
    breakpoints: {
      920: {
        slidesPerView: 3,
        navigation: {
          enabled: true,
        },
        pagination: {
          enabled: false,
        },
      },
      580: {
        slidesPerView: 2,
        navigation: {
          enabled: false,
        },
        pagination: {
          enabled: true,
        },
      },
    },
    onInit: (swiper) => {
      if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
        swiper.params.navigation.prevEl = prevSlideButtonRef.current;
        swiper.params.navigation.nextEl = nextSlideButtonRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    },
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSlideClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className={s.sliderContainer}>
      {isPeriodSlidingEnabled && (
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
      )}

      <Button ref={prevSlideButtonRef} className={s.prevButton} variant={'secondary'}>
        {'<'}
      </Button>
      <Button ref={nextSlideButtonRef} className={s.nextButton} variant={'secondary'}>
        {'>'}
      </Button>

      <Swiper {...sliderSettings}>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={s.eventItem} onClick={() => handleSlideClick(item)}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedEvent?.title || 'Event Details'}
      >
        <div className={s.modalContent}>
          <p>{selectedEvent?.description}</p>
        </div>
      </Modal>
    </div>
  );
};
