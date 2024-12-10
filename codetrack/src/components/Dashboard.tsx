import ContributionForm from "@/components/ContributionForm";
import ContributionHeatmap from "@/components/ContributionHeatmap";
import EmbedSection from "@/components/EmbedSection";
import UserProfile from "@/components/UserProfile";
import { useState } from "react";
import { UserDetails } from "@/utils/githubApi";
import HeatmapOptions from "./HeatmapOptions";

type DashboardProps = {
  username: string;
  userDetails: UserDetails | null;
  contributions: { [date: string]: number };
  isLoading: boolean;
  onFetch: (username: string) => Promise<void>;
  onUpdate: () => Promise<void>;
};

export default function Dashboard({
  username,
  userDetails,
  contributions,
  isLoading,
  onFetch,
  onUpdate,
}: DashboardProps) {
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);

  return (
    <main className="min-h-screen min-w-screen flex flex-col items-center justify-center px-32">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">
            Fetching your contributions...
          </p>
        </div>
      ) : (
        <>
          {userDetails && (
            <section className="w-full h-fit rounded-xl p-8 grid grid-cols-1 lg:grid-cols-3 auto-rows-auto gap-8 bg-gray-800/50 shadow-lg">
              <div className="lg:col-span-1">
                <UserProfile user={userDetails} />
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-lg p-6 bg-gray-800/50">
                  {/* <h3 className="text-xl font-semibold mb-4">
                    Contribution Activity
                  </h3> */}
                  <ContributionHeatmap
                    contributions={contributions}
                  />
                </div>
              </div>
              <div className="lg:col-span-1 flex flex-col">
                <EmbedSection username={username} />
              </div>
              <div className="lg:col-span-2 lg:row-span-2">
                <HeatmapOptions
                  scale={1}
                  gap={2}
                  roundness={3}
                  theme="dark"
                  themePreset="github"
                  showProfile={1}
                  showTotalContributions={1}
                  showTooltip={1}
                  showWeekdays={1}
                  showMonths={1}
                />
              </div>
              <div className="h-fit flex flex-col gap-8">
                  <h2 className="text-2xl font-semibold text-center">
                    Have another profile to track?
                  </h2>
                  <div className="flex-end">
                    <ContributionForm
                      onFetch={onFetch}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
            </section>
            
          )}
        </>
      )}
    </main>
  );
}
