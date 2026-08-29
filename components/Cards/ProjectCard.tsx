'use client';

import {
    ExternalLink,
    Eye,
    X,
    ChevronLeft,
    ChevronRight,
    AppWindowMac,
} from 'lucide-react';
import { useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ThemedCard } from './BaseCard';
import Image from 'next/image';

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
    icon?: string | ReactNode;
    screenshots?: string[];
    discontinued?: boolean;
}

export default function ProjectCard({
    title,
    description,
    url,
    icon,
    screenshots,
    discontinued,
}: ProjectCardProps) {
    const [imgError, setImgError] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    const hasPreview = Boolean(screenshots && screenshots.length > 0);

    const openPreview = () => {
        setPreviewIndex(0);
        setIsPreviewOpen(true);
    };

    const showPrev = () =>
        setPreviewIndex(
            (i) =>
                (i - 1 + (screenshots?.length ?? 1)) %
                (screenshots?.length ?? 1),
        );
    const showNext = () =>
        setPreviewIndex((i) => (i + 1) % (screenshots?.length ?? 1));

    return (
        <ThemedCard className="flex flex-col h-full">
            <div className="flex gap-4 min-w-0">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {icon && typeof icon !== 'string' ? (
                        icon
                    ) : typeof icon === 'string' && !imgError ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={icon}
                            alt={`${title} icon`}
                            className="w-8 h-8 object-contain shimmer"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <AppWindowMac
                            size={26}
                            strokeWidth={1.5}
                            style={{ color: 'var(--accent-text)' }}
                        />
                    )}
                </div>

                <div className="flex flex-col min-w-0 justify-center gap-1">
                    <h3
                        className="font-semibold text-lg truncate"
                        style={{ color: 'var(--accent-text)' }}
                    >
                        {title}
                    </h3>

                    {discontinued && (
                        <span
                            className="text-xs px-2 py-0.5 rounded-md self-start"
                            style={{
                                backgroundColor: 'rgba(115,115,115,0.15)',
                                color: 'rgb(163,163,163)',
                            }}
                        >
                            Discontinued
                        </span>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-3 flex-1">{description}</p>

            <div className="mt-auto pt-4 flex items-center gap-2">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
                    title="Visit website"
                >
                    <ExternalLink size={18} />
                </a>

                {hasPreview && (
                    <button
                        type="button"
                        onClick={openPreview}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
                        title="Preview website"
                    >
                        <Eye size={18} />
                    </button>
                )}
            </div>

            {hasPreview &&
                isPreviewOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        <div
                            className="relative w-full max-w-4xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setIsPreviewOpen(false)}
                                className="absolute -top-10 right-0 text-white/80 hover:text-white transition cursor-pointer"
                                title="Close preview"
                            >
                                <X size={28} />
                            </button>

                            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#111116]">
                                <Image
                                    src={screenshots![previewIndex]}
                                    alt={`${title} preview ${previewIndex + 1}`}
                                    width={1600}
                                    height={900}
                                    className="w-full h-auto object-contain"
                                />

                                {screenshots!.length > 1 && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={showPrev}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition cursor-pointer"
                                            title="Previous screenshot"
                                        >
                                            <ChevronLeft size={22} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={showNext}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition cursor-pointer"
                                            title="Next screenshot"
                                        >
                                            <ChevronRight size={22} />
                                        </button>
                                    </>
                                )}
                            </div>

                            {screenshots!.length > 1 && (
                                <div className="mt-3 flex items-center justify-center gap-2">
                                    {screenshots!.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setPreviewIndex(i)}
                                            className="w-2 h-2 rounded-full transition cursor-pointer"
                                            style={{
                                                backgroundColor:
                                                    i === previewIndex
                                                        ? 'var(--accent-text)'
                                                        : 'rgba(255,255,255,0.3)',
                                            }}
                                            title={`Screenshot ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body,
                )}
        </ThemedCard>
    );
}
