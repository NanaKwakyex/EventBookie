// Home.jsx

import React, { useState, useEffect } from 'react';
import EventCard from '../Components/EventCard';
import CarouselComponent from '../Components/Carousel';

function Home() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEvents = async () => {
    try {
      const apiKey = 'YOUR_TICKETMASTER_API_KEY';
      const longitude = -77.0363700;
      const latitude = 38.8951100;
      const radius = 50
      const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?size=15&apikey=${apiKey}&latlong=${latitude},${longitude}&radius=${radius}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Ticketmaster API response:', data);
      setEvents(data._embedded ? data._embedded.events : []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // Runs once when the component mounts

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality based on the searchQuery
    // You can use the searchQuery to filter events or perform another API call
    console.log('Search query:', searchQuery);
  };

  return (
    <>
      <h1 className="text-center py-16 text-4xl text-red-500">
        Welcome to Event Bookie
      </h1>
      <h3 className="text-center py-4 text-xl text-orange-500">
        Where you can find events you'll love!
      </h3>
      <div className="flex justify-center items-center py-8">
        <div className="flex justify-center border rounded-lg overflow-hidden w-1/2">
          <input
            type="text"
            placeholder="Search for events near you"
            className="search-input flex-grow px-4 py-2 text-center"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            className="search-button bg-red-500 text-white px-4 py-4 hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <h1 className="text-red-500 text-4xl text-center py-24">
        Top events in your area
      </h1>
      
        <CarouselComponent events={events} />

        <section className="py-16 px-4">
        <h2 className="text-3xl text-center text-blue-500 mb-8">Explore EventBookie, Your new best friend!</h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Text on the left side */}
          <div className="md:w-full text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-proxima-nova">
              Discover, book, and connect with events effortlessly on Event Bookie.
              We're not just a ticketing platform; we're a trusted channel for event
              organizers and attendees to stay in sync.
            </p>
          </div>

          {/* Image on the right side */}
          <div className="md:w-full mb-4 md:mb-0 flex justify-center">
            {/* Replace 'your-image-source' with the actual source of your image */}
            <img
              src="/images/funEvent.jpg"
              alt="fun Event"
              className="w-full md:w-3/4 h-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-3xl text-center text-green-500 mb-8">Bring Your Event To Life!</h2>
        <div className="flex flex-col md:flex-row items-center">
          {/* Image on the left side */}
          <div className="md:w-full mb-4 md:mb-0">
            {/* Replace 'your-image-source' with the actual source of your image */}
            <img
              src="/images/eventHost.jpeg"
              alt="eventHosting"
              className="flex justify-center md:w-3/4"
            />
          </div>
          {/* text on the right side */}
          <div className="md:w-full text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-proxima-nova">
              Event Bookie revolutionizes the way you find, attend, and organize events.
              Say goodbye to scattered information and ticketing hassles.
              With Event Bookie, you're in control from the very beginning.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;