import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainLayout from './components/layouts/main.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home.jsx'
import Package from './pages/package.jsx'
import Employee from './pages/employee.jsx'
import Subscription from './pages/subscription.jsx'
import Settings from './pages/setting.jsx'
import Customer from './pages/customer.jsx'
import Login from './pages/login.jsx'
import { UserProvider } from './context/UserProvider.jsx'
import { AlertProvider } from './context/AlertProvider.jsx'
import Report from './pages/report.jsx'

const WithLayout = ({ element: Element }) => {
  return (
    <MainLayout>
      <Element />
    </MainLayout>
  );
};
if (window.location.pathname === '/') {
  window.location.href = '/home';
}

const BrowserRouter = createBrowserRouter([
  {
    path: '/home',
    element: <WithLayout element={Home} />,
  },
  {
    path: '/packages',
    element: <WithLayout element={Package} />,
  },
  {
    path: '/customers',
    element: <WithLayout element={Customer} />,
  },
  {
    path: '/employees',
    element: <WithLayout element={Employee} />,
  },
  {
    path: '/subscriptions',
    element: <WithLayout element={Subscription} />,
  },
  {
    path: '/settings',
    element: <WithLayout element={Settings} />,
  },
  {
    path: '/reports/:id',
    element: <WithLayout element={Report} />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <RouterProvider router={BrowserRouter} />
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>,
) 
