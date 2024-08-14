import React, { useEffect, useState } from 'react'
import Navbar from '../components/resuable/Navbar'
import { filterByTagName, getAllEventsService, getEventByTagService } from '../services/eventServices'
import { message, Tag } from 'antd';
import EventCard from '../components/resuable/EventCard';
import Filter from '../components/resuable/Filter';

export default function Home() {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All Events');
  const [tags, setTags] = useState({})

  const handleFilterChange = async (filter) => {
    setActiveFilter(filter);

    if(filter === 'All Events') {
      setFilteredEvents(events);
      return;
    }

    // Filter logics here
    try {
      const response = await filterByTagName(filter);
      if(response) {
        setFilteredEvents(response.data);
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  useEffect(() => {
    async function getEvents() {
      try {
        const response = await getAllEventsService();
        if (response) {
          setEvents(response.data);
          setFilteredEvents(response.data);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    async function getEventsUsingTags() {
      try {
        const response = await getEventByTagService();
        if (response) {
          console.log(response.data);
          setTags(response.data);
        }
      } catch (err) {
        message.error(err.message);
      }
    }

    getEventsUsingTags();
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
          tags={tags}
         />
        </div>

        {filteredEvents.length === 0 && <p className='flex justify-center'>No events found.</p>}
        <div className='flex justify-center gap-4 flex-wrap mb-10 mt-4 items-center'>
          {filteredEvents.length > 0 && filteredEvents.map((event) => (
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
