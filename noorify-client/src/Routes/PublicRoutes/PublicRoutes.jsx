import React from 'react';
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from '../../Layout/Main/Main';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import Register from '../../Pages/Registration/Register';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../../Layout/Dashboard/Dashboard';
import Favourite from '../../Pages/Dashboard/Favourite/Favourite';
import Profile from '../../Pages/Dashboard/Profile/Profile';
import UserHome from '../../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../../Pages/Dashboard/AdminHome/AdminHome';
import AdminAllUser from '../../Pages/Dashboard/AdminAllUser/AdminAllUser';
import AdminRoute from '../AdminRoute/AdminRoute';
import AdminAddProduct from '../../Pages/Dashboard/AdminAddProduct/AdminAddProduct';
import AdminManageProduct from '../../Pages/Dashboard/AdminManageProduct/AdminManageProduct';
import AdminUpdateProducts from '../../Pages/Dashboard/AdminAddProduct/AdminUpdateProducts';
import Products from '../../Pages/Products/Products';
import ProsuctDetails from '../../Pages/Products/ProsuctDetails';
import YourQuestions from '../../Pages/YourQuestions/YourQuestions';
import TotalQuestions from '../../Pages/YourQuestions/TotalQuestions';
import QuestionsWithAnswer from '../../Pages/YourQuestions/QuestionsWithAnswer';
import QuestionsWithoutAnswer from '../../Pages/YourQuestions/QuestionsWithoutAnswer';
import AdminQuestionsManagement from '../../Pages/Dashboard/AdminQuestionsManagement/AdminQuestionsManagement';
import AdminTotalQuestions from '../../Pages/Dashboard/AdminQuestionsManagement/AdminTotalQuestions';
import AdminQuestionsWithAnswers from '../../Pages/Dashboard/AdminQuestionsManagement/AdminQuestionsWithAnswers';
import AdminQuestionsWithoutAnswers from '../../Pages/Dashboard/AdminQuestionsManagement/AdminQuestionsWithoutAnswers';
import AboutUs from '../../Pages/AboutUs/AboutUs';
import ManageVideos from '../../Pages/Dashboard/ManageVideos/ManageVideos';
import AddVideos from '../../Pages/Dashboard/ManageVideos/AddVideos';
import AllVideos from '../../Pages/Dashboard/ManageVideos/AllVideos';
import Videos from '../../Pages/Videos/Videos';
import Carts from '../../Pages/Dashboard/Carts/Carts';
import CartOrder from '../../Pages/OrderPage/CartOrder';
import BuyNowPage from '../../Pages/OrderPage/BuyNowPage';
import Orders from '../../Pages/Dashboard/Orders.jsx/Orders';
import AdminOrderManage from '../../Pages/Dashboard/AdminManageOrders/AdminOrderManage';
import AdminAllOrders from '../../Pages/Dashboard/AdminManageOrders/AdminAllOrders';
import AdminConfirmedOrders from '../../Pages/Dashboard/AdminManageOrders/AdminConfirmedOrders';
import AdminProcessingOrders from '../../Pages/Dashboard/AdminManageOrders/AdminProcessingOrders';
import AdminDeliveredOrders from '../../Pages/Dashboard/AdminManageOrders/AdminDeliveredOrders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/products",
          element: <Products></Products>
        },
        {
          path: "/product-details/:id",
          element: <ProsuctDetails></ProsuctDetails>,
          loader: ({params}) => fetch(`https://noorify-server.vercel.app/products/${params.id}`)
        },
        {
          path: "/about-us",
          element: <AboutUs></AboutUs>
        },
        {
          path: "/all-videos",
          element: <Videos></Videos>
        },
        {
          path: "/cart-order-page",
          element: <PrivateRoute><CartOrder></CartOrder></PrivateRoute> ,
        },
        {
          path: "/buy-now/:id",
          element: <PrivateRoute><BuyNowPage></BuyNowPage></PrivateRoute> ,
        }
    ]
  },

  // Users Routes 
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "/dashboard/favourite",
        element: <Favourite></Favourite>
      },
      {
        path: "/dashboard/carts",
        element: <Carts></Carts>
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>
      },
      {
        path: "/dashboard/user-home",
        element: <UserHome></UserHome>
      },
      {
        path: "/dashboard/your-questions",
        element: <YourQuestions></YourQuestions>
      },
      {
        path: "/dashboard/total-questions",
        element: <TotalQuestions></TotalQuestions>
      },
      {
        path: "/dashboard/questions-with-answers",
        element: <QuestionsWithAnswer></QuestionsWithAnswer>
      },
      {
        path: "/dashboard/questions-without-answers",
        element: <QuestionsWithoutAnswer></QuestionsWithoutAnswer>
      },
      {
        path: "/dashboard/orders",
        element: <Orders></Orders>
      },

      // Admin routes 
      {
        path: "/dashboard/admin-home",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: "/dashboard/all-user",
        element: <AdminRoute><AdminAllUser></AdminAllUser></AdminRoute>
      },
      {
        path: "/dashboard/add-products",
        element: <AdminRoute><AdminAddProduct></AdminAddProduct></AdminRoute>
      },
      {
        path: "/dashboard/manage-products",
        element: <AdminRoute><AdminManageProduct></AdminManageProduct></AdminRoute>
      },
      {
        path: "/dashboard/update-products/:id",
        element: <AdminRoute><AdminUpdateProducts></AdminUpdateProducts></AdminRoute>,
        loader: ({params}) => fetch(`https://noorify-server.vercel.app/products/${params.id}`)
      },
      {
        path: "/dashboard/manage-questions",
        element: <AdminRoute><AdminQuestionsManagement></AdminQuestionsManagement></AdminRoute>,
      },
      {
        path: "/dashboard/total-manage-questions",
        element: <AdminRoute><AdminTotalQuestions></AdminTotalQuestions></AdminRoute>,
      },
      {
        path: "/dashboard/manage-questions-with-answers",
        element: <AdminRoute><AdminQuestionsWithAnswers></AdminQuestionsWithAnswers></AdminRoute>,
      },
      {
        path: "/dashboard/manage-questions-without-answers",
        element: <AdminRoute><AdminQuestionsWithoutAnswers></AdminQuestionsWithoutAnswers></AdminRoute>,
      },
      {
        path: "/dashboard/manage-videos",
        element: <AdminRoute><ManageVideos></ManageVideos></AdminRoute>,
      },
      {
        path: "/dashboard/add-videos",
        element: <AdminRoute><AddVideos></AddVideos></AdminRoute>,
      },
      {
        path: "/dashboard/all-videos",
        element: <AdminRoute><AllVideos></AllVideos></AdminRoute>,
      },
      {
        path: "/dashboard/manage-orders",
        element: <AdminRoute><AdminOrderManage></AdminOrderManage></AdminRoute>,
      },
      {
        path: "/dashboard/all-orders",
        element: <AdminRoute><AdminAllOrders></AdminAllOrders></AdminRoute>,
      },
      {
        path: "/dashboard/confirmed-orders",
        element: <AdminRoute><AdminConfirmedOrders></AdminConfirmedOrders></AdminRoute>,
      },
      {
        path: "/dashboard/processing-orders",
        element: <AdminRoute><AdminProcessingOrders></AdminProcessingOrders></AdminRoute>,
      },
      {
        path: "/dashboard/delivered-orders",
        element: <AdminRoute><AdminDeliveredOrders></AdminDeliveredOrders></AdminRoute>,
      },
    ]
  }
]);

export default router;