import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login-SignUp/Login";
import SignUp from "../pages/Login-SignUp/SignUp";



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
  ]);

export default router;  