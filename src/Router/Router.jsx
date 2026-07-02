import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <div>Home Page</div>
      },
      {
        path: '/shop',
        element: <div>Shop Page</div>
      }
    ]
  }
]);

export default Router;