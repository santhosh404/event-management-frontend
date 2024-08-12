import React from 'react';
import { Card } from 'antd';
import { UserOutlined, EnvironmentOutlined, SoundOutlined } from '@ant-design/icons';

const EventGuideCard = () => {
    return (
        <Card title="Event Guide" className="w-full max-w-md mx-auto shadow-lg">
            <div className="flex flex-col gap-4">
                <div className='flex items-center gap-2'>
                    <UserOutlined className="text-2xl" />
                    <div>
                        <h2 className="text-gray-600 text-sm font-semibold">For Age(s)</h2>
                        <p className="text-md text-black flex items-center gap-2">
                            Family Friendly
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <EnvironmentOutlined className="text-2xl" />
                    <div>
                        <h2 className="text-gray-600 text-sm font-semibold">Language</h2>
                        <p className="text-md text-black flex items-center gap-2">
                            Tamil
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <SoundOutlined className="text-2xl" />
                    <div>
                        <h2 className="text-gray-600 text-sm font-semibold">Live Performance</h2>
                        <p className="text-md text-black flex items-center gap-2">
                            Enjoy a unique experience
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default EventGuideCard;
