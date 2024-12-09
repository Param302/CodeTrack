import EmbedHeatmap from './EmbedHeatmap';

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <EmbedHeatmap
      username={resolvedParams.username}
      gap={resolvedSearchParams?.gap ? Number(resolvedSearchParams.gap) : undefined}
      borderRadius={resolvedSearchParams?.borderRadius ? Number(resolvedSearchParams.borderRadius) : undefined}
      theme={resolvedSearchParams?.theme?.toString()}
      showTotalContributions={resolvedSearchParams?.showTotalContributions === 'true'}
      showProfileData={resolvedSearchParams?.showProfileData === 'true'}
      showTooltip={resolvedSearchParams?.showTooltip === 'true'}
      showWeekdays={resolvedSearchParams?.showWeekdays === 'true'}
      showMonths={resolvedSearchParams?.showMonths === 'true'}
      shareableSnapshot={resolvedSearchParams?.shareableSnapshot === 'true'}
    />
  );
} 
