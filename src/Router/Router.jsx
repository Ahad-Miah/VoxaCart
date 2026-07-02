import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import HomePage from '../Pages/Home/HomePage/HomePage';
import AllProducts from '../Pages/AllProducts/AllProducts';

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
      }
    ]
  }
]);

export default Router;