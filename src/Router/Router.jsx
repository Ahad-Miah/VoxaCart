import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import HomePage from '../Pages/Home/HomePage/HomePage';
import AllProducts from '../Pages/AllProducts/AllProducts';
import SecurityPage from '../Pages/SecurityPage/SecurityPage';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <div><HomePage></HomePage></div>
      },
      {
        path: '/ALL PRODUCTS',
        element: <AllProducts></AllProducts>
      },
      {
        path: '/protocol',
        element: <SecurityPage></SecurityPage>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
       {
        path: '/register',
        element: <Register></Register>
      }
    ]
  },
   {
        path: 'dashboard',
        element:<Dashboard></Dashboard> ,
        children: [
            {
                
            }
        ]
     },
]);

export default Router;