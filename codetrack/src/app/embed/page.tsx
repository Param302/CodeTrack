'use client';

import ContributionHeatmap from '@/components/ContributionHeatmap';
import { getUserDetails } from '@/utils/githubApi';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';

export default function EmbedPage() {
  const searchParams = useSearchParams();
  const [contributions, setContributions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserDetails(searchParams.get('username') || '');
      if (data?.contributions) {
        setContributions(data.contributions);
      }
      setLoading(false);
    };
    fetchData();
  }, [searchParams.get('username')]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }

  return (
    <ContributionHeatmap
      contributions={contributions}
      gap={Number(searchParams.get('gap'))}
      borderRadius={Number(searchParams.get('borderRadius'))}
      darkMode={searchParams.get('darkMode') === 'true'}
      theme={searchParams.get('theme') || 'github'}
      reverse={searchParams.get('reverse') === 'true'}
      showTotalContributions={searchParams.get('showTotalContributions') === 'true'}
      showProfileData={searchParams.get('showProfileData') === 'true'}
      showTooltip={searchParams.get('showTooltip') === 'true'}
      showWeekdays={searchParams.get('showWeekdays') === 'true'}
      showMonths={searchParams.get('showMonths') === 'true'}
      shareableSnapshot={searchParams.get('shareableSnapshot') === 'true'}
    />
  );
} 