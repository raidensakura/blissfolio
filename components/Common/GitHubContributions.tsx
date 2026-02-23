'use client';

import { ThemedCard } from '../Cards/BaseCard';

export default function GitHubContributions({
    username,
}: {
    username: string;
}) {
    return (
        <ThemedCard className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">GitHub Contributions</h2>

            {/* Scrollable wrapper */}
            <div className="overflow-x-auto rounded-lg">
                {/* eslint-disable @next/next/no-img-element */}
                <img
                    src={`https://ghchart.rshah.org/${username}`}
                    alt="GitHub Contributions"
                    className="
            w-[600px] sm:w-full
            max-w-none
            max-h-64
            block
            rounded-lg
          "
                    style={{
                        filter: 'invert(0.95) hue-rotate(180deg)',
                    }}
                />
            </div>
        </ThemedCard>
    );
}
