import React from 'react';
import { Tag } from 'antd';
import {
    AppstoreOutlined,
    CustomerServiceOutlined,
    SmileOutlined,
    ToolOutlined,
} from '@ant-design/icons';

const Filter = ({ activeFilter, handleFilterChange, tags }) => {
    return (
        <div className='flex justify-center gap-2 my-5'>
            {['All Events', 'Music', 'Comedy', 'Workshop'].map((category) => {
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
                    case 'Workshop':
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
                        <h1 className='text-md ml-2 font-semibold'>{category} ({
                            category === 'All Events' ? tags.totalCount :
                            tags?.tag?.find(t => t.tagName.toLowerCase() === category.toLowerCase())?.tagCount
                        })</h1>
                    </Tag>
                );
            })}
        </div>
    );
};

export default Filter;
