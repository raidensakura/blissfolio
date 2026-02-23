'use client';

import { ExternalLink } from 'lucide-react';

interface PCSpecCardProps {
	name: string;
	value: string;
	details?: string;
	url?: string;
}

export default function PCSpecCard({
	name,
	value,
	details,
	url,
}: PCSpecCardProps) {
	return (
		<div
			className="flex justify-between items-start p-5 rounded-2xl border
                    bg-gradient-to-br from-[#15151c] to-[#111116]
                    transition shadow-lg"
			style={{ borderColor: 'var(--accent-border)' }}
		>
			<div className="flex flex-col gap-1 min-w-0">
				<span
					className="inline-block text-xs font-semibold px-2 py-1 rounded-md w-max"
					style={{
						backgroundColor:
							'color-mix(in srgb, var(--accent-border) 20%, transparent)',
						color: 'var(--accent-text)',
					}}
				>
					{name}
				</span>

				<h3 className="font-semibold text-lg truncate">{value}</h3>

				{details && <p className="text-gray-400 text-sm">{details}</p>}
			</div>

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
