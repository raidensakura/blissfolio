'use client';

import { Copy } from 'lucide-react';
import CopyButton from '../CopyButton';

interface Game {
	name: string;
	uid: string;
	region: string;
	active: boolean;
	image: string;
}

interface GameCardProps {
	game: Game;
}

export default function GameCard({ game }: GameCardProps) {
	const copyUID = () => navigator.clipboard.writeText(game.uid);

	return (
		<div
			className="relative p-5 rounded-2xl border border-purple-500/20
                 bg-gradient-to-br from-[#15151c] to-[#111116]
                 hover:border-purple-500/40 hover:shadow-purple-500/10
                 transition shadow-lg"
		>
			{/* Main container: stacked on mobile, row on desktop */}
			<div className="flex flex-col sm:flex-row sm:items-center gap-3">
				{/* Image */}
				<img
					src={game.image}
					alt={game.name}
					className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
				/>

				{/* Info section */}
				<div className="flex flex-col flex-1 gap-2 min-w-0">
					{/* Title */}
					<h3 className="font-semibold text-lg truncate">{game.name}</h3>

					{/* Badge line: Active + server */}
					<div className="flex items-center gap-2 flex-wrap">
						<span
							className={`text-xs px-2 py-1 rounded-md flex-shrink-0 ${
								game.active
									? 'bg-green-600/20 text-green-400'
									: 'bg-red-600/20 text-red-400'
							}`}
						>
							{game.active ? 'Active' : 'Inactive'}
						</span>
						<span className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-400 flex-shrink-0">
							{game.region}
						</span>
					</div>

					{/* UID line */}
					<div className="text-sm text-gray-400 truncate">{`UID: ${game.uid}`}</div>
				</div>

				<CopyButton textToCopy={game.uid} />
			</div>
		</div>
	);
}
