import React, { useEffect, useState } from 'react'
import Navbar from '../components/resuable/Navbar'
import { getUserBookingsService } from '../services/eventServices';
import EventCard from '../components/resuable/EventCard';
import { message } from 'antd';

export default function MyBooking() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function getEvents() {
            try {
                const response = await getUserBookingsService();
                if (response) {
                    setEvents(response.data.booking.map(booking => booking.eventId));
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
                <h1 className='text-2xl font-[900]'>My Bookings ({events?.length})</h1>
                <hr />

                {events.length === 0 && <p className='flex justify-center'>No events found.</p>}
                <div className='flex justify-center gap-4 flex-wrap mb-10 mt-4 items-center'>
                    {events.length > 0 && events.map((event) => (
                        <EventCard
                            key={event._id}
                            eventData={event}
                            isMyBookings
                        />
                    ))}
                </div>

            </div>

        </>
    )
}
