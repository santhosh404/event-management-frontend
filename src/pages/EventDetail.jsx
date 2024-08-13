import React, { useEffect, useState } from 'react';
import AddEventForm from '../components/resuable/AddEventForm';
import EventDetailUI from '../components/EventDetailUI';
import { getEventByIdService, updateEventService } from '../services/eventServices';
import { message } from 'antd';
import Navbar from '../components/resuable/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';


const EventDetail = () => {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('USER_AUTH_ROLE');

  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const onFinish = async (values) => {
    const formattedDate = moment(values.date.$d).format('MMMM D, YYYY');
    const formattedTime = moment(values.time.$d).format('hh:mm A');

    const payload = {
      posterImage: event?.posterImage,
      title: values.title,
      description: values.description,
      location: values.location,
      date: formattedDate,
      time: formattedTime,
      price: values.price,
      organizerCompany: values.organizerCompany,
      capacity: values.capacity,
      tag: values.tag,
      status: values.status
    }

    setLoading(true);
    try {
      const response = await updateEventService(id, payload);
      if (response) {
        setLoading(false);
        message.success('Event updated successfully!');
        navigate('/')
      }
    } catch (err) {
      message.error(err?.response?.data?.data?.error || err.message);
    }
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
            eventDetail={event}
            isUpdate
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
