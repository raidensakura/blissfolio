'use client';

import PCSpecCard from '../Cards/PCSpecCard';

interface SpecGridProps {
	items: { name: string; value: string; details?: string; url?: string }[];
}

export default function SpecGrid({ items }: SpecGridProps) {
	return (
		<div className="space-y-4">
			{items.map((item) => (
				<PCSpecCard
					key={item.name}
					name={item.name}
					value={item.value}
					details={item.details}
					url={item.url}
				/>
			))}
		</div>
	);
}
