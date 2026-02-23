'use client';

import { ExternalLink } from 'lucide-react';
import { useState, ReactNode } from 'react';

interface ProjectCardProps {
	title: string;
	description: string;
	url: string;
	icon?: string | ReactNode;
}

export default function ProjectCard({
	title,
	description,
	url,
	icon,
}: ProjectCardProps) {
	const [imgError, setImgError] = useState(false);

	return (
		<div
			className="flex flex-col p-5 rounded-2xl border
               bg-gradient-to-br from-[#15151c] to-[#111116]
               transition shadow-lg h-full"
			style={{ borderColor: 'var(--accent-border)' }}
		>
			<div className="flex gap-4 min-w-0">
				<div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
					{icon ? (
						typeof icon === 'string' ? (
							<img
								src={icon}
								alt={`${title} icon`}
								className="w-8 h-8 object-contain"
								onError={() => setImgError(true)}
							/>
						) : (
							icon
						)
					) : (
						<span
							className="text-xl font-semibold"
							style={{ color: 'var(--accent-text)' }}
						>
							{title.charAt(0).toUpperCase()}
						</span>
					)}
				</div>

				<div className="flex flex-col min-w-0">
					<div className="flex items-center h-14">
						<h3
							className="font-semibold text-lg truncate"
							style={{ color: 'var(--accent-text)' }}
						>
							{title}
						</h3>
					</div>
				</div>
			</div>

			<p className="text-sm text-gray-400 mt-3">{description}</p>

			<div className="mt-auto pt-4">
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
				>
					<ExternalLink size={18} />
				</a>
			</div>
		</div>
	);
}
