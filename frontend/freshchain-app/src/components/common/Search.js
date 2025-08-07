import { Search as SearchIcon } from 'lucide-react';

const Search = ({ onSearch }) => (
  <div className="flex-1 relative">
   <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-emerald-600 drop-shadow-md pointer-events-none" />
   <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-emerald-100 shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all group"
    />
  </div>
);

export default Search;