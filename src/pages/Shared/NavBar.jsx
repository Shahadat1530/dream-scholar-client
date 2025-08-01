import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { isAdmin, isModerator, isAdminLoading } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isAdminLoading) {
    return (
      <div className="flex justify-center py-4">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const links = (
    <>
      <li>
        <NavLink
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 px-4 py-2 rounded-md outline-none ring-0 focus:bg-blue-300"
              : "px-4 py-2 rounded-md focus:outline-none"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          to="/scholarships"
          className={({ isActive }) =>
            isActive
              ? "bg-blue-300 px-4 py-2 rounded-md outline-none ring-0 focus:bg-blue-300"
              : "px-4 py-2 rounded-md focus:outline-none"
          }
        >
          All Scholarships
        </NavLink>
      </li>
      {user?.email &&
        (isAdmin || isModerator ? (
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="/adminDashboard/myProfile"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-300 px-4 py-2 rounded-md outline-none ring-0 focus:bg-blue-300"
                  : "px-4 py-2 rounded-md focus:outline-none"
              }
            >
              Admin Dashboard
            </NavLink>
          </li>
        ) : (
          <li>
            <NavLink
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              to="/userDashboard/myProfile"
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-300 px-4 py-2 rounded-md outline-none ring-0 focus:bg-blue-300"
                  : "px-4 py-2 rounded-md focus:outline-none"
              }
            >
              User Dashboard
            </NavLink>
          </li>
        ))}
    </>
  );

  return (
    <div
      className={`bg-white sticky top-0 z-50 font-semibold transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''
        }`}
    >
      <div className="navbar max-w-screen-2xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu />
          </button>
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Dream Scholar
          </NavLink>
        </div>
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1 text-text">{links}</ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          {user?.email ? (
            <>
              <img
                className="w-10 h-10 rounded-full border border-gray-300"
                src={user?.photoURL}
                alt="User Avatar"
              />
              <button
                onClick={logOut}
                className="bg-white font-semibold py-2 px-4 rounded-xl border hover:bg-blue-50"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="bg-white font-semibold py-2 px-4 rounded-xl border hover:bg-blue-50"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl border hover:bg-blue-700"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-3/5 bg-slate-50 shadow-md p-4">
          <ul className="flex flex-col items-center gap-4 text-text">{links}</ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
