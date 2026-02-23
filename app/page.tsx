'use client';

import TabsSection from '../components/Tabs/TabsSection';
import ProfileCard from '@/components/Cards/ProfileCard';
import ProjectCard from '../components/Cards/ProjectCard';
import GitHubCard from '@/components/Cards/GitHubCard';
import DiscordStatus from '../components/DiscordStatus';
import GitHubContributions from '../components/Common/GitHubContributions';

import { socials } from '../data/socials';
import { games } from '../data/games';
import { domains } from '../data/domains';
import { pcSpecs } from '../data/pcSpecs';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0b0b0f] text-white p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT SIDE */}
                <div className="space-y-6">
                    <ProfileCard />
                    <DiscordStatus />
                    <GitHubCard username={profile.githubUsername} />
                </div>

                {/* RIGHT SIDE */}
                <div className="lg:col-span-2 space-y-8">
                    {/* PROJECTS */}
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
                        <h2 className="text-xl font-semibold mb-4">Projects</h2>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.title}
                                    title={project.title}
                                    description={project.description}
                                    url={project.url}
                                    icon={project.icon}
                                />
                            ))}
                        </div>
                    </div>

                    <TabsSection
                        socials={socials}
                        games={games}
                        domains={domains}
                        pcSpecs={pcSpecs}
                    />

                    <GitHubContributions username={profile.githubUsername} />
                </div>
            </div>
        </main>
    );
}
