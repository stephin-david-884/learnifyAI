import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/features/auth/authSlice';
import api from '../../../lib/axios';
import AccountBlockedModal from '../../components/modals/AccountBlockedModal';
import type { AppDispatch } from '../../../redux/store';

type Props = {
    children: React.ReactNode;
};

const UserLayout: React.FC<Props> = ({ children }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [blocked, setBlocked] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         try {
    //             const res = await api.get("/auth/me");

    //             if (res.data.user.isBlocked) {
    //                 setBlocked(true);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }, 10000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className='flex h-screen bg-neutral-50 text-neutral-900'>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className='flex-1 flex flex-col overflow-hidden'>
                <Header toggleSidebar={toggleSidebar} />
                <main className='flex-1 overflow-x-hidden overflow-y-auto p-6'>
                    {children}
                </main>
            </div>
            <AccountBlockedModal
                open={blocked}
                onLogout={handleLogout}
            />
        </div>
    )
}

export default UserLayout
