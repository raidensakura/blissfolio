'use client';

import CopyButton from '../Common/CopyButton';
import { ThemedCard } from './BaseCard';

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
    return (
        <ThemedCard>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Image */}
                <img // eslint-disable-line @next/next/no-img-element
                    src={game.image}
                    alt={game.name}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />

                {/* Info section */}
                <div className="flex flex-col flex-1 gap-2 min-w-0">
                    <h3 className="font-semibold text-lg truncate">
                        {game.name}
                    </h3>

                    {/* Badge line */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className="text-xs px-2 py-1 rounded-md flex-shrink-0"
                            style={{
                                backgroundColor: game.active
                                    ? 'rgba(34,197,94,0.15)'
                                    : 'rgba(239,68,68,0.15)',
                                color: game.active
                                    ? 'rgb(74,222,128)'
                                    : 'rgb(248,113,113)',
                            }}
                        >
                            {game.active ? 'Active' : 'Inactive'}
                        </span>

                        <span className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-400 flex-shrink-0">
                            {game.region}
                        </span>
                    </div>

                    <div className="text-sm text-gray-400 truncate">
                        UID: {game.uid}
                    </div>
                </div>

                <CopyButton textToCopy={game.uid} />
            </div>
        </ThemedCard>
    );
}
