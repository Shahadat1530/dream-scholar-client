import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-10 mt-10">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">

        {/* Branding Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Dream Scholar Hub</h2>
          <p className="text-sm mt-2">
            Helping students find the best scholarships worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to='/' className="hover:underline hover:text-blue-600">Home</Link></li>
            <li><Link to='/scholarships' className="hover:underline hover:text-blue-600">All Scholarships</Link></li>
          </ul>
        </div>

        {/* You can add another column if needed */}
        <div className="md:col-span-1 flex flex-col items-center md:items-end justify-center">
          <p className=" text-sm">Contact us at</p>
          <p className=" font-semibold">info@dreamscholar.com</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm border-t border-white/30 mt-6 pt-4">
        &copy; {new Date().getFullYear()} Dream Scholar Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
