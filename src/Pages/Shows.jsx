import React, { useState, useEffect } from 'react';
import EventCard from '../Components/EventCard';

const Shows = () => {
  const [ticketmasterEvents, setTicketmasterEvents] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('shows'); // Default genre
  const apiKey = '6RBlK9d5FW3sJE7gJnojn9OYWfgg6Czc'; // Replace with your Ticketmaster API key

  // Fetch Ticketmaster events
  useEffect(() => {
    const washingtonDCLat = 38.8951100;
    const washingtonDCLong = -77.0363700;
    const radius = 75;
    const segmentId = "KZFzniwnSyZfZ7v7na";

    console.log('Fetching Ticketmaster data...');
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?segmentId=${segmentId}&latlong=${washingtonDCLat},${washingtonDCLong}&radius=${radius}&apikey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Ticketmaster data:', data);
        const ticketmasterEventList = data._embedded?.events || [];
        const sortedTicketmasterEvents = ticketmasterEventList.sort((a, b) => {
          const dateA = new Date(a.dates.start.localDate);
          const dateB = new Date(b.dates.start.localDate);
          return dateA - dateB;
        });

        setTicketmasterEvents(sortedTicketmasterEvents);
      })
      .catch((error) => console.error('Error fetching Ticketmaster data:', error));
  }, [apiKey]);

  // Fetch local events
  useEffect(() => {
    const localEventsApiEndpoint = `https://kv2ch5exkg.execute-api.us-east-1.amazonaws.com/devv/readEvents-devv?genre=${selectedGenre}`;

    console.log('Fetching local data...');
    fetch(localEventsApiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Local data:', data);
        const localEventList = data || [];
        const sortedLocalEvents = localEventList.sort((a, b) => {
          const dateA = new Date(a.event_date);
          const dateB = new Date(b.event_date);
          return dateA - dateB;
        });

        setLocalEvents(sortedLocalEvents);
      })
      .catch((error) => console.error('Error fetching local data:', error));
  }, [selectedGenre]);

  // Combine Ticketmaster and local events
  const allEvents = [...ticketmasterEvents, ...localEvents];

  // Render events
  return (
    <div>
      <h1 className='text-center text-3xl my-16'>Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
        {allEvents.map((event, index) => (
          <EventCard
            key={index}
            eventName={event.EventTitle || event.name}
            eventDate={event.EventDate || event.dates?.start?.localDate}
            eventLocation={event.EventLocation || event._embedded?.venues[0]?.name}
            priceRange="$30 - $60"
            imageUrl={event.EventImageUrl ? `https://eventbookie.s3.amazonaws.com/event_images/${event.EventImageUrl}` : '' || event.images?.[0]?.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Shows;
