import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900  text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-300 mb-4">Developed By : Aayush Chauhan</p>
            <p className="text-gray-300 mb-4">
              Connect with us on social media:
            </p>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 md:col-span-1">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 md:col-span-1">
            <h3 className="text-xl font-bold">Our Services</h3>
            <ul className="text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-300 transition duration-300 ease-in-out"
                >
                  Customer Support
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col space-y-4 md:col-span-1">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="text-gray-300">
              <li>
                <i className="fas fa-map-marker-alt"></i> Ambika Green Avenue
              </li>
              <li>
                <i className="fas fa-city"></i> Chandigarh, India
              </li>
              <li>
                <i className="fas fa-phone-alt"></i> Phone: 7060457474
              </li>
              <li>
                <i className="fas fa-envelope"></i> Email:
                thakurnishkarshchauhan1916@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
