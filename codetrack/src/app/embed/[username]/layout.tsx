import '@/app/globals.css';

export const metadata = {
  title: 'GitHub Contribution Heatmap',
  description: 'Embedded GitHub contribution heatmap'
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="m-0 p-0">{children}</body>
    </html>
  );
} 