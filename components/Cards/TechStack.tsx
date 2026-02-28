'use client';

import { TECH_STACK, Tech } from '@/data/techstack';

interface TechStackProps {
    techs: string[];
}

export default function TechStack({ techs }: TechStackProps) {
    const filteredTechs: Tech[] = TECH_STACK.filter(
        (tech) =>
            techs.includes(tech.key) && (tech.currentlyUsing || tech.featured),
    );

    return (
        <div className="flex flex-wrap gap-3">
            {filteredTechs.map((tech) => {
                const Icon = tech.icon;

                return (
                    <div
                        key={tech.key}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
                    >
                        {Icon && <Icon className="text-lg" />}
                        <span className="text-sm font-medium">{tech.name}</span>

                        {tech.currentlyUsing && (
                            <span className="text-xs opacity-60">• Active</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
