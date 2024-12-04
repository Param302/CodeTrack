import { ReactNode } from 'react';
import '@/app/globals.css';

export const metadata = {
  title: 'GitHub Contribution Heatmap',
  description: 'Embedded GitHub contribution heatmap'
};

export default function EmbedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0" style={{ 
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>{children}</body>
    </html>
  );
} 