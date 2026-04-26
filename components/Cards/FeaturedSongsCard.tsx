'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FeaturedSong {
    artist: string;
    coverArtUrl: string;
    title: string;
    url: string;
}

interface FeaturedSongsCardProps {
    songUrls: readonly string[];
}

export default function FeaturedSongsCard({
    songUrls,
}: FeaturedSongsCardProps) {
    const [songs, setSongs] = useState<FeaturedSong[]>(
        songUrls.map((url) => ({
            url,
            title: 'Spotify Track',
            artist: 'Open in Spotify',
            coverArtUrl: '',
        }))
    );

    useEffect(() => {
        const controller = new AbortController();
        const params = new URLSearchParams();

        songUrls.forEach((url) => params.append('url', url));

        fetch(`/api/spotify-tracks?${params.toString()}`, {
            signal: controller.signal,
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error('Failed to load Spotify metadata');
                }

                const data = (await response.json()) as {
                    tracks: FeaturedSong[];
                };
                setSongs(
                    data.tracks.map((track) => ({
                        url: track.url,
                        title: track.title || 'Spotify Track',
                        artist: track.artist || 'Open in Spotify',
                        coverArtUrl: track.coverArtUrl || '',
                    }))
                );
            })
            .catch(() => {
                setSongs(
                    songUrls.map((url) => ({
                        url,
                        title: 'Spotify Track',
                        artist: 'Open in Spotify',
                        coverArtUrl: '',
                    }))
                );
            });

        return () => controller.abort();
    }, [songUrls]);

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {songs.map((song) => (
                <a
                    key={song.url}
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-[#1db954]/40 hover:bg-white/[0.05]"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                            {song.coverArtUrl ? (
                                <Image
                                    src={song.coverArtUrl}
                                    alt={`${song.title} cover art`}
                                    width={36}
                                    height={36}
                                    className="h-9 w-9 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="h-9 w-9 rounded-lg bg-white/5" />
                            )}

                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-white">
                                    {song.title}
                                </h3>
                                <p className="truncate text-xs text-gray-400">
                                    {song.artist}
                                </p>
                            </div>
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-300">
                            <ExternalLink size={16} />
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
}
