import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location

  const handleSearch = (e: React.FormEvent) => {
    setMobileMenuOpen(false);
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Sync the search input with the current query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    setSearchQuery(query);
  }, [location.search]); // Update whenever the search query in the URL changes

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-red-500 text-xl md:text-2xl font-bold">AnimeStream</h1>
            <div className="hidden md:flex ml-10 items-baseline space-x-4">
              <a href="/" className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Browse</a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">My List</a>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative hidden md:flex">
              <input
                type="text"
                placeholder="Search anime..."
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                className="bg-gray-700 text-white px-4 py-1 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 w-48 lg:w-64"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </form>
            <button className="ml-4 text-gray-400 hover:text-white">
              <Bell size={20} />
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
            <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Browse</a>
            <a href="#" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My List</a>
          </div>
          <div className="px-4 py-3 border-t border-gray-700">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
