import React, { useState } from 'react'
import Navbar from '../../components/resuable/Navbar'
import AddEventForm from '../../components/resuable/AddEventForm'
import { message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { addEventService } from '../../services/eventServices';
import { useNavigate } from 'react-router-dom';

export default function AddEvent() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(null);

    const onFinish = async (values) => {
        const formattedDate = moment(values.date.$d).format('MMMM D, YYYY');
        const formattedTime = moment(values.time.$d).format('hh:mm A'); 

        const payload = {
            posterImage: imageUrl,
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

        try {
            setLoading(true);
            const response = await addEventService(payload);
            if(response) {
                setLoading(false);
                message.success('Event added successfully!');
               navigate('/')
            }
        } catch (e) {
            setLoading(false);
            message.error(e.response.data.data.error || e.message);
        }

    };


    const handleImageUpload = async (info) => {
        if (info.file.status === 'done') {
            const file = info.file.originFileObj;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'uploadPreset');

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/daofzb94b/image/upload',
                    formData
                );
                setImageUrl(response.data.secure_url);
                message.success('Image uploaded successfully');
            } catch (error) {
                message.error(error.message);
            }
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <AddEventForm
                    onFinish={onFinish}
                    handleImageUpload={handleImageUpload}
                    loading={loading}
                />
            </div>
        </>
    )
}
