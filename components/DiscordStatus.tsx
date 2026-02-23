'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSpotify, FaDesktop, FaMobile, FaChrome } from 'react-icons/fa';
import { ThemedCard } from './Cards/BaseCard';
import { profile } from '../data/profile';
const discordID = profile.discordID;

interface DiscordUser {
    id: string;
    display_name: string;
    username: string;
    avatar: string;
}

interface DiscordActivity {
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: { start: number; end?: number };
    assets?: {
        large_image?: string;
        small_image?: string;
        large_text?: string;
    };
    application_id?: string;
}

interface SpotifyData {
    song: string;
    artist: string;
    album_art_url: string;
    timestamps?: { start: number; end: number };
}

interface DiscordData {
    discord_user: DiscordUser;
    activities: DiscordActivity[];
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    active_on_discord_web: boolean;
    active_on_discord_desktop: boolean;
    active_on_discord_mobile: boolean;
    listening_to_spotify: boolean;
    spotify: SpotifyData | null;
}

export default function DiscordSpotifyCard() {
    const [data, setData] = useState<DiscordData | null>(null);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        async function fetchStatus() {
            try {
                const res = await fetch(
                    `https://api.lanyard.rest/v1/users/${discordID}`,
                );
                const json = await res.json();
                if (json.success) setData(json.data);
            } catch (err) {
                console.error('Failed to fetch Discord status', err);
            }
        }

        fetchStatus();
        const interval = setInterval(fetchStatus, 15000); // refresh every 15s
        const timer = setInterval(() => setNow(Date.now()), 1000); // live timer
        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, []);

    if (!data) {
        return (
            <div
                className="rounded-2xl border p-5 bg-[#111116]"
                style={{ color: 'var(--accent-border)' }}
            >
                <p className="text-sm text-gray-400">Discord & Spotify</p>
                <p className="mt-2 text-gray-500 italic">Loading...</p>
            </div>
        );
    }

    const customStatus = data.activities.find((a) => a.type === 4)?.state;
    const gameActivity = data.activities.find((a) => a.type === 0);

    const statusColor = {
        online: 'bg-green-400',
        idle: 'bg-yellow-400',
        dnd: 'bg-red-400',
        offline: 'bg-gray-500',
    }[data.discord_status];

    const formatTimer = (start: number) => {
        const elapsed = Math.floor((now - start) / 1000);
        const hrs = Math.floor(elapsed / 3600);
        const mins = Math.floor((elapsed % 3600) / 60);
        const secs = elapsed % 60;
        return `${hrs > 0 ? `${hrs}:` : ''}${
            hrs > 0 ? String(mins).padStart(2, '0') : mins
        }:${String(secs).padStart(2, '0')}`;
    };

    return (
        <ThemedCard>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-400 uppercase font-medium">
                    Discord & Spotify
                </h3>
                <span
                    className={`w-3 h-3 rounded-full ${statusColor} border border-gray-800`}
                    title={data.discord_status}
                />
            </div>

            {/* Discord User Info */}
            <div className="flex items-center gap-4 mt-3">
                <img // eslint-disable-line @next/next/no-img-element
                    src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`}
                    alt={data.discord_user.username}
                    width={48}
                    height={48}
                    className="rounded-xl border-2 object-cover"
                    style={
                        {
                            borderColor: 'var(--accent-border)',
                        } as React.CSSProperties
                    }
                />

                <div className="flex-1 min-w-0">
                    <p
                        className="font-semibold truncate"
                        style={{ color: 'var(--accent-text)' }}
                    >
                        {data.discord_user.display_name ||
                            data.discord_user.username}
                    </p>

                    {/* Custom Status */}
                    {customStatus && (
                        <p className="text-gray-400 text-sm italic truncate">
                            {customStatus}
                        </p>
                    )}

                    {/* Game/Playing Activity */}
                    {gameActivity && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                            {/* Game Icon */}
                            {gameActivity.assets?.large_image &&
                                gameActivity.application_id && (
                                    <Image
                                        src={`https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`}
                                        alt={gameActivity.name}
                                        width={20}
                                        height={20}
                                        className="rounded-sm"
                                    />
                                )}

                            {/* Name + Timer */}
                            <span className="truncate">
                                {gameActivity.details ||
                                    gameActivity.state ||
                                    gameActivity.name}{' '}
                                {gameActivity.timestamps?.start && (
                                    <span className="text-gray-500 text-xs ml-1">
                                        (
                                        {formatTimer(
                                            gameActivity.timestamps.start,
                                        )}
                                        )
                                    </span>
                                )}
                            </span>
                        </div>
                    )}

                    {/* Fallback */}
                    {!customStatus && !gameActivity && (
                        <p className="text-gray-500 italic text-sm">
                            No current activity
                        </p>
                    )}
                </div>
            </div>

            {/* Platform Badges */}
            <div className="flex gap-2 mt-3 text-gray-400">
                {data.active_on_discord_desktop && (
                    <FaDesktop title="Desktop" />
                )}
                {data.active_on_discord_mobile && <FaMobile title="Mobile" />}
                {data.active_on_discord_web && <FaChrome title="Web" />}
            </div>

            {/* Spotify Now Playing */}
            {data.listening_to_spotify && data.spotify && (
                <div
                    className="mt-4 flex items-center gap-4 border-t pt-3"
                    style={
                        {
                            borderColor: 'var(--accent-border)',
                        } as React.CSSProperties
                    }
                >
                    {/* Album art */}
                    {data.spotify.album_art_url && (
                        <Image
                            src={data.spotify.album_art_url}
                            alt={data.spotify.song}
                            width={64}
                            height={64}
                            className="rounded-xl border-2 border-green-400 object-cover"
                        />
                    )}

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-green-400 truncate flex items-center gap-1">
                            <FaSpotify /> {data.spotify.song}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                            {data.spotify.artist}
                        </p>

                        {/* Progress Bar */}
                        {data.spotify.timestamps?.end &&
                            data.spotify.timestamps?.start && (
                                <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
                                    <div
                                        className="h-full bg-green-400"
                                        style={{
                                            width: `${
                                                ((now -
                                                    data.spotify.timestamps
                                                        .start) /
                                                    (data.spotify.timestamps
                                                        .end -
                                                        data.spotify.timestamps
                                                            .start)) *
                                                100
                                            }%`,
                                        }}
                                    />
                                </div>
                            )}
                    </div>
                </div>
            )}
        </ThemedCard>
    );
}
