import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

const Tickets = () => {
  // Placeholder data
  const userData = {
    fullName: 'John Doe',
    phoneNumber: '123-456-7890',
    emailAddress: 'john.doe@example.com',
    username: 'johndoe',
  };

  const ticketHistoryData = [
    { eventName: 'Concert 1', date: '2023-01-01', location: 'Venue A', price: '$50.00' },
    { eventName: 'Concert 2', date: '2023-02-15', location: 'Venue B', price: '$60.00' },
    // Add more ticket history data as needed
  ];

  const hostingHistoryData = [
    { eventName: 'Event 1', date: '2023-03-10', location: 'Venue X' },
    { eventName: 'Event 2', date: '2023-04-20', location: 'Venue Y' },
    // Add more hosting history data as needed
  ];

  // Placeholder functions for handling account settings
  const updateAccountSettings = () => {
    // Implement account settings update logic
  };

  return (
    <div className="container mx-auto my-8">
      <div className="w-1/2 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-4">
            <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">My Account</Tab>
            <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">Ticket History</Tab>
            <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">Hosting History</Tab>
            <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">Account Settings</Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {/* My Account Tab */}
              <div className="my-4">
              <h2 className="text-2xl font-bold">My Account</h2>
              <div>
                <p>Full Name: {userData.fullName}</p>
                <p>Phone Number: {userData.phoneNumber}</p>
                <p>Email Address: {userData.emailAddress}</p>
                <p>Username: {userData.username}</p>
              </div>
            </div>
            </Tab.Panel>

            <Tab.Panel>
              {/* Ticket History Tab */}
              <div className="my-4">
              <h2 className="text-2xl font-bold">Ticket History</h2>
              {ticketHistoryData.map((ticket, index) => (
                <div key={index} className="border p-4 my-2">
                  <p>{ticket.eventName}</p>
                  <p>Date: {ticket.date}</p>
                  <p>Location: {ticket.location}</p>
                  <p>Price: {ticket.price}</p>
                </div>
              ))}
            </div>
            </Tab.Panel>

            <Tab.Panel>
              {/* Hosting History Tab */}
              <div className="my-4">
              <h2 className="text-2xl font-bold">Hosting History</h2>
              {hostingHistoryData.map((event, index) => (
                <div key={index} className="border p-4 my-2">
                  <p>{event.eventName}</p>
                  <p>Date: {event.date}</p>
                  <p>Location: {event.location}</p>
                </div>
              ))}
            </div>
            </Tab.Panel>

            <Tab.Panel>
              {/* Account Settings Tab */}
              <div className="my-4">
              <h2 className="text-2xl font-bold">Account Settings</h2>
              <p>Edit your account settings here</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={updateAccountSettings}
              >
                Update Settings
              </button>
            </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Tickets;
