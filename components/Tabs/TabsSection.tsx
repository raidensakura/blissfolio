'use client';

import { useState } from 'react';
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

	return (
		<div
			className="rounded-2xl border p-6 bg-[#111116]"
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
			<div className="flex flex-wrap gap-6 border-b border-white/10 pb-4 mb-6">
				<Tab
					label="Socials"
					count={socials.length}
					active={activeTab === 'socials'}
					onClick={() => setActiveTab('socials')}
					theme={theme}
				/>

				<Tab
					label="Game UIDs"
					count={games.length}
					active={activeTab === 'games'}
					onClick={() => setActiveTab('games')}
					theme={theme}
				/>

				<Tab
					label="My Domains"
					count={domains.length}
					active={activeTab === 'domains'}
					onClick={() => setActiveTab('domains')}
					theme={theme}
				/>

				<Tab
					label="PC Specs"
					count={pcSpecs.length}
					active={activeTab === 'pc'}
					onClick={() => setActiveTab('pc')}
					theme={theme}
				/>
			</div>

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
							<DomainCard key={d.domain || d} domain={d.domain || d} />
						))}
					</div>
				)}

				{activeTab === 'pc' && <SpecGrid items={pcSpecs} />}
			</div>
		</div>
	);
}
