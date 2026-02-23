'use client';

import { useEffect, useState } from 'react';
import { FaStar, FaBook, FaUser, FaCodeBranch } from 'react-icons/fa';
import { ThemedCard } from './BaseCard';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: any;
}

interface GitHubData {
  stats: GitHubStats | null;
  events: GitHubEvent[];
}

interface GitHubCardProps {
  username: string;
}

export default function GitHubCard({ username }: GitHubCardProps) {
  const [data, setData] = useState<GitHubData>({
    stats: null,
    events: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        // Stats
        const statsRes = await fetch(
          `https://api.github.com/users/${username}`,
        );
        const statsJson: GitHubStats = await statsRes.json();

        // Events
        const eventsRes = await fetch(
          `https://api.github.com/users/${username}/events/public`,
        );
        const eventsJson: GitHubEvent[] = await eventsRes.json();

        setData({
          stats: statsJson,
          events: eventsJson.slice(0, 5), // show 5 recent events
        });
      } catch (err) {
        console.error('Failed to fetch GitHub data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHub();
  }, [username]);

  if (loading || !data.stats) {
    return (
      <div
        className="p-5 rounded-2xl border bg-[#111116]"
        style={{ borderColor: 'var(--accent-border)' } as React.CSSProperties}
      >
        <p className="text-sm text-gray-400">GitHub Stats & Activity</p>
        <p className="mt-2 text-gray-500 italic">Loading...</p>
      </div>
    );
  }

  return (
    <ThemedCard>
      {/* Header */}
      <h3 className="text-sm text-gray-400 uppercase font-medium mb-4">
        GitHub Stats & Activity
      </h3>

      {/* Stats */}
      <div className="flex flex-wrap gap-6 mb-4">
        <div className="flex items-center gap-2">
          <FaBook className="text-gray-400" />{' '}
          <span>{data.stats.public_repos} Repos</span>
        </div>
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-400" />{' '}
          <span>{data.stats.followers} Followers</span>
        </div>
        <div className="flex items-center gap-2">
          <FaStar className="text-gray-400" />{' '}
          <span>{data.stats.following} Following</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {data.events.map((event) => (
          <div key={event.id} className="flex items-start gap-2">
            <FaCodeBranch className="text-gray-400 mt-1" />
            <div className="text-sm">
              <span className="font-semibold">
                {event.type.replace('Event', '')}
              </span>{' '}
              in{' '}
              <span style={{ color: 'var(--accent-text)' }}>
                {event.repo.name}
              </span>
              <div className="text-gray-400 text-xs">
                {new Date(event.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ThemedCard>
  );
}
