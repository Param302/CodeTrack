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
    <html lang="en" className="dark h-full w-full">
      <body className="m-0 p-0 h-full w-full">{children}</body>
    </html>
  );
} 