'use client';

import { useState, useEffect } from 'react';
import ContributionForm from '@/components/ContributionForm';
import { getUserDetails, updateUserDetails } from '@/utils/githubApi';
import ContributionHeatmap from '@/components/ContributionHeatmap';

type ContributionData = {
  [date: string]: number;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'github-heatmap': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          username: string;
          width: string;
          scale: string;
        },
        HTMLElement
      >;
    }
  }
}

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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${process.env.NEXT_PUBLIC_APP_URL}/github-widget`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="my-32 flex flex-col items-center gap-12">
      <h2 className="text-2xl font-bold text-center">Track your coding progress</h2>
      <ContributionForm onFetch={handleFetch} isLoading={isLoading} />
      {isLoading && <p>Loading...</p>}
      <section id="heatmap" className="w-3/5">
        <ContributionHeatmap contributions={contributions} />
      </section>
      <github-heatmap
        username="param302"
        width="800"
        scale="1"
      ></github-heatmap>
        <iframe 
          src={`${process.env.NEXT_PUBLIC_APP_URL}/embed/param302`} 
          className="w-3/5" 
        />
      {!isLoading && Object.keys(contributions).length > 0 && (
        <>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Data
          </button>
        </>
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
