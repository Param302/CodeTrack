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
      <body className="bg-transparent m-0 p-0 min-h-screen">
        <main className="w-full h-full p-2">
          {children}
        </main>
      </body>
    </html>
  );
} 