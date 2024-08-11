import ForgotPassword from './pages/auth/ForgotPassword'
import SignIn from './pages/auth/SignIn'
import Signup from './pages/auth/SignUp'
import Home from './pages/Home'

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
]