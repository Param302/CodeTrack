'use client';

import { useEffect, useState } from 'react';
import ContributionHeatmap from '@/components/ContributionHeatmap';
import { getUserDetails } from '@/utils/githubApi';

export default function EmbedHeatmap({ username }: { username: string }) {
  const [contributions, setContributions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDetails(username);
      if (data?.contributions) {
        setContributions(data.contributions);
      }
      setLoading(false);
    };
    fetchData();
  }, [username]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full px-2">
      <ContributionHeatmap contributions={contributions} />
    </div>
  );
} 