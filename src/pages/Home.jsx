import React, { useEffect, useState } from 'react'
import Navbar from '../components/resuable/Navbar'
import { getAllEventsService } from '../services/eventServices'
import { message, Tag } from 'antd';
import EventCard from '../components/resuable/EventCard';
import {
  AppstoreOutlined,
  CustomerServiceOutlined,
  SmileOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import Filter from '../components/resuable/Filter';

export default function Home() {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Events');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);

    // Filter logics here
  }

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await getAllEventsService();
        if (response) {
          setEvents(response.data);
        }
      } catch (err) {
        message.error(err.message);
      }
    }

    getEvents();
  }, [])

  
  return (
    <>
      <Navbar />
      <div className='max-w-[1400px] mx-auto flex flex-col justify-center gap-2 mt-24'>
        <h1 className='text-2xl font-[900]'>Popular Events ({events?.length})</h1>
        <hr />
        <div className="flex gap-2 mt-4 justify-center">
         <Filter 
          activeFilter={activeFilter}
          handleFilterChange={handleFilterChange}
         />
        </div>

        {events.length === 0 && <p>No events found.</p>}
        <div className='flex justify-center gap-4 flex-wrap mb-10 mt-4 items-center'>
          {events.length > 0 && events.map((event) => (
            <EventCard
              key={event._id}
              eventData={event}
            />
          ))}
        </div>

      </div>

    </>
  )
}
