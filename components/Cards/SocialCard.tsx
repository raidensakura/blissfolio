'use client';

import { ExternalLink } from 'lucide-react';
import CopyButton from '../Common/CopyButton';
import { ThemedCard } from './BaseCard';

interface Social {
  name: string;
  value: string;
  url: string;
  icon: React.ComponentType<any>;
}

interface SocialCardProps {
  social: Social;
}

export default function SocialCard({ social }: SocialCardProps) {
  const Icon = social.icon;

  return (
    <ThemedCard>
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 flex-1 min-w-0 items-center">
          <div
            className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-xl transition flex-shrink-0"
            style={{ color: 'var(--accent-text)' }}
          >
            <Icon size={28} />
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="font-semibold text-lg truncate">{social.name}</h3>
            <p className="text-gray-400 text-sm truncate">{social.value}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <CopyButton textToCopy={social.url} />
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </ThemedCard>
  );
}
