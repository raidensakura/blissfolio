'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSpotify, FaDesktop, FaMobile, FaChrome } from 'react-icons/fa';
import { ThemedCard } from './Cards/BaseCard';
import { PROFILE } from '../data/profile';

const discordID = PROFILE.discordID;

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
    assets?: { large_image?: string; small_image?: string };
    application_id?: string;
}

interface SpotifyData {
    song: string;
    artist: string;
    album_art_url: string;
    timestamps?: { start: number; end?: number };
}

interface DiscordData {
    discord_user?: DiscordUser;
    activities?: DiscordActivity[];
    discord_status?: 'online' | 'idle' | 'dnd' | 'offline';
    active_on_discord_web?: boolean;
    active_on_discord_desktop?: boolean;
    active_on_discord_mobile?: boolean;
    listening_to_spotify?: boolean;
    spotify?: SpotifyData | null;
}

export default function DiscordSpotifyCard() {
    const [data, setData] = useState<DiscordData | null>(null);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        let ws: WebSocket | null = null;
        let heartbeat: NodeJS.Timeout;
        let reconnectTimer: NodeJS.Timeout;

        const domain =
            process.env.NEXT_PUBLIC_LANYARD_DOMAIN?.trim() ||
            'api.lanyard.rest';
        const endpoint = `wss://${domain}/socket`;

        function connect() {
            ws = new WebSocket(endpoint);

            ws.onopen = () => {
                ws?.send(
                    JSON.stringify({
                        op: 2,
                        d: { subscribe_to_id: discordID },
                    }),
                );
            };

            ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);

                    if (msg.op === 1) {
                        heartbeat = setInterval(() => {
                            ws?.send(JSON.stringify({ op: 3 }));
                        }, msg.d?.heartbeat_interval || 30000);
                    }

                    if (msg.op === 0) {
                        setData(msg.d || null);
                    }
                } catch {
                    setData(null);
                }
            };

            ws.onclose = () => {
                reconnectTimer = setTimeout(connect, 5000);
            };

            ws.onerror = () => {
                ws?.close();
            };
        }

        connect();
        const timer = setInterval(() => setNow(Date.now()), 1000);

        return () => {
            ws?.close();
            clearInterval(timer);
            clearInterval(heartbeat);
            clearTimeout(reconnectTimer);
        };
    }, []);

    if (!data || !data.discord_user) {
        return (
            <ThemedCard className="p-5 rounded-2xl bg-[#111116] border">
                <h3 className="text-sm text-gray-400 uppercase font-medium mb-2">
                    Discord & Spotify
                </h3>
                <p className="mt-2 text-gray-500 italic">
                    Presence status unavailable
                </p>
            </ThemedCard>
        );
    }

    const activities = data.activities || [];

    const customStatus = activities.find((a) => a.type === 4)?.state;

    // Show any type 0 activity except Spotify
    const gameActivity = activities.find(
        (a) => a.type === 0 && a.name !== 'Spotify',
    );

    const statusColor = {
        online: 'bg-green-400',
        idle: 'bg-yellow-400',
        dnd: 'bg-red-400',
        offline: 'bg-gray-500',
    }[data.discord_status || 'offline'];

    const formatTimer = (start: number) => {
        const elapsed = Math.floor((now - start) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        return `${mins}:${String(secs).padStart(2, '0')}`;
    };

    const calculateProgress = (start?: number, end?: number) => {
        if (!start || !end) return null;
        const percent = ((now - start) / (end - start)) * 100;
        return Math.min(100, Math.max(0, percent));
    };

    const resolveActivityImage = (activity: DiscordActivity) => {
        if (!activity.assets?.large_image) return null;

        const img = activity.assets.large_image;

        if (img.startsWith('spotify:')) {
            return `https://i.scdn.co/image/${img.replace('spotify:', '')}`;
        }

        if (img.startsWith('mp:')) {
            return `https://media.discordapp.net/${img.replace('mp:', '')}`;
        }

        if (activity.application_id) {
            return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`;
        }

        return null;
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
                />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 mt-3">
                <Image
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
                    <div className="flex items-center gap-2">
                        {/* Username */}
                        <p
                            className="font-semibold truncate"
                            style={{ color: 'var(--accent-text)' }}
                        >
                            {data.discord_user.display_name ||
                                data.discord_user.username}
                        </p>

                        {/* Platform Badges inline */}
                        <div className="flex gap-1 text-gray-400">
                            {data.active_on_discord_desktop && (
                                <FaDesktop size={14} />
                            )}
                            {data.active_on_discord_mobile && (
                                <FaMobile size={14} />
                            )}
                            {data.active_on_discord_web && (
                                <FaChrome size={14} />
                            )}
                        </div>
                    </div>

                    {/* Custom Status */}
                    {customStatus && (
                        <p className="text-gray-400 text-sm italic truncate">
                            {customStatus}
                        </p>
                    )}
                </div>
            </div>

            {/* Game Section */}
            {gameActivity && (
                <div
                    className="mt-4 flex items-center gap-4 border-t pt-3"
                    style={
                        {
                            borderColor: 'var(--accent-border)',
                        } as React.CSSProperties
                    }
                >
                    {resolveActivityImage(gameActivity) && (
                        <Image
                            src={resolveActivityImage(gameActivity)!}
                            alt={gameActivity.name}
                            width={64}
                            height={64}
                            className="rounded-xl border-2 object-cover"
                            style={
                                {
                                    borderColor: 'var(--accent-border)',
                                } as React.CSSProperties
                            }
                        />
                    )}

                    <div className="flex-1 min-w-0">
                        <p
                            className="font-semibold truncate"
                            style={{ color: 'var(--accent-text)' }}
                        >
                            {gameActivity.name}
                        </p>

                        {gameActivity.details && (
                            <p className="text-gray-400 text-sm truncate">
                                {gameActivity.details}
                            </p>
                        )}

                        {gameActivity.state && (
                            <p className="text-gray-500 text-xs truncate">
                                {gameActivity.state}
                            </p>
                        )}

                        {!gameActivity.details && !gameActivity.state && (
                            <p className="text-gray-500 text-sm">Playing</p>
                        )}

                        {gameActivity.timestamps?.start && (
                            <p className="text-gray-500 text-xs mt-1">
                                {formatTimer(gameActivity.timestamps.start)}{' '}
                                elapsed
                            </p>
                        )}

                        {calculateProgress(
                            gameActivity.timestamps?.start,
                            gameActivity.timestamps?.end,
                        ) !== null && (
                            <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
                                <div
                                    className="h-full"
                                    style={{
                                        backgroundColor: 'var(--accent-text)',
                                        width: `${calculateProgress(
                                            gameActivity.timestamps?.start,
                                            gameActivity.timestamps?.end,
                                        )}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Spotify Section */}
            {data.listening_to_spotify && data.spotify && (
                <div
                    className="mt-4 flex items-center gap-4 border-t pt-3"
                    style={
                        {
                            borderColor: 'var(--accent-border)',
                        } as React.CSSProperties
                    }
                >
                    <Image
                        src={data.spotify.album_art_url}
                        alt={data.spotify.song}
                        width={64}
                        height={64}
                        className="rounded-xl border-2 border-green-400 object-cover"
                    />

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-green-400 truncate flex items-center gap-1">
                            <FaSpotify /> {data.spotify.song}
                        </p>

                        <p className="text-gray-400 text-sm truncate">
                            {data.spotify.artist}
                        </p>

                        {data.spotify.timestamps?.start && (
                            <p className="text-gray-500 text-xs mt-1">
                                {formatTimer(data.spotify.timestamps.start)}{' '}
                                elapsed
                            </p>
                        )}

                        {calculateProgress(
                            data.spotify.timestamps?.start,
                            data.spotify.timestamps?.end,
                        ) !== null && (
                            <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
                                <div
                                    className="h-full bg-green-400"
                                    style={{
                                        width: `${calculateProgress(
                                            data.spotify.timestamps?.start,
                                            data.spotify.timestamps?.end,
                                        )}%`,
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
