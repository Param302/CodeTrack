'use client';

import { useState } from 'react';
import { getUserDetails, updateUserDetails } from '@/utils/githubApi';
import Hero from '@/components/Hero';
import Dashboard from '@/components/Dashboard';

type ContributionData = {
  [date: string]: number;
};

export default function Home() {
  const [contributions, setContributions] = useState<ContributionData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const handleFetch = async (username: string) => {
    setIsLoading(true);
    const result = await getUserDetails(username);
    if (result.contributions) {
      setContributions(result.contributions);
      setUsername(username);
      setUserDetails(result.userDetails);
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
    <>
      {!username ? (
        <Hero onFetch={handleFetch} isLoading={isLoading} />
      ) : (
        <Dashboard
          username={username}
          userDetails={userDetails}
          contributions={contributions}
          isLoading={isLoading}
          onFetch={handleFetch}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}