import EmbedHeatmap from './EmbedHeatmap'

// Server Component
// gap is being passed in as a query parameter
export default function Page({ 
  params,
  searchParams
}: { 
  params: { username: string },
  searchParams?: { gap?: number, borderRadius?: number, darkMode?: boolean, colorScheme?: string, reverse?: boolean, showTotalContributions?: boolean, showProfileData?: boolean, showTooltip?: boolean, showWeekdays?: boolean, showMonths?: boolean, shareableSnapshot?: boolean }
}) {
  return <EmbedHeatmap username={params.username} gap={searchParams?.gap} borderRadius={searchParams?.borderRadius} darkMode={searchParams?.darkMode} colorScheme={searchParams?.colorScheme} reverse={searchParams?.reverse} showTotalContributions={searchParams?.showTotalContributions} showProfileData={searchParams?.showProfileData} showTooltip={searchParams?.showTooltip} showWeekdays={searchParams?.showWeekdays} showMonths={searchParams?.showMonths} shareableSnapshot={searchParams?.shareableSnapshot} />;
} 