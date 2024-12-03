import EmbedHeatmap from './EmbedHeatmap';

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  
  return (
    <EmbedHeatmap
      username={resolvedParams.username}
      gap={searchParams?.gap ? Number(searchParams.gap) : undefined}
      borderRadius={searchParams?.borderRadius ? Number(searchParams.borderRadius) : undefined}
      darkMode={searchParams?.darkMode === 'true'}
      theme={searchParams?.theme?.toString()}
      reverse={searchParams?.reverse === 'true'}
      showTotalContributions={searchParams?.showTotalContributions === 'true'}
      showProfileData={searchParams?.showProfileData === 'true'}
      showTooltip={searchParams?.showTooltip === 'true'}
      showWeekdays={searchParams?.showWeekdays === 'true'}
      showMonths={searchParams?.showMonths === 'true'}
      shareableSnapshot={searchParams?.shareableSnapshot === 'true'}
    />
  );
} 
