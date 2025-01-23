import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login-SignUp/Login";
import SignUp from "../pages/Login-SignUp/SignUp";
import UserDashboard from "../pages/Dashboard/UserDashboard";



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
      element: <UserDashboard></UserDashboard>
    }
  ]);

export default router;  