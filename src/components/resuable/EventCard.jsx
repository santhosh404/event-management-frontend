import React from 'react';
import { Card, Button } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, WalletOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DisplayEventCard = ({ eventData, isMyBookings }) => {
    const navigate = useNavigate(null);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
        >
            <Card
                hoverable
                style={{ maxWidth: 400, height: 450, margin: '0 auto', borderRadius: '20px' }}
                cover={
                    <img
                        alt="Poster"
                        src={eventData.posterImage}
                        style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                    />
                }
                className='relative'
                onClick={() => navigate(`/event/${eventData._id}`)}
            >
                <Card.Meta
                    title={eventData.title}
                    description={
                        <div className="text-gray-600">
                            <div className="flex items-center mb-2">
                                <CalendarOutlined className="mr-2" />
                                <span>{eventData.date} | {eventData.time}</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <EnvironmentOutlined className="mr-2" />
                                <span>{eventData.location}</span>
                            </div>
                        </div>
                    }
                />
                <div className="mt-4 flex justify-between absolute bottom-5 w-[87%] px-3 items-center py-2 rounded-[20px] bg-gray-100">

                    {
                        isMyBookings ? (
                            <div className='flex gap-1'>
                                <h1 className='font-bold'>Note:</h1>
                                <small>Your Ticket has been booked booked this event. Please check mail and download your ticket. Enjoy your event!</small>
                            </div>
                        ) : (
                            <>
                                <div className="text-lg font-bold flex items-center">
                                    <WalletOutlined className="mr-2" />
                                    <span>₹ {eventData.price}</span>
                                </div>
                                <Button type="secondary" size="large">
                                    Buy Now
                                </Button>
                            </>

                        )
                    }

                </div>
            </Card>
        </motion.div>
    );
};

export default DisplayEventCard;
