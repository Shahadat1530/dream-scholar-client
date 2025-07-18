import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login-SignUp/Login";
import SignUp from "../pages/Login-SignUp/SignUp";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import AllUsers from "../pages/Dashboard/AdminDashboard/AllUsers";
import AddScholar from "../pages/Dashboard/AdminDashboard/AddScholar";
import AllScholarships from "../pages/Home/AllScholarships";
import Details from "../components/Details";
import ErrorPage from "../components/ErrorPage";
import ApplicationForm from "../components/ApplicationForm";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import MyApplications from "../pages/Dashboard/UserDashboard/MyApplications";
import MyReviews from "../pages/Dashboard/UserDashboard/MyReviews";
import ManageScholarships from "../pages/Dashboard/AdminDashboard/ManageScholarships";
import ManageReviews from "../pages/Dashboard/AdminDashboard/ManageReviews";
import PaymentPage from "../pages/payment/PaymentPage";
import PaymentHistory from "../pages/Dashboard/AdminDashboard/PaymentHistory";
import EditApplicationForm from "../components/EditApplicationForm";
import ManageApplications from "../pages/Dashboard/AdminDashboard/ManageApplications";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'scholarships',
        element: <AllScholarships></AllScholarships>
      },
      {
        path: 'history',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'scholarships/details/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>,
        loader: ({ params }) => fetch(`https://dream-scholar-hub-server.vercel.app/scholar/${params.id}`)
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><PaymentPage /></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/scholar/${params.id}`)
      },
      {
        path: '/applicationForm/:id',
        element: <PrivateRoute><ApplicationForm></ApplicationForm></PrivateRoute>,
        loader: ({ params }) => fetch(`https://dream-scholar-hub-server.vercel.app/scholar/${params.id}`)
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <SignUp></SignUp>
      }
    ]
  },

  // users routes
  {
    path: '/userDashboard',
    element: <PrivateRoute><UserDashboard></UserDashboard></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: 'myApplication',
        element: <MyApplications></MyApplications>
      },
      {
        path: 'editApplication/:id',
        element: <EditApplicationForm />,
      },
      {
        path: 'myReviews',
        element: <MyReviews></MyReviews>
      }
    ]
  },

  // admin and moderator routes
  {
    path: '/adminDashboard',
    element: <PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>,
    children: [
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'addScholarships',
        element: <AddScholar></AddScholar>
      },
      {
        path: 'manageScholarships',
        element: <ManageScholarships></ManageScholarships>
      },
      {
        path: 'manageApplications',
        element: <ManageApplications></ManageApplications>
      },
      {
        path: 'manageReviews',
        element: <ManageReviews></ManageReviews>
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },
    ]
  },
  {
    path: '/*',
    element: <ErrorPage></ErrorPage>
  }
]);

export default router;  