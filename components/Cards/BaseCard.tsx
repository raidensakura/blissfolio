'use client';

interface ThemedCardProps {
    children: React.ReactNode;
    className?: string;
}

export function ThemedCard({ children, className = '' }: ThemedCardProps) {
    return (
        <div
            className={`relative p-5 rounded-2xl border shadow-lg transition-transform duration-300
                bg-gradient-to-br from-[#15151c] to-[#111116]
                border-[var(--accent-border)]
                hover:scale-105
                w-auto max-w-full min-w-0
                ${className}`}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--accent-end)';
                el.style.boxShadow =
                    '0 0 20px var(--accent-glow), 0 0 40px var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--accent-border)';
                el.style.boxShadow = '';
            }}
        >
            {children}
        </div>
    );
}
