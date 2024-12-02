'use client';

import { useEffect, useState } from 'react';
import ContributionHeatmap from '@/components/ContributionHeatmap';
import { getUserDetails } from '@/utils/githubApi';


export default function EmbedHeatmap({ username, gap, borderRadius, darkMode, theme, reverse, showTotalContributions, showProfileData, showTooltip, showWeekdays, showMonths, shareableSnapshot }: { username: string, gap?: number, borderRadius?: number, darkMode?: boolean, theme?: string, reverse?: boolean, showTotalContributions?: boolean, showProfileData?: boolean, showTooltip?: boolean, showWeekdays?: boolean, showMonths?: boolean, shareableSnapshot?: boolean }) {
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
  console.log("GAP", gap);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }
  console.log("Theme received is ", theme);

  return (
    <div className="h-full flex items-center justify-center bg-transparent">
      <div className="h-full" style={{ 
        height: '100%', 
        width: 'calc(100vh * (53/7) * 0.7)',
        maxWidth: '100%'
      }}>
        <ContributionHeatmap 
          contributions={contributions} 
          gap={gap} 
          borderRadius={borderRadius}
          darkMode={darkMode}
          theme={theme}
          reverse={reverse}
          showTotalContributions={showTotalContributions}
          showProfileData={showProfileData}
          showTooltip={showTooltip}
          showWeekdays={showWeekdays}
          showMonths={showMonths}
          shareableSnapshot={shareableSnapshot}
        />
      </div>
    </div>
  );
}