'use client';

import { ExternalLink } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { ThemedCard } from './BaseCard';
import Image from 'next/image';

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
    icon?: string | ReactNode;
}

export default function ProjectCard({
    title,
    description,
    url,
    icon,
}: ProjectCardProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [imgError, setImgError] = useState(false);

    return (
        <ThemedCard className="flex flex-col h-full">
            <div className="flex gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {icon ? (
                        typeof icon === 'string' ? (
                            <Image
                                src={icon}
                                alt={`${title} icon`}
                                height={32}
                                width={32}
                                className="w-8 h-8 object-contain"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            icon
                        )
                    ) : (
                        <span
                            className="text-xl font-semibold"
                            style={{ color: 'var(--accent-text)' }}
                        >
                            {title.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>

                <div className="flex flex-col min-w-0 justify-center">
                    <h3
                        className="font-semibold text-lg truncate"
                        style={{ color: 'var(--accent-text)' }}
                    >
                        {title}
                    </h3>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-3 flex-1">{description}</p>

            <div className="mt-auto pt-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                    <ExternalLink size={18} />
                </a>
            </div>
        </ThemedCard>
    );
}
