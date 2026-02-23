'use client';

import { ThemedCard } from '../Cards/BaseCard';

export default function GitHubContributions({
    username,
}: {
    username: string;
}) {
    return (
        <ThemedCard>
            <h2 className="text-xl font-semibold mb-4">GitHub Contributions</h2>
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
        </ThemedCard>
    );
}
