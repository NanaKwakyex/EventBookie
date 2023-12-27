import React, { useState } from 'react';
import EventCard from './EventCard';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CarouselComponent = ({ events }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const CustomNextArrow = ({ onClick }) => (
    console.log("next slides"),
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowRight} />
    </button>
    
  );

  const CustomPrevArrow = ({ onClick }) => (
    console.log("Prev slides"),
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full cursor-pointer z-10"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
    
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: false,
    focusOnSelect: false,
    variableWidth: false,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  };

  return (
    <div className="relative flex justify-center">
      <Slider className="w-full lg:w-4/5 xl:w-4/5" {...settings}>
        {events.map((event, index) => (
          <div
            key={index}
            className={`flex justify-center ml-4 sm:ml-8 md:ml-12 lg:ml-16 ${
              index === currentSlide ? 'slick-center' : ''
            }`}
          >
            {/* Set a fixed width for each item */}
            <EventCard
              eventName={event.name}
              eventDate={event.dates.start.localDate}
              eventLocation={event._embedded.venues[0].name}
              priceRange="$30 - $60"
              imageUrl={event.images[0].url}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
