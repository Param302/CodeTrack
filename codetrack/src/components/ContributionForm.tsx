import { useState } from 'react';
import { FiUser } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
  onFetch: (username: string) => void;
  isLoading: boolean;
}

export default function ContributionForm({ onFetch, isLoading }: Props) {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onFetch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4 py-8">
      <div className={`
        flex flex-col sm:flex-row gap-4 p-1 pr-2.5
        bg-gradient-to-r from-blue-50 dark:from-slate-800 to-blue-100 dark:to-gray-900 border-2 border-primary dark:border-blue-800
        rounded-lg transition-all duration-300 max-w-md mx-auto
        ${isFocused ? 'shadow-lg shadow-gray-500 dark:shadow-gray-800' : 'shadow-md shadow-gray-500/50 dark:shadow-gray-800/50'}
      `}>
        <div className="flex-1 flex items-center gap-3 rounded-lg px-3 group">
          <FiUser className="w-6 h-6 text-primary/60 flex-shrink-0 transition-colors group-focus-within:text-primary" />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter GitHub username"
            className="w-full font-medium bg-transparent text-gray-900 placeholder:text-gray-400 placeholder:dark:text-gray-600 dark:text-white placeholder-gray-400 outline-none text-md focused"
            required 
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-6 py-3 rounded-sm font-medium text-white whitespace-nowrap
            transition-all duration-300 transform
            bg-gradient-to-r from-blue-500 to-blue-600
            border border-blue-400/20
            ${isLoading 
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:from-blue-600 hover:to-blue-700 active:translate-x-2 hover:translate-x-0.5 active:translate-x-1'
            }
            ${isSubmitting ? "translate-x-2" : ""}
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Fetching...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>View Graph</span>
              <FaArrowRight className="w-4 h-4" />
            </div>
          )}
        </button>
      </div>
    </form>
  );
} 