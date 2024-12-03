import { useState } from 'react';

interface Props {
  onFetch: (username: string) => void;
  isLoading: boolean;
}

export default function ContributionForm({ onFetch, isLoading }: Props) {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFetch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto px-4 py-8">
      <div className={`
        flex flex-col sm:flex-row gap-4 p-1
        bg-gradient-to-r from-gray-800 to-gray-900
        rounded-xl transition-all duration-300 max-w-md mx-auto
        ${isFocused ? 'shadow-lg shadow-blue-500/20' : 'shadow-md shadow-gray-900/5'}
      `}>
        <div className="flex-1 flex items-center gap-3 bg-gray-900/50 rounded-lg px-4 py-3">
          <svg 
            className="w-5 h-5 text-gray-400 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter GitHub username"
            className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`
            px-6 py-3 rounded-lg font-medium text-white whitespace-nowrap
            transition-all duration-300 transform
            bg-gradient-to-r from-blue-500 to-blue-600
            border border-blue-400/20
            ${isLoading 
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95'
            }
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
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          )}
        </button>
      </div>
    </form>
  );
} 