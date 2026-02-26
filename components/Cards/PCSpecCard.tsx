'use client';

import { ExternalLink } from 'lucide-react';
import { ThemedCard } from './BaseCard';
import CopyButton from '../Common/CopyButton';

interface PCSpecCardProps {
    name: string;
    value: string;
    details?: string;
    url?: string;
}

export default function PCSpecCard({
    name,
    value,
    details,
    url,
}: PCSpecCardProps) {
    return (
        <ThemedCard>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Left content */}
                <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <span
                        className="inline-block text-xs font-semibold px-2 py-1 rounded-md w-max"
                        style={{
                            backgroundColor:
                                'color-mix(in srgb, var(--accent-border) 20%, transparent)',
                            color: 'var(--accent-text)',
                        }}
                    >
                        {name}
                    </span>

                    <h3 className="font-semibold text-lg line-clamp-2 sm:line-clamp-1">
                        {value}
                    </h3>

                    {details && (
                        <p className="text-gray-400 text-sm">{details}</p>
                    )}
                </div>

                {/* Actions */}
                {url && (
                    <div className="flex gap-2 flex-shrink-0 self-start sm:self-center">
                        <CopyButton textToCopy={url} />
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                        >
                            <ExternalLink size={18} />
                        </a>
                    </div>
                )}
            </div>
        </ThemedCard>
    );
}
