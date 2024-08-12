import React, { useEffect, useState } from 'react';
import AddEventForm from '../components/resuable/AddEventForm';
import EventDetailUI from '../components/EventDetailUI';
import { getEventByIdService } from '../services/eventServices';
import { message } from 'antd';
import Navbar from '../components/resuable/Navbar';
import { useParams } from 'react-router-dom';


const EventDetail = () => {
  const isAdmin = sessionStorage.getItem('USER_AUTH_ROLE');

  const [event, setEvent] = useState({});
  const { id } = useParams();

  const onFinish = (values) => {
    // Handle form submission
    console.log('Received values of form: ', values);
  };

  useEffect(() => {

    async function getEventByIdHandler() {
      try {
        const response = await getEventByIdService(id);
        setEvent(response.data);
      } catch (err) {
        message.error(err.message);
      }
    }
    getEventByIdHandler();

  }, []);

  return (
    <>
      <Navbar />
      {
        isAdmin === 'admin' ? (
          <AddEventForm
            onFinish={onFinish}
          />
        ) : (
          <EventDetailUI
            event={event}
          />
        )
      }

    </>
  );

};

export default EventDetail;
