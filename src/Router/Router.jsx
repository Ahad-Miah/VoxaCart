import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout/MainLayout';
import HomePage from '../Pages/Home/HomePage/HomePage';
import AllProducts from '../Pages/AllProducts/AllProducts';
import SecurityPage from '../Pages/SecurityPage/SecurityPage';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import MyProfile from '../Pages/Dashboard/MyProfile/MyProfile';
import UserOverview from '../Pages/Dashboard/RightSide/UserOverview/UserOverview';
import UserCart from '../Pages/Dashboard/RightSide/userCart/UserCart';
import WishList from '../Pages/Dashboard/RightSide/WishList/WishList';
import Orders from '../Pages/Dashboard/RightSide/Orders/Orders';
import VendorStats from '../Pages/Dashboard/RightSide/VendorStats/VendorStats';
import AddProduct from '../Pages/Dashboard/RightSide/AddProduct/AddProduct';
import ManageProducts from '../Pages/Dashboard/RightSide/ManageProducts/ManageProducts';
import VendorAICore from '../Pages/Dashboard/RightSide/VendorAICore/VendorAICore';

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
                path:'myProfile',
                element:<MyProfile></MyProfile>
            },
            {
                path:'userOverview',
                element:<UserOverview></UserOverview>
            }
            , {
                path:'cart',
                element:<UserCart></UserCart>
            },
            {
                path:'wishlist',
                element:<WishList></WishList>
            },
            {
                path:'orders',
                element:<Orders></Orders>
            },
            {
                path:'vendor-stats',
                element:<VendorStats></VendorStats>
            },
            {
                path:'add-product',
                element:<AddProduct></AddProduct>
            },
             {
                path:'my-products',
                element:<ManageProducts></ManageProducts>
            },
             {
                path:'vendor-ai',
                element:<VendorAICore></VendorAICore>
            }
        ]
     },
]);

export default Router;