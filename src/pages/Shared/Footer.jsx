import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background text-text py-10 rounded-lg flex flex-col items-center text-center">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

        {/* Branding Section */}
        <div>
          <h2 className="text-xl font-bold text-primary">Dream Scholar Hub</h2>
          <p className="text-sm mt-2">
            Helping students find the best scholarships worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-primary">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to='/' className="hover:underline cursor-pointer">Home</Link></li>
            <li><Link to='/scholarships' className="hover:underline cursor-pointer">All Scholarships</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm border-t border-secondary mt-6 pt-4 w-full">
        &copy; {new Date().getFullYear()} Scholarship Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
