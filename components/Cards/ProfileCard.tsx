'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import { Calendar, MapPin, Mail, User, X } from 'lucide-react';
import Tag from '../Common/Tag';
import CopyButton from '../Common/CopyButton';
import { PROFILE } from '../../data/profile';

export default function ProfileCard() {
    const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);

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
                    onClick={() => setIsWhatsAppPopupOpen(true)}
                >
                    <FaWhatsapp size={16} /> Chat on WhatsApp
                </button>
            </div>

            {isWhatsAppPopupOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                        onClick={() => setIsWhatsAppPopupOpen(false)}
                    >
                        <div
                            className="relative w-full max-w-sm rounded-2xl border p-6 bg-[#111116]"
                            style={{ borderColor: 'var(--accent-border)' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                onClick={() => setIsWhatsAppPopupOpen(false)}
                                className="absolute top-4 right-4 text-white/60 hover:text-white transition cursor-pointer"
                                title="Close"
                            >
                                <X size={18} />
                            </button>

                            <div
                                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4"
                                style={{ color: 'var(--accent-text)' }}
                            >
                                <FaWhatsapp size={24} />
                            </div>

                            <h3 className="text-lg font-semibold mb-2">
                                One more step
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                WhatsApp will ask for a username key before
                                the chat opens. Enter this key to reach me:
                            </p>

                            <div
                                className="flex items-center justify-between gap-2 rounded-lg border p-3 mb-4"
                                style={{ borderColor: 'var(--accent-border)' }}
                            >
                                <span
                                    className="text-xl font-semibold tracking-widest"
                                    style={{ color: 'var(--accent-text)' }}
                                >
                                    {PROFILE.whatsappKey}
                                </span>
                                <CopyButton textToCopy={PROFILE.whatsappKey} />
                            </div>

                            <button
                                className="btn-primary cursor-pointer"
                                onClick={() => {
                                    window.open(
                                        PROFILE.whatsapp,
                                        '_blank',
                                        'noopener,noreferrer',
                                    );
                                    setIsWhatsAppPopupOpen(false);
                                }}
                            >
                                <FaWhatsapp size={16} /> Continue to WhatsApp
                            </button>
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
