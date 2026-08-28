'use client';

import TabsSection from '@/components/Tabs/TabsSection';
import ProfileCard from '@/components/Cards/ProfileCard';
import ProjectsSection from '@/components/ProjectsSection';
import FeaturedSongsCard from '@/components/Cards/FeaturedSongsCard';
import GitHubCard from '@/components/Cards/GitHubCard';
import DiscordStatus from '@/components/DiscordStatus';
import TechStack from '@/components/Cards/TechStack';
import GitHubContributions from '@/components/Common/GitHubContributions';

import { SOCIALS } from '@/data/socials';
import { GAMES } from '@/data/games';
import { DOMAINS } from '@/data/domains';
import { PC_SPECS } from '@/data/pcSpecs';
import { PERSONAL_PROJECTS, WORK_PROJECTS } from '@/data/projects';
import { PROFILE } from '@/data/profile';
import { TECH_STACK } from '@/data/techstack';
import { FEATURED_SONG_URLS } from '@/data/featuredSongs';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0b0b0f] text-white p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT SIDE */}
                <div className="space-y-6">
                    <ProfileCard />
                    <DiscordStatus />
                    <GitHubCard username={PROFILE.githubUsername} />
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                    {/* PROJECTS */}
                    <ProjectsSection
                        personalProjects={PERSONAL_PROJECTS}
                        workProjects={WORK_PROJECTS}
                    />

                    <div
                        className="rounded-2xl border p-6 bg-[#111116]"
                        style={
                            {
                                borderColor: 'var(--accent-border)',
                                '--hover-color': 'var(--accent-start)',
                            } as React.CSSProperties
                        }
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor =
                                'var(--accent-end)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor =
                                'var(--accent-border)')
                        }
                    >
                        <h2 className="mb-4 text-xl font-semibold">
                            Featured Songs
                        </h2>

                        <FeaturedSongsCard songUrls={FEATURED_SONG_URLS} />
                    </div>

                    <TabsSection
                        socials={SOCIALS}
                        games={GAMES}
                        domains={DOMAINS}
                        pcSpecs={PC_SPECS}
                    />

                    <div
                        className="rounded-2xl border p-6 bg-[#111116]"
                        style={
                            {
                                borderColor: 'var(--accent-border)',
                                '--hover-color': 'var(--accent-start)',
                            } as React.CSSProperties
                        }
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.borderColor =
                                'var(--accent-end)')
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.borderColor =
                                'var(--accent-border)')
                        }
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            Tech Stack
                        </h2>

                        <TechStack techs={TECH_STACK.map((tech) => tech.key)} />
                    </div>

                    <GitHubContributions username={PROFILE.githubUsername} />
                </div>
            </div>
        </main>
    );
}
