import{ useState } from 'react';
import { Search, Bell, Facebook, Twitter, Instagram, Youtube, Mail, Menu, X } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 md:py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h3 className="text-red-500 text-lg md:text-xl font-bold mb-4">AnimeStream</h3>
      <p className="text-sm">Your ultimate destination for anime streaming. Watch your favorite shows anytime, anywhere.</p>
    </div>
    <div>
      <h4 className="font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">Home</a></li>
        <li><a href="#" className="hover:text-white">Browse</a></li>
        <li><a href="#" className="hover:text-white">My List</a></li>
        <li><a href="#" className="hover:text-white">New Releases</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4">Help & Support</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-white">FAQ</a></li>
        <li><a href="#" className="hover:text-white">Contact Us</a></li>
        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4">Connect With Us</h4>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-white"><Facebook size={20} /></a>
        <a href="#" className="hover:text-white"><Twitter size={20} /></a>
        <a href="#" className="hover:text-white"><Instagram size={20} /></a>
        <a href="#" className="hover:text-white"><Youtube size={20} /></a>
        <a href="#" className="hover:text-white"><Mail size={20} /></a>
      </div>
      <div className="mt-4">
        <p className="text-sm">Subscribe to our newsletter</p>
        <div className="mt-2 flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
          />
          <button className="mt-2 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg sm:rounded-l-none hover:bg-red-700 w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
    <p>&copy; {new Date().getFullYear()} AnimeStream. All rights reserved.</p>
  </div>
</div>
</footer>
  )
}

export default Footer
