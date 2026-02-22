'use client';

import { Copy, ExternalLink } from 'lucide-react';
import CopyButton from '../CopyButton';


interface Social {
	name: string;
	value: string;
	url: string;
	icon: React.ComponentType<any>;
}

interface SocialCardProps {
	social: Social;
}

export default function SocialCard({ social }: SocialCardProps) {
	const copyUsername = () => navigator.clipboard.writeText(social.value);
	const Icon = social.icon;

	return (
		<div
			className="relative p-5 rounded-2xl border border-purple-500/20
                 bg-gradient-to-br from-[#15151c] to-[#111116]
                 hover:border-purple-500/40 hover:shadow-purple-500/10
                 transition shadow-lg"
		>
			<div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
				{/* LEFT SIDE: icon + text */}
				<div className="flex gap-4 flex-1 min-w-0 items-center">
					<div
						className="w-14 h-14 rounded-xl 
                       bg-white/5 flex items-center justify-center
                       text-purple-400 text-xl group-hover:text-purple-300
                       transition flex-shrink-0"
					>
						<Icon size={28} />
					</div>

					<div className="flex flex-col min-w-0">
						<h3 className="font-semibold text-lg truncate">{social.name}</h3>
						<p className="text-gray-400 text-sm truncate">{social.value}</p>
					</div>
				</div>

				{/* RIGHT SIDE: buttons */}
				<div className="flex gap-2 flex-shrink-0">
					<CopyButton textToCopy={social.url} />
					<a
						href={social.url}
						target="_blank"
						className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
					>
						<ExternalLink size={18} />
					</a>
				</div>
			</div>
		</div>
	);
}
