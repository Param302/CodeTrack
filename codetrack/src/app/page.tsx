'use client';

import { useState } from 'react';
import ContributionForm from '../components/ContributionForm';
import { fetchContributions } from '../utils/githubApi';

type ContributionData = {
  contributionDays: {
    date: string;
    contributionCount: number;
  }[];
}[];

export default function Home() {

  const [contributions, setContributions] = useState<ContributionData>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async (username: string) => {
    setIsLoading(true);
    const result = await fetchContributions(username);
    setContributions(result);
    setIsLoading(false);
  };

  return (
    <main className="my-32 flex flex-col items-center gap-12">
      <h2 className="text-2xl font-bold text-center">Track your coding progress</h2>
      <ContributionForm onFetch={handleFetch} isLoading={isLoading} />
      {isLoading && <p>Loading...</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Contributions</th>
            </tr>
          </thead>
          <tbody>
            {contributions.flatMap(week => 
              week.contributionDays.filter(day => day.contributionCount > 0).map(day => (
                <tr key={day.date}>
                  <td className="border px-4 py-2">{new Date(day.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{day.contributionCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
