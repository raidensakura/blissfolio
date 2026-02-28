'use client';

import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import CopyButton from '../Common/CopyButton';
import { ThemedCard } from './BaseCard';

interface DomainCardProps {
    domain: string;
}

export default function DomainCard({ domain }: DomainCardProps) {
    const [imgError, setImgError] = useState(false);

    const faviconUrl = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

    return (
        <ThemedCard>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Favicon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {!imgError ? (
                        <img // eslint-disable-line @next/next/no-img-element
                            src={faviconUrl}
                            alt={`${domain} favicon`}
                            className="w-8 h-8 object-contain"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <span
                            className="text-xl font-semibold"
                            style={{ color: 'var(--accent-text)' }}
                        >
                            {domain.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>

                {/* Domain Info */}
                <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{domain}</h3>
                    <p className="text-sm text-gray-400 truncate">
                        https://{domain}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0 self-start sm:self-center">
                    <CopyButton textToCopy={domain} />
                    <a
                        href={`https://${domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                    >
                        <ExternalLink size={18} />
                    </a>
                </div>
            </div>
        </ThemedCard>
    );
}
