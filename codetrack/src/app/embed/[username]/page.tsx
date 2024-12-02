import EmbedHeatmap from './EmbedHeatmap'

// Server Component
export default function Page({ params }: { params: { username: string } }) {
  return <EmbedHeatmap username={params.username} />;
} 