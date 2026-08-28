'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { ThemedCard } from '../Cards/BaseCard';

export default function GitHubContributions({
    username,
}: {
    username: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const chartUrl = `https://ghchart.rshah.org/${username}`;

    return (
        <ThemedCard className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4">GitHub Contributions</h2>

            {/* Scrollable wrapper */}
            <div className="overflow-x-auto rounded-lg">
                {/* eslint-disable @next/next/no-img-element */}
                <img
                    src={chartUrl}
                    alt="GitHub Contributions"
                    onClick={() => setIsExpanded(true)}
                    className="
            sm:max-w-[700px]
            md:max-w-[900px]
            sm:w-full
            max-w-none
            max-h-64
            block
            rounded-lg
            cursor-zoom-in
          "
                    style={{
                        filter: 'invert(0.95) hue-rotate(180deg)',
                    }}
                />
            </div>

            <p className="text-xs text-gray-500 mt-2">
                Contributions to private repositories are not shown.
            </p>

            {isExpanded &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                        onClick={() => setIsExpanded(false)}
                    >
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition cursor-pointer"
                            title="Close"
                        >
                            <X size={32} />
                        </button>

                        <img
                            src={chartUrl}
                            alt="GitHub Contributions"
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-full max-h-full rounded-lg"
                            style={{
                                filter: 'invert(0.95) hue-rotate(180deg)',
                            }}
                        />
                    </div>,
                    document.body,
                )}
        </ThemedCard>
    );
}
