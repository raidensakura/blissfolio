'use client';

import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';
import { Calendar, MapPin, Mail, User } from 'lucide-react';
import Tag from '../Common/Tag';
import { PROFILE } from '../../data/profile';

export default function ProfileCard() {
    return (
        <div
            className="rounded-2xl border bg-[#111116] overflow-hidden shadow-xl transition"
            style={
                {
                    borderColor: 'var(--accent-border)',
                    '--hover-color': 'var(--accent-start)',
                } as React.CSSProperties
            }
            onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'var(--accent-end)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--accent-border)')
            }
        >
            {/* Banner */}
            <div
                className="h-40 relative"
                style={{
                    background:
                        'linear-gradient(to right, var(--accent-start), var(--accent-end))',
                    opacity: 0.8,
                }}
            >
                <Image
                    src="/banner.jpg"
                    alt="Banner"
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="object-cover opacity-70 shimmer"
                    priority
                />
            </div>

            {/* Avatar */}
            <div className="px-6 -mt-12">
                <Image
                    src="/avatar.png"
                    alt="Profile avatar"
                    width={96}
                    height={96}
                    priority
                    className="rounded-xl border-4 shadow-lg z-10 relative shimmer"
                    style={
                        {
                            borderColor: 'var(--accent-border)',
                        } as React.CSSProperties
                    }
                />
            </div>

            {/* Info */}
            <div className="p-6 pt-4 space-y-4">
                <h1
                    className="text-2xl font-semibold"
                    style={{ color: 'var(--accent-text)' }}
                >
                    {PROFILE.name}
                </h1>

                <p className="text-gray-400">{PROFILE.description}</p>
                <p>{PROFILE.love}</p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                    <Tag icon={<User size={16} />} label="he/him" />
                    <Tag
                        icon={<Calendar size={16} />}
                        label={`${new Date().getFullYear() - PROFILE.birthYear} years old`}
                    />
                    <div className="col-span-2">
                        <Tag
                            icon={<MapPin size={16} />}
                            label={PROFILE.location}
                        />
                    </div>
                </div>

                <button
                    className="btn-primary cursor-pointer"
                    onClick={() =>
                        (window.location.href = `mailto:${PROFILE.email}`)
                    }
                >
                    <Mail size={16} /> Contact Me
                </button>

                <button
                    className="btn-secondary cursor-pointer"
                    onClick={() =>
                        (window.location.href = PROFILE.discordInvite)
                    }
                >
                    <FaDiscord size={16} /> Join Discord Server
                </button>
            </div>
        </div>
    );
}
