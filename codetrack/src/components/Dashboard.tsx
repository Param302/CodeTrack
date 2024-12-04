import ContributionForm from '@/components/ContributionForm';
import ContributionHeatmap from '@/components/ContributionHeatmap';
import UserProfile from '@/components/UserProfile';
import { useState } from 'react';
import { UserDetails } from '@/utils/githubApi';

type DashboardProps = {
  username: string;
  userDetails: UserDetails | null;
  contributions: { [date: string]: number };
  isLoading: boolean;
  onFetch: (username: string) => Promise<void>;
  onUpdate: () => Promise<void>;
};

export default function Dashboard({ username, userDetails, contributions, isLoading, onFetch, onUpdate }: DashboardProps) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [copiedType, setCopiedType] = useState<'script' | 'iframe' | null>(null);
  const [activeTab, setActiveTab] = useState<'script' | 'iframe'>('script');

  const handleCopy = (type: 'script' | 'iframe', code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const scriptCode = `<github-heatmap username="${username}" scale="1"></github-heatmap>\n<script src="${process.env.NEXT_PUBLIC_APP_URL}/github-widget" defer></script>`;
  const iframeCode = `<iframe src="${process.env.NEXT_PUBLIC_APP_URL}/embed/${username}" frameborder="0" width="800px" style="transform:scale(1); transform-origin:top left;border-radius:1rem"></iframe>`;

  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-8 px-32 pt-32">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Fetching your contributions...</p>
        </div>
      ) : (
        <>
          {userDetails && (
            <section className="w-full rounded-xl p-8 bg-gray-800/50 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <UserProfile user={userDetails} />
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="rounded-lg p-6 bg-gray-800/50">
                    <h3 className="text-xl font-semibold mb-4">Contribution Activity</h3>
                    <ContributionHeatmap contributions={contributions} />
                  </div>

                  <div className="rounded-lg p-6 bg-gray-800/50 border border-blue-500/20">
                    <button
                      onClick={() => setIsEmbedOpen(!isEmbedOpen)}
                      className="w-full flex items-center justify-between text-lg font-bold p-4 rounded-lg transition-colors text-white shadow-lg bg-blue-500/20 hover:bg-blue-500/30"
                    >
                      <div className="flex-1" />
                      <div className="flex-1 text-center ">Embed This Widget</div>
                      <div className="flex-1 flex justify-end">
                        <svg
                          className={`w-5 h-5 transform transition-transform ${isEmbedOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isEmbedOpen && (
                      <div className="mt-4">
                        <div className="flex p-1 space-x-1 bg-gray-800 rounded-lg">
                          <button
                            onClick={() => setActiveTab('script')}
                            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                              activeTab === 'script'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                            }`}
                          >
                            <svg 
                              className={`w-4 h-4 mr-2 ${activeTab === 'script' ? 'text-white' : 'text-gray-400'}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                            Script
                          </button>
                          <button
                            onClick={() => setActiveTab('iframe')}
                            className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                              activeTab === 'iframe'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                            }`}
                          >
                            <svg 
                              className={`w-4 h-4 mr-2 ${activeTab === 'iframe' ? 'text-white' : 'text-gray-400'}`}
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            iframe
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-yellow-500 text-black rounded-full font-medium">WIP</span>
                          </button>
                        </div>

                        <div className="mt-4">
                          <div className="relative group">
                            <pre className="bg-gray-800 border border-gray-700 p-3 rounded-md text-sm text-gray-200 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                              <code className="whitespace-pre inline-block min-w-full">
                                {activeTab === 'script' ? scriptCode : iframeCode}
                              </code>
                            </pre>
                            <button
                              onClick={() => handleCopy(activeTab, activeTab === 'script' ? scriptCode : iframeCode)}
                              className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md transition-all opacity-0 group-hover:opacity-100 hover:bg-gray-600"
                            >
                              {copiedType === activeTab ? (
                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="w-full p-8">
            <h2 className="text-xl font-semibold text-center">Have another profile to track?</h2>
            <ContributionForm onFetch={onFetch} isLoading={isLoading} />
          </section>
        </>
      )}
    </main>
  );
} 