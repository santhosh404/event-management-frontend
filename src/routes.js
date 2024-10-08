import AddEvent from './pages/admin/AddEvent';
import ForgotPassword from './pages/auth/ForgotPassword'
import SignIn from './pages/auth/SignIn'
import Signup from './pages/auth/SignUp'
import EventDetail from './pages/EventDetail';
import Home from './pages/Home'
import MyBooking from './pages/MyBooking';

export const publicRoutes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/sign-in',
        component: SignIn,
    },
    {
        path: '/sign-up',
        component: Signup,
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
        requiresAuth: true,
    },
    // {
    //     path: 'reset-password',
    //     component:
    // }
];

export const privateRoutes = [
    { 
        path: '/event/add-event', 
        component: AddEvent
    },
    {
        path: 'event/:id',
        component: EventDetail
    }, 
    {
        path: 'event/my-booking',
        component: MyBooking
    }
]