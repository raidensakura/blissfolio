'use client';

import { ReactNode } from 'react';

interface TagProps {
  icon: ReactNode;
  label: string;
}

export default function Tag({ icon, label }: TagProps) {
  return (
    <div className="card-tag flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 text-gray-200 text-sm font-medium">
      <span style={{ color: 'var(--accent-text)' }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
