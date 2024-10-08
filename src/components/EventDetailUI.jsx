import React, { useState } from 'react';
import { Card, Button, Modal, InputNumber, message } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, WalletOutlined } from '@ant-design/icons';
import EventGuideCard from './EventGuideCard';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TagOutlined from "../assets/tag.svg";
import { bookEventService } from '../services/eventServices';
import moment from 'moment';
import { generateTransactionId } from '../helper';

const EventDetailUI = ({ event }) => {
    const navigate = useNavigate(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ticketQuantity, setTicketQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleBuyNow = () => {
        if (sessionStorage.getItem('USER_AUTH_TOKEN') && sessionStorage.getItem('USER_AUTH_ROLE')) {
            setIsModalVisible(true);
            return;
        }
        navigate('/sign-in')
    };

    const handleCancel = () => {
        setTicketQuantity(1);
        setIsModalVisible(false);
    };

    const handleTicketChange = (value) => {
        setTicketQuantity(value);
    };

    const handleConfirmBooking = async () => {
        setLoading(true);
        try {
            const payload = {
                paymentId: generateTransactionId(), // Duplicately generating transaction id
                eventId: event._id,
                noOfSeats: ticketQuantity,
                bookingDate: moment().format('YYYY-MM-DD')
            }
            const response = await bookEventService(payload);
            if (response) {
                setLoading(false);
                message.success('Event booking successful');
                setIsModalVisible(false);
                navigate('/event/my-booking');
            }
        } catch (err) {
            setLoading(false);
            message.error(err?.response?.data?.data?.error || err?.message)
        }
    }

    const totalPrice = ticketQuantity * event.price;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
        >
            <div className="max-w-[1400px] mx-auto mb-10 mt-24 flex flex-col md:flex-row justify-between items-start gap-10 p-5">
                {/* Left Side - Poster Image and Description */}
                <div className="flex flex-col items-start">
                    <img
                        src={event.posterImage}
                        alt={event.title}
                        className="w-full max-w-[1000px] rounded-lg shadow-lg"
                    />
                    <div className='flex flex-col gap-3 mt-10'>
                        <h3 className='text-lg font-bold underline'>About the Event</h3>
                        <p className="text-md text-gray-700 max-w-[1000px] whitespace-pre-wrap text-justify">
                            {event.description}
                        </p>
                    </div>
                </div>

                {/* Right Side - Event Details */}
                <div className='flex flex-col gap-5'>

                    <Card className="w-full max-w-[500px] shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                        <div className="flex items-center gap-3 mb-3">
                            <img src={TagOutlined} />
                            <span className="text-md text-gray-600">{event.tag}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <CalendarOutlined className="text-lg" />
                            <span className="text-md text-gray-600">{event.date} | {event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <EnvironmentOutlined className="text-lg" />
                            <span className="text-md text-gray-600">{event.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center gap-3">
                                <WalletOutlined className="text-lg" />
                                <span className="text-xl font-bold">₹ {event.price} Onwards</span>
                            </div>
                            {
                                event.capacity <= 0 ? <h1 className='text-lg font-bold text-red-500'>SOLD OUT</h1> : (
                                    <Button type="primary" onClick={handleBuyNow} >Buy Now</Button>
                                )
                            }
                        </div>
                    </Card>
                    <EventGuideCard />
                </div>
            </div>

            {/* Modal for Ticket Selection */}
            <Modal
                title="Select Number of Tickets"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="buy" type="primary" onClick={handleConfirmBooking} loading={loading}>
                        Proceed to Payment
                    </Button>
                ]}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-md">Number of Tickets:</span>
                        <InputNumber
                            min={1}
                            defaultValue={1}
                            onChange={handleTicketChange}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold">Total Price:</span>
                        <span className="text-lg font-bold">₹ {totalPrice}</span>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default EventDetailUI;
