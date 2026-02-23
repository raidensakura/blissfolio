'use client';

interface TabProps {
    label: string;
    active: boolean;
    onClick: () => void;
    count?: number;
    theme?: {
        accentStart?: string;
        accentEnd?: string;
        accentText?: string;
        accentBorder?: string;
    };
}

export default function Tab({
    label,
    active,
    onClick,
    count,
    theme,
}: TabProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 pb-2 transition relative cursor-pointer"
            style={
                {
                    color: active ? 'var(--accent-text)' : '#b0b0b0',
                    'var(--accent-start)': theme?.accentStart,
                    'var(--accent-end)': theme?.accentEnd,
                    'var(--accent-text)': theme?.accentText,
                    'var(--accent-border)': theme?.accentBorder,
                } as React.CSSProperties
            }
            onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = '#b0b0b0';
            }}
        >
            {label}

            {/* Badge */}
            {typeof count === 'number' && (
                <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={
                        {
                            backgroundColor: active
                                ? 'var(--accent-border)'
                                : 'rgba(255, 255, 255, 0.1)',
                            color: active ? 'var(--accent-text)' : '#d0d0d0',
                        } as React.CSSProperties
                    }
                >
                    {count}
                </span>
            )}

            {/* Active underline */}
            {active && (
                <span
                    className="absolute left-0 -bottom-[17px] w-full h-[2px] rounded-full"
                    style={
                        {
                            backgroundColor: 'var(--accent-border)',
                        } as React.CSSProperties
                    }
                />
            )}
        </button>
    );
}
