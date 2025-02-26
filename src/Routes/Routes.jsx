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



const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: 'scholarships',
          element: <AllScholarships></AllScholarships>
        },
        {
          path: 'scholarships/details/:id',
          element: <Details></Details>,
          loader: ({params}) => fetch(`http://localhost:5000/scholar/${params.id}`)
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
    },

    // admin and moderator routes
    {
      path: '/adminDashboard',
      element: <AdminDashboard></AdminDashboard>,
      children: [
        {
          path:'myProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path:'addScholarships',
          element: <AddScholar></AddScholar>
        },
        {
          path:'users',
          element: <AllUsers></AllUsers>
        },
      ]
    }
  ]);

export default router;  