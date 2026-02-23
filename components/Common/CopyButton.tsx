'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';

export default function CopyButton({ textToCopy }: { textToCopy: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);

        // Hide the popup after 2 seconds
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
            >
                <Copy size={18} />
            </button>

            {/* Popup */}
            {copied && (
                <span
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                     text-white text-xs px-2 py-1 rounded-lg
                     shadow-lg whitespace-nowrap z-10 animate-fadeInOut"
                    style={{ backgroundColor: 'var(--accent-text)' }}
                >
                    Copied: {textToCopy}
                </span>
            )}
        </div>
    );
}
