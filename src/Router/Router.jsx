import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import HomePage from '../Pages/Home/HomePage/HomePage';
import AllProducts from '../Pages/AllProducts/AllProducts';
import SecurityPage from '../Pages/SecurityPage/SecurityPage';

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
      }
    ]
  }
]);

export default Router;