import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AppPage from '@/pages/App'
import CallbackPage from '@/pages/Callback'
import LoginPage from '@/pages/Login';
import LogoutPage from '@/pages/Logout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppPage/>,
  },
  {
    path:'/callback',
    element: <CallbackPage/>
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/logout',
    element:<LogoutPage/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
