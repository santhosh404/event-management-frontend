import React from 'react';
import { Tag } from 'antd';
import {
    AppstoreOutlined,
    CustomerServiceOutlined,
    SmileOutlined,
    ToolOutlined,
} from '@ant-design/icons';

const Filter = ({ activeFilter, handleFilterChange }) => {
    return (
        <div className='flex justify-center gap-2 my-5'>
            {['All Events', 'Music', 'Comedy', 'Workshops'].map((category) => {
                let icon;

                switch (category) {
                    case 'All Events':
                        icon = <AppstoreOutlined />;
                        break;
                    case 'Music':
                        icon = <CustomerServiceOutlined />;
                        break;
                    case 'Comedy':
                        icon = <SmileOutlined />;
                        break;
                    case 'Workshops':
                        icon = <ToolOutlined />;
                        break;
                    default:
                        icon = null;
                }

                return (
                    <Tag
                        key={category}
                        color={activeFilter === category ? 'blue' : 'default'}
                        onClick={() => handleFilterChange(category)}
                        className="cursor-pointer px-3 py-1 bg-white flex items-center"
                    >
                        {icon}
                        <h1 className='text-md ml-2 font-semibold'>{category} (21)</h1>
                    </Tag>
                );
            })}
        </div>
    );
};

export default Filter;
