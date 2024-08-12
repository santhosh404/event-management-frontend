import React from "react";
import { Layout, Menu, Avatar, Dropdown, Divider, Button } from "antd";
import { UserOutlined, LogoutOutlined, CalendarOutlined, LoginOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
    
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
        window.location.reload();
    }

    const items = [
        {
            label: (
                <div className="px-2 py-[3px] flex items-center gap-2"><UserOutlined /> Profile</div>
            ),
            key: '0',
        },
        sessionStorage.getItem('USER_AUTH_ROLE') !== "admin" && {
            label: (<div className="px-2 py-[3px] flex items-center gap-2"><CalendarOutlined />My Events</div>),
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: (<div className="px-2 py-[3px] flex items-center gap-2" onClick={handleLogout}><LogoutOutlined />Logout</div>),
            key: '3',
        },
    ]; 



    return (
        <Header className=" bg-[#0c172f] w-full flex fixed top-0 z-10 justify-between items-center shadow-md px-6">
            {/* Logo */}
            <div className="text-xl font-bold">
                <Link to={'/'} alt="Logo" className="h-8 text-white"> ∞ InfinityEvents.com</Link>
            </div>

            {/* Avatar Dropdown */}
            <div className="flex items-center gap-5">
                {
                    sessionStorage.getItem('USER_AUTH_TOKEN') && sessionStorage.getItem('USER_AUTH_ROLE') === "admin" && (
                        <Button type="primary" onClick={() => navigate('/add-event')}>
                            <PlusOutlined />
                            Add Event
                        </Button>
                    )
                }
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
            </div>


        </Header>
    );
};

export default Navbar;
