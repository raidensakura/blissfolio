interface TabProps {
	label: string;
	active: boolean;
	onClick: () => void;
	count?: number;
}

export default function Tab({ label, active, onClick, count }: TabProps) {
	return (
		<button
			onClick={onClick}
			className={`flex items-center gap-2 pb-2 transition relative cursor-pointer
        ${active ? 'text-purple-400' : 'text-gray-400 hover:text-white'}`}
		>
			{label}

			{/* Badge */}
			{typeof count === 'number' && (
				<span
					className={`text-xs px-2 py-0.5 rounded-full
            ${
							active
								? 'bg-purple-500/20 text-purple-400'
								: 'bg-white/10 text-gray-300'
						}`}
				>
					{count}
				</span>
			)}

			{/* Active underline */}
			{active && (
				<span className="absolute left-0 -bottom-[17px] w-full h-[2px] bg-purple-500 rounded-full" />
			)}
		</button>
	);
}
