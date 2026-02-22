import { useState } from 'react';
import Tab from './Tab';
import SocialCard from '../Cards/SocialCard';
import GameCard from '../Cards/GameCard';
import DomainCard from '../Cards/DomainCard';
import SpecGrid from '../Grids/SpecGrid';
import SimpleGrid from '../Grids/SimpleGrid';

export default function TabsSection({ socials, games, domains, pcSpecs }: any) {
	const [activeTab, setActiveTab] = useState<
		'socials' | 'games' | 'domains' | 'pc'
	>('socials');

	return (
		<div className="rounded-2xl border border-purple-500/30 p-6 bg-[#111116]">
			<div className="flex flex-wrap gap-6 border-b border-white/10 pb-4 mb-6">
				<Tab
					label="Socials"
					count={socials.length}
					active={activeTab === 'socials'}
					onClick={() => setActiveTab('socials')}
				/>

				<Tab
					label="Game UIDs"
					count={games.length}
					active={activeTab === 'games'}
					onClick={() => setActiveTab('games')}
				/>

				<Tab
					label="My Domains"
					count={domains.length}
					active={activeTab === 'domains'}
					onClick={() => setActiveTab('domains')}
				/>

				<Tab
					label="PC Specs"
					count={pcSpecs.length}
					active={activeTab === 'pc'}
					onClick={() => setActiveTab('pc')}
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
							<DomainCard key={d.name} domain={d} />
						))}
					</div>
				)}
				{activeTab === 'pc' && <SpecGrid items={pcSpecs} />}
			</div>
		</div>
	);
}
