import{ useState } from 'react';
import { BotMessageSquare,Linkedin, Instagram, Github, } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 md:py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h3 className="text-red-500 text-lg md:text-xl font-bold mb-4">Holymix</h3>
      <p className="text-sm">Your ultimate destination for anime streaming. Watch your favorite shows anytime, anywhere.</p>
    </div>
    <div>
      <h4 className="font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="/" className="hover:text-white">Home</a></li>
        <li><a href="/genres" className="hover:text-white">Browse</a></li>

      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4">Help & Support</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="/faq" className="hover:text-white">FAQ</a></li>
        <li><a href="#" className="hover:text-white">Contact Us</a></li>
        <li><a href="/about" className="hover:text-white">About Us</a></li>
        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
      </ul>
    </div>
    <div>
      <h4 className="font-semibold mb-4">Connect With Us</h4>
      <div className="flex space-x-4">
        <a href="https://github.com/debasish26" className="hover:text-white"><Github size={20} /></a>
        <a href="https://www.instagram.com/de_vasish" className="hover:text-white"><Instagram size={20} /></a>
        <a href="www.linkedin.com/in/debashish-mahanta-720184320" className="hover:text-white"><Linkedin size={20} /></a>

        <a href="https://discord.gg/Vucu4TKMsE" className="hover:text-white"><BotMessageSquare size={20} /></a>
      </div>
      <div className="mt-4">
        <p className="text-sm">Join our community</p>
        <div className="mt-2 flex flex-col sm:flex-row">

          <button className="mt-2 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg  hover:bg-red-700 w-full sm:w-auto">
            <a href="https://discord.gg/Vucu4TKMsE">Subscribe</a>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
    <p>&copy; {new Date().getFullYear()} Holymix. All rights reserved.</p>
  </div>
</div>
</footer>
  )
}

export default Footer
