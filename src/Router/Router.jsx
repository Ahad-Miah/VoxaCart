import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import HomePage from '../Pages/Home/HomePage/HomePage';

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
        path: '/shop',
        element: <div>Shop Page</div>
      }
    ]
  }
]);

export default Router;