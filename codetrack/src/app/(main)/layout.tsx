import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <body className="antialiased bg-background-light dark:bg-background-dark min-h-screen">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}