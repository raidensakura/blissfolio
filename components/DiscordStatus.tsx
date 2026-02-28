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
    const [connected, setConnected] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars

    useEffect(() => {
        let ws: WebSocket | null = null;
        let heartbeat: NodeJS.Timeout;
        let reconnectTimer: NodeJS.Timeout;

        const domain =
            process.env.NEXT_PUBLIC_LANYARD_DOMAIN?.trim() ||
            'api.lanyard.rest';
        const endpoint = `wss://${domain}/socket`;

        function connect() {
            try {
                ws = new WebSocket(endpoint);

                ws.onopen = () => {
                    setConnected(true);
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

                        if (msg.error) {
                            console.warn('Lanyard error:', msg.error.message);
                            setData(null);
                            return;
                        }

                        switch (msg.op) {
                            case 1: // Hello
                                heartbeat = setInterval(() => {
                                    if (ws?.readyState === WebSocket.OPEN) {
                                        ws.send(JSON.stringify({ op: 3 }));
                                    }
                                }, msg.d?.heartbeat_interval || 30000);
                                break;

                            case 0: // Presence update
                                setData(msg.d || null);
                                break;
                        }
                    } catch (err) {
                        console.warn('Failed to parse WS message', err);
                        setData(null);
                    }
                };

                ws.onclose = () => {
                    setConnected(false);
                    reconnectTimer = setTimeout(connect, 5000);
                };

                ws.onerror = (err) => {
                    console.error('Lanyard WS error:', err);
                    ws?.close();
                };
            } catch (err) {
                console.error('Failed to connect to Lanyard WS:', err);
                reconnectTimer = setTimeout(connect, 5000);
            }
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
    const gameActivity = activities.find((a) => a.type === 0);

    const statusColor = {
        online: 'bg-green-400',
        idle: 'bg-yellow-400',
        dnd: 'bg-red-400',
        offline: 'bg-gray-500',
    }[data.discord_status || 'offline'];

    const formatTimer = (start: number) => {
        const elapsed = Math.floor((now - start) / 1000);
        const hrs = Math.floor(elapsed / 3600);
        const mins = Math.floor((elapsed % 3600) / 60);
        const secs = elapsed % 60;
        return `${hrs > 0 ? `${hrs}:` : ''}${hrs > 0 ? String(mins).padStart(2, '0') : mins}:${String(secs).padStart(2, '0')}`;
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
                    title={data.discord_status || 'offline'}
                />
            </div>

            {/* Discord User Info */}
            <div className="flex items-center gap-4 mt-3">
                <Image
                    src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`}
                    alt={data.discord_user.username || 'Discord User'}
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

                    {customStatus && (
                        <p className="text-gray-400 text-sm italic truncate">
                            {customStatus}
                        </p>
                    )}

                    {gameActivity && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                            {gameActivity.assets?.large_image &&
                                gameActivity.application_id && (
                                    <Image
                                        src={`https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`}
                                        alt={gameActivity.name}
                                        width={20}
                                        height={20}
                                        className="rounded-sm shimmer"
                                    />
                                )}

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
                    {data.spotify.album_art_url && (
                        <Image
                            src={data.spotify.album_art_url}
                            alt={data.spotify.song}
                            width={64}
                            height={64}
                            className="rounded-xl border-2 border-green-400 object-cover shimmer"
                        />
                    )}

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-green-400 truncate flex items-center gap-1">
                            <FaSpotify /> {data.spotify.song}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                            {data.spotify.artist}
                        </p>

                        {data.spotify.timestamps?.end &&
                            data.spotify.timestamps?.start && (
                                <div className="h-1 w-full bg-gray-800 rounded-full mt-1 overflow-hidden">
                                    <div
                                        className="h-full bg-green-400"
                                        style={{
                                            width: `${((now - data.spotify.timestamps.start) / (data.spotify.timestamps.end - data.spotify.timestamps.start)) * 100}%`,
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
