import ContributionForm from './ContributionForm';

interface HeroProps {
  onFetch: (username: string) => Promise<void>;
  isLoading: boolean;
}

export default function Hero({ onFetch, isLoading }: HeroProps) {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Gradient Background - Light and Dark mode compatible */}
      <div className="absolute inset-0">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-light via-[#EDF5FF] to-secondary-light/30 dark:from-background-dark dark:via-background-dark dark:to-secondary-dark/20" />

        {/* Accent gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-transparent dark:from-primary/10 dark:via-transparent dark:to-transparent" />

        {/* Subtle radial gradient for center focus */}
        <div className="absolute inset-0 bg-radial-light dark:bg-radial-dark opacity-40" />
      </div>

      {/* Content */}
      <div className="relative max-w-3xl w-full mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        {/* Heading Section */}
        <div className="space-y-4 text-center mb-12 -mt-32">
          <h1 className="text-4xl sm:text-5xl font-bold text-content-light dark:text-content-dark">
            Visualize and Showcase Your <span className="text-primary animate-slideIn mt-2">
              Coding Journey
            </span>
          </h1>

          <p className="text-lg text-subtle-light dark:text-subtle-dark animate-slideUp">
            <code className="text-primary">&lt;embed/&gt;</code> your GitHub contribution graph with one line of code.
          </p>
        </div>

        {/* Form Section - Centered */}
        <div className="animate-slideUp">
          <ContributionForm onFetch={onFetch} isLoading={isLoading} />
        </div>

        {/* New Section */}
        <div className="mt-12 mx-auto max-w-md flex items-center gap-3 px-6 py-4 bg-blue-500/20 border border-blue-500/20 rounded-lg animate-fadeIn shadow-[0_35px_20px_-25px_rgba(59,130,246,0.1)] transition-shadow duration-300">
          <svg
            className="w-5 h-5 flex-shrink-0 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <p className="text-blue-950 dark:text-blue-200 font-medium">
            Enter your GitHub username to see graph
          </p>
        </div>
      </div>
    </main>
  );
}