import React from 'react';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

// import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 text-sm">

        {/* Reach Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Reach us</h3>
          <p className="flex items-center gap-2 mb-2">
            <FiPhone /> +102 3456 789
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FiMail /> nestifyforu@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FiMapPin /> 123 Dartmouth Street, Boston, MA, USA
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Contact</li>
            <li>Blogs</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>Privacy Policy</li>
            <li>Terms & Services</li>
            <li>Terms of Use</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>Techstack / Employe</li>
            <li>Downloads</li>
            <li>Forum</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 rounded-md text-black"
            />
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2">
            * Will send you weekly updates for your better home management.
          </p>
        </div>
      </div>

      <hr className="my-8 border-gray-600" />

      <div className="text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Nestify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
