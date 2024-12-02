import type { Metadata } from "next";
import "@/app/globals.css";

// const geistSans = localFont({
//   src: "/fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "../fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "CodeTrack",
  description: "Track your coding progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-900">
        <header className="fixed top-0 flex justify-center items-center w-screen p-4 bg-gray-800">
          <h1 className="text-4xl font-bold">CodeTrack</h1>
        </header>
        {children}
        <footer className="fixed bottom-0 flex justify-center items-center w-screen p-4 bg-gray-800">
          <p className="text-sm text-center">
            Made with 💛 by <a href="https://github.com/param302">Parampreet Singh</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
