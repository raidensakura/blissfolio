'use client';

import { ExternalLink } from 'lucide-react';

interface PCSpecCardProps {
	name: string;
	value: string;
	details?: string; // optional extra info
	url?: string; // optional link
}

export default function PCSpecCard({
	name,
	value,
	details,
	url,
}: PCSpecCardProps) {
	return (
		<div
			className="flex justify-between items-start p-5 rounded-2xl border border-purple-500/20
                    bg-gradient-to-br from-[#15151c] to-[#111116]
                    hover:border-purple-500/40 hover:shadow-purple-500/10
                    transition shadow-lg"
		>
			<div className="flex flex-col gap-1 min-w-0">
				{/* Badge */}
				<span className="inline-block text-xs font-semibold px-2 py-1 rounded-md bg-purple-600/20 text-purple-400 w-max">
					{name}
				</span>

				{/* Value */}
				<h3 className="font-semibold text-lg text-white truncate">{value}</h3>

				{/* Optional details */}
				{details && <p className="text-gray-400 text-sm">{details}</p>}
			</div>

			{/* Optional link */}
			{url && (
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="ml-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition flex-shrink-0"
				>
					<ExternalLink size={18} />
				</a>
			)}
		</div>
	);
}
