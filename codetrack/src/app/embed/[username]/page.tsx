import EmbedHeatmap from './EmbedHeatmap'


export default async function Page({
    params: rawParams,
    searchParams: rawSearchParams
}: {
    params: { username: string },
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const params = await Promise.resolve(rawParams);
    const searchParams = await Promise.resolve(rawSearchParams);
    
    return <EmbedHeatmap
        username={params.username}
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
        shareableSnapshot={searchParams?.shareableSnapshot === 'true'} />;
} 
