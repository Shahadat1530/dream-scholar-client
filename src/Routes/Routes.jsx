import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login-SignUp/Login";
import SignUp from "../pages/Login-SignUp/SignUp";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
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
    {
      path: '/userDashboard',
      element: <UserDashboard></UserDashboard>,
      children: [
        {
          path: 'myProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'myApplication',
        },
        {
          path: 'myReviews',
        }
      ]
    }
  ]);

export default router;  