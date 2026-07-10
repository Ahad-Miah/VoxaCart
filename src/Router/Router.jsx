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
import AdminOverview from '../Pages/Dashboard/RightSide/AdminRoutes/AdminOverview/AdminOverview';
import ManageUsers from '../Pages/Dashboard/RightSide/AdminRoutes/ManageUsers/ManageUsers';
import VendorApplications from '../Pages/Dashboard/RightSide/AdminRoutes/VendorApplications/VendorApplications';
import ProductAudit from '../Pages/Dashboard/RightSide/AdminRoutes/ProductAudit/ProductAudit';
import ReviewControl from '../Pages/Dashboard/RightSide/AdminRoutes/ReviewControl/ReviewControl';
import UpdateProduct from '../Pages/Dashboard/RightSide/updateProduct/UpdateProduct';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import Checkout from '../Pages/CheckOut/Checkout';
import VendorRequest from '../Pages/Dashboard/RightSide/VendorRequest/VendorRequest';

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
      },
      {
        path: '/details/:id',
        element: <ProductDetails></ProductDetails>
      },
      {
        path:'/order/:id',
        element:<Checkout></Checkout>
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
              path:'vendorRequests',
              element:<VendorRequest></VendorRequest>
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
            },
            {
                path:'admin-overview',
                element:<AdminOverview></AdminOverview>
            },
            {
                path:'manage-users',
                element:<ManageUsers></ManageUsers>
            },
            {
                path:'vendor-apps',
                element:<VendorApplications></VendorApplications>
            },
             {
                path:'product-audit',
                element:<ProductAudit></ProductAudit>
            },
             {
                path:'review-control',
                element:<ReviewControl></ReviewControl>
            },
            {
              path:"updateProduct/:id",
              element:<UpdateProduct></UpdateProduct>,
            }
        ]
     },
]);

export default Router;