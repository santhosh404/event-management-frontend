import React from 'react';
import { Form, Input, Button, DatePicker, TimePicker, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const AddEventForm = ({ onFinish, handleImageUpload, loading }) => {


    return (
        <div className="max-w-xl mx-auto p-8">
            <Form
                layout="vertical"
                onFinish={onFinish}
                className="space-y-4"
            >
                {/* Poster Image */}
                <Form.Item
                    name="posterImage"
                    label="Poster Image"
                    rules={[{ required: true, message: 'Please upload a poster image!' }]}
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        customRequest={({ onSuccess }) => onSuccess('ok')}
                        onChange={handleImageUpload}
                    >
                        <Button icon={<UploadOutlined />}>Upload Poster Image</Button>
                    </Upload>
                </Form.Item>

                {/* Title */}
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter the title!' }]}
                >
                    <Input placeholder="Enter the event title" />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description!' }]}
                >
                    <TextArea rows={4} placeholder="Enter the event description" />
                </Form.Item>

                {/* Date and Time in a Row */}
                <div className="flex space-x-4">
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={[{ required: true, message: 'Please select the date!' }]}
                        className="flex-1"
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item
                        name="time"
                        label="Time"
                        rules={[{ required: true, message: 'Please select the time!' }]}
                        className="flex-1"
                    >
                        <TimePicker className="w-full" format="HH:mm" />
                    </Form.Item>
                </div>

                {/* Location */}
                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{ required: true, message: 'Please enter the location!' }]}
                >
                    <Input placeholder="Enter the event location" />
                </Form.Item>

                {/* Organizer Company */}
                <Form.Item
                    name="organizerCompany"
                    label="Organizer Company"
                    rules={[{ required: true, message: 'Please enter the organizer company!' }]}
                >
                    <Input placeholder="Enter the organizer company name" />
                </Form.Item>

                {/* Capacity and Price in a Row */}
                <div className="flex space-x-4">
                    <Form.Item
                        name="capacity"
                        label="Capacity"
                        rules={[{ required: true, message: 'Please enter the capacity!' }]}
                        className="flex-1"
                    >
                        <InputNumber min={1} className="w-full" placeholder="Enter the capacity" />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please enter the price!' }]}
                        className="flex-1"
                    >
                        <Input placeholder="Enter the price" />
                    </Form.Item>
                </div>

                {/* Tag */}
                <Form.Item
                    name="tag"
                    label="Tag"
                >
                    <Select placeholder="Select a tag">
                        <Option value="music">Music</Option>
                        <Option value="standup comedy">Comedy</Option>
                        <Option value="standup comedy">Workshop</Option>
                    </Select>
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    initialValue="upcoming"
                >
                    <Select placeholder="Select status">
                        <Option value="upcoming">Upcoming</Option>
                        <Option value="cancelled">Cancelled</Option>
                        <Option value="finished">Finished</Option>
                    </Select>
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddEventForm;
