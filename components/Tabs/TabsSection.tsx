'use client';

import { useRef, useState, useEffect } from 'react';
import Tab from './Tab';
import SocialCard from '../Cards/SocialCard';
import GameCard from '../Cards/GameCard';
import DomainCard from '../Cards/DomainCard';
import SpecGrid from '../Grids/SpecGrid';

interface TabsSectionProps {
    socials: any[];
    games: any[];
    domains: any[];
    pcSpecs: any[];
    theme?: {
        accentStart?: string;
        accentEnd?: string;
        accentText?: string;
        accentBorder?: string;
    };
}

export default function TabsSection({
    socials,
    games,
    domains,
    pcSpecs,
    theme = {
        accentStart: 'var(--accent-start)',
        accentEnd: 'var(--accent-end)',
        accentText: 'var(--accent-text)',
        accentBorder: 'var(--accent-border)',
    },
}: TabsSectionProps) {
    const [activeTab, setActiveTab] = useState<
        'socials' | 'games' | 'domains' | 'pc'
    >('socials');

    const tabRefs = useRef<HTMLButtonElement[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

    useEffect(() => {
        const currentTab = tabRefs.current.find(
            (_, i) => ['socials', 'games', 'domains', 'pc'][i] === activeTab,
        );
        if (currentTab) {
            setUnderlineStyle({
                width: currentTab.offsetWidth,
                left: currentTab.offsetLeft,
            });
        }
    }, [activeTab]);

    return (
        <div
            className="rounded-2xl border p-6 bg-[#111116]"
            style={
                {
                    borderColor: 'var(--accent-border)',
                    '--hover-color': 'var(--accent-start)',
                } as React.CSSProperties
            }
        >
            {/* Scrollable tabs */}
            <div className="overflow-x-auto relative">
                <div className="flex gap-6 min-w-max relative border-b border-white/10 pb-4 mb-6">
                    {[
                        {
                            label: 'Socials',
                            key: 'socials',
                            count: socials.length,
                        },
                        {
                            label: 'Game UIDs',
                            key: 'games',
                            count: games.length,
                        },
                        {
                            label: 'My Domains',
                            key: 'domains',
                            count: domains.length,
                        },
                        { label: 'PC Specs', key: 'pc', count: pcSpecs.length },
                    ].map((tab, i) => (
                        <Tab
                            key={tab.key}
                            label={tab.label}
                            count={tab.count}
                            active={activeTab === tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            theme={theme}
                            ref={(el: HTMLButtonElement) =>
                                (tabRefs.current[i] = el)
                            }
                        />
                    ))}

                    {/* Animated underline */}
                    <span
                        className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300"
                        style={{
                            width: underlineStyle.width,
                            left: underlineStyle.left,
                            backgroundColor: theme.accentBorder,
                        }}
                    />
                </div>
            </div>

            {/* Tab content */}
            <div className="animate-fadeIn">
                {activeTab === 'socials' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {socials.map((s: any) => (
                            <SocialCard key={s.name} social={s} />
                        ))}
                    </div>
                )}

                {activeTab === 'games' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {games.map((g: any) => (
                            <GameCard key={g.name} game={g} />
                        ))}
                    </div>
                )}

                {activeTab === 'domains' && (
                    <div className="space-y-4">
                        {domains.map((d: any) => (
                            <DomainCard
                                key={d.domain || d}
                                domain={d.domain || d}
                            />
                        ))}
                    </div>
                )}

                {activeTab === 'pc' && <SpecGrid items={pcSpecs} />}
            </div>
        </div>
    );
}
