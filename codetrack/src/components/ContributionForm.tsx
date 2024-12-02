import { useState } from 'react';

interface Props {
  onFetch: (username: string) => void;
  isLoading: boolean;
}

export default function ContributionForm({ onFetch, isLoading }: Props) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFetch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        className="px-4 py-2 border rounded-lg flex-1 text-black"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Fetch Contributions'}
      </button>
    </form>
  );
} 