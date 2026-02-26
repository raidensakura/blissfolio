'use client';

import { forwardRef } from 'react';

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

// Forward ref to the button
const Tab = forwardRef<HTMLButtonElement, TabProps>(
    ({ label, active, onClick, count }, ref) => {
        return (
            <button
                ref={ref}
                onClick={onClick}
                className="flex items-center gap-2 pb-2 transition relative cursor-pointer"
                style={{
                    color: active ? 'var(--accent-text)' : '#b0b0b0',
                }}
                onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = '#b0b0b0';
                }}
            >
                {label}

                {typeof count === 'number' && (
                    <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                            backgroundColor: active
                                ? 'var(--accent-border)'
                                : 'rgba(255, 255, 255, 0.1)',
                            color: active ? 'var(--accent-text)' : '#d0d0d0',
                        }}
                    >
                        {count}
                    </span>
                )}
            </button>
        );
    },
);

Tab.displayName = 'Tab';

export default Tab;
