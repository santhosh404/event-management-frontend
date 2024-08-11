import React from "react";
import { Layout, Menu, Avatar, Dropdown, Divider, Button } from "antd";
import { UserOutlined, LogoutOutlined, CalendarOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    const items = [
        {
            label: <div className="px-2 py-[3px] flex items-center gap-2"><UserOutlined /> Profile</div>,
            key: '0',
        },
        {
            label: <div className="px-2 py-[3px] flex items-center gap-2"><CalendarOutlined />My Events</div>,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <div className="px-2 py-[3px] flex items-center gap-2" onClick={handleLogout}><LogoutOutlined />Logout</div>,
            key: '3',
        },
    ];


    return (
        <Header className="bg-white flex justify-between items-center shadow-md px-6">
            {/* Logo */}
            <div className="text-xl font-bold">
                <h1 src="/logo.png" alt="Logo" className="h-8"> ∞ InfinityEvents.com</h1>
            </div>

            {/* Avatar Dropdown */}
            {
                sessionStorage.getItem('USER_AUTH_TOKEN') && sessionStorage.getItem('USER_AUTH_ROLE') ? (
                    <Dropdown
                        menu={{ items, }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Avatar
                            size="large"
                            icon={<UserOutlined />}
                            className="cursor-pointer"
                        />
                    </Dropdown>) : (
                    <Button color="primary" className="flex items-center gap-2" onClick={() => navigate('/sign-in')}>
                        <LoginOutlined />
                        <span className="text-sm">Login</span>
                    </Button>
                )
            }

        </Header>
    );
};

export default Navbar;
