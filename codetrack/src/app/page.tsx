'use client';

import { useState } from 'react';
import ContributionForm from '../components/ContributionForm';
import { getUserDetails, updateUserDetails } from '../utils/githubApi';

type ContributionData = {
  [date: string]: number;
};

export default function Home() {

  const [contributions, setContributions] = useState<ContributionData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const handleFetch = async (username: string) => {
    setIsLoading(true);
    const result = await getUserDetails(username);
    if (result.contributions) {
      setContributions(result.contributions);
      setUsername(username);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const result = await updateUserDetails(username);
    if (result.contributions) {
      setContributions(result.contributions);
    }
    setIsLoading(false);
  };

  return (
    <main className="my-32 flex flex-col items-center gap-12">
      <h2 className="text-2xl font-bold text-center">Track your coding progress</h2>
      <ContributionForm onFetch={handleFetch} isLoading={isLoading} />
      {isLoading && <p>Loading...</p>}
      {!isLoading && contributions && (
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update Data
        </button>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(contributions).filter(([date, contributionCount]) => contributionCount > 0).map(([date, contributionCount]) => (
              <tr key={date}>
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2">{contributionCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
