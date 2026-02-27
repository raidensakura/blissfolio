'use client';

import { useEffect, useState } from 'react';
import { FaStar, FaBook, FaUser, FaCodeBranch } from 'react-icons/fa';
import { ThemedCard } from './BaseCard';

interface GitHubStats {
    public_repos?: number;
    followers?: number;
    following?: number;
}

interface GitHubEvent {
    id: string;
    type: string;
    repo?: { name: string };
    created_at?: string;
    payload?: any;
}

interface GitHubData {
    stats: GitHubStats;
    events: GitHubEvent[];
}

interface GitHubCardProps {
    username: string;
}

export default function GitHubCard({ username }: GitHubCardProps) {
    const [data, setData] = useState<GitHubData>({ stats: {}, events: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGitHub() {
            try {
                // Stats
                const statsRes = await fetch(
                    `https://api.github.com/users/${username}`,
                );
                const statsJson: GitHubStats = statsRes.ok
                    ? await statsRes.json()
                    : {};

                // Events
                const eventsRes = await fetch(
                    `https://api.github.com/users/${username}/events/public`,
                );
                const eventsJson: GitHubEvent[] = eventsRes.ok
                    ? await eventsRes.json()
                    : [];

                setData({
                    stats: statsJson || {},
                    events: Array.isArray(eventsJson)
                        ? eventsJson.slice(0, 5)
                        : [],
                });
            } catch (err) {
                console.error('Failed to fetch GitHub data', err);
                setData({ stats: {}, events: [] });
            } finally {
                setLoading(false);
            }
        }

        fetchGitHub();
    }, [username]);

    const stats = data.stats || {};
    const events = Array.isArray(data.events) ? data.events : [];

    return (
        <ThemedCard className="p-5 rounded-2xl bg-[#111116] border">
            <h3 className="text-sm text-gray-400 uppercase font-medium mb-2">
                GitHub Stats & Activity
            </h3>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-4">
                <div className="flex items-center gap-2">
                    <FaBook className="text-gray-400" />{' '}
                    <span>{stats.public_repos ?? 0} Repos</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaUser className="text-gray-400" />{' '}
                    <span>{stats.followers ?? 0} Followers</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaStar className="text-gray-400" />{' '}
                    <span>{stats.following ?? 0} Following</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
                {events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="flex items-start gap-2">
                            <FaCodeBranch className="text-gray-400 mt-1" />
                            <div className="text-sm">
                                <span className="font-semibold">
                                    {event.type?.replace('Event', '') ||
                                        'Unknown'}
                                </span>{' '}
                                in{' '}
                                <span style={{ color: 'var(--accent-text)' }}>
                                    {event.repo?.name || 'Unknown Repo'}
                                </span>
                                <div className="text-gray-400 text-xs">
                                    {event.created_at
                                        ? new Date(
                                              event.created_at,
                                          ).toLocaleString()
                                        : 'Unknown time'}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic text-sm">
                        No recent activity
                    </p>
                )}
            </div>
        </ThemedCard>
    );
}
