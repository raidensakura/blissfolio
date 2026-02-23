'use client';

import { Mail, Calendar, User, MapPin } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

import TabsSection from '../components/Tabs/TabsSection';
import ProjectCard from '../components/Cards/ProjectCard';
import Tag from '../components/Cards/Tag';
import DiscordStatus from '../components/DiscordStatus';

import { socials } from '../data/socials';
import { games } from '../data/games';
import { domains } from '../data/domains';
import { pcSpecs } from '../data/pcSpecs';
import { projects } from '../data/projects';
import { profile } from '../data/profile';

export default function Home() {
	return (
		<main className="min-h-screen bg-[#0b0b0f] text-white p-8">
			<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* LEFT SIDE */}
				<div className="space-y-6">
					{/* PROFILE CARD */}
					<div
						className="rounded-2xl border bg-[#111116] overflow-hidden shadow-xl"
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
							<img
								src="/banner.jpg"
								className="w-full h-full object-cover opacity-70"
							/>
						</div>

						{/* Avatar */}
						<div className="px-6 -mt-12">
							<img
								src="/avatar.png"
								className="w-24 h-24 rounded-xl border-4 shadow-lg z-10 relative"
								style={{ borderColor: 'var(--accent-border)' }}
							/>
						</div>

						{/* Info */}
						<div className="p-6 pt-4 space-y-4">
							<h1
								className="text-2xl font-semibold"
								style={{ color: 'var(--accent-text)' }}
							>
								{' '}
								{profile.name}
							</h1>
							<p className="text-gray-400">{profile.description}</p>
							<p>{profile.love}</p>

							<div className="grid grid-cols-2 gap-3 text-sm">
								<Tag icon={<User size={16} />} label="he/him" />
								<Tag
									icon={<Calendar size={16} />}
									label={`${new Date().getFullYear() - profile.birthYear} years old`}
								/>
								<div className="col-span-2">
									<Tag icon={<MapPin size={16} />} label={profile.location} />
								</div>
							</div>

							<button
								className="btn-primary cursor-pointer"
								onClick={() =>
									(window.location.href = `mailto:${profile.email}`)
								}
							>
								<Mail size={16} /> Contact Me
							</button>

							<button
								className="btn-secondary cursor-pointer"
								onClick={() => (window.location.href = profile.discordInvite)}
							>
								<FaDiscord size={16} /> Join Discord Server
							</button>
						</div>
					</div>

					<DiscordStatus />
				</div>

				{/* RIGHT SIDE */}
				<div className="lg:col-span-2 space-y-8">
					{/* PROJECTS */}
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
						<h2 className="text-xl font-semibold mb-4">Projects</h2>

						<div className="grid gap-4 sm:grid-cols-2">
							{projects.map((project) => (
								<ProjectCard
									key={project.title}
									title={project.title}
									description={project.description}
									url={project.url}
									icon={project.icon}
								/>
							))}
						</div>
					</div>

					{/* TABS SECTION */}
					<TabsSection
						socials={socials}
						games={games}
						domains={domains}
						pcSpecs={pcSpecs}
					/>
				</div>
			</div>
		</main>
	);
}
