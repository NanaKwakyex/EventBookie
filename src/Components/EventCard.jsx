import React from "react";

const EventCard = ({ eventName, eventDate, eventLocation, priceRange, imageUrl }) => {
  return (
    <div className="w-full md:w-72 lg:w-96 mb-8 md:mb-16 lg:mb-24 rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="w-full h-2/3">
        <img src={imageUrl} alt={eventName} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{eventName}</h2>
        <p className="text-sm text-gray-600 mb-2">{eventDate}</p>
        <p className="text-sm text-gray-600 mb-2">{eventLocation}</p>
        <p className="text-sm text-gray-600">Price Range: {priceRange}</p>
      </div>
    </div>
  );
};

export default EventCard;
