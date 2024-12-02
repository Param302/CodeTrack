'use client'

export default function Home() {
  return (
    <body className="bg-gray-900">
      <header className="fixed top-0 flex justify-center items-center w-screen p-4 bg-gray-800">
        <h1 className="text-4xl font-bold">CodeTrack</h1>
      </header>
      <main className="flex justify-center items-center h-screen p-4">
        <h2 className="text-2xl font-bold text-center">Track your coding progress</h2>
      </main>
      <footer className="fixed bottom-0 flex justify-center items-center w-screen p-4 bg-gray-800">
        <p className="text-sm text-center">
          Made with 💛 by <a href="https://github.com/param302">Parampreet Singh</a>
        </p>
      </footer>
    </body>
  )
}
