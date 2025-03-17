import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="text-white py-10 rounded-lg flex flex-col items-center text-center"
      style={{ background: "linear-gradient(to top, #B91C1C, white)" }}
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-black text-center">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-black to-[#773aca] bg-clip-text text-transparent">Dream Scholar Hub</h2>
          <p className="text-sm mt-2">
            Helping students find the best scholarships worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-black to-[#773aca] bg-clip-text text-transparent">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to='/' className="hover:underline cursor-pointer">Home</Link></li>
            <li><Link to='scholarships' className="hover:underline cursor-pointer">All Scholarships</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 mt-6 pt-4 w-full text-black">
        &copy; {new Date().getFullYear()} Scholarship Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
