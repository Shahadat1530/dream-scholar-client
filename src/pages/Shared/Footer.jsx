import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 rounded-lg">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold">Dream Scholar Hub</h2>
          <p className="text-sm mt-2">
            Helping students find the best scholarships worldwide.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li className="hover:underline">Home</li>
            <li className="hover:underline">All Scholarships</li>
            <li className="hover:underline">Dashboard</li>
            <li className="hover:underline">Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-400">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 mt-6 pt-4">
        &copy; {new Date().getFullYear()} Scholarship Finder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
