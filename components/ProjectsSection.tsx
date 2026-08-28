'use client';

import { useEffect, useRef, useState } from 'react';
import { Project } from '@/data/projects';
import ProjectCard from '@/components/Cards/ProjectCard';

interface ProjectsSectionProps {
    personalProjects: Project[];
    workProjects: Project[];
}

export default function ProjectsSection({
    personalProjects,
    workProjects,
}: ProjectsSectionProps) {
    const [activeTab, setActiveTab] = useState<'personal' | 'work'>('personal');
    const projects = activeTab === 'personal' ? personalProjects : workProjects;

    const tabs = [
        {
            key: 'personal' as const,
            label: 'Personal',
            count: personalProjects.length,
        },
        { key: 'work' as const, label: 'Work', count: workProjects.length },
    ];

    const tabRefs = useRef<HTMLButtonElement[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

    useEffect(() => {
        const index = tabs.findIndex((tab) => tab.key === activeTab);
        const currentTab = tabRefs.current[index];
        if (currentTab) {
            setUnderlineStyle({
                width: currentTab.offsetWidth,
                left: currentTab.offsetLeft,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    return (
        <div
            className="rounded-2xl border p-6 bg-[#111116]"
            style={
                {
                    borderColor: 'var(--accent-border)',
                    '--hover-color': 'var(--accent-start)',
                } as React.CSSProperties
            }
            onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'var(--accent-end)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--accent-border)')
            }
        >
            <h2 className="text-xl font-semibold">Projects</h2>

            <div className="relative flex gap-6 border-b border-white/10 mt-4 mb-6 pb-3">
                {tabs.map((tab, i) => {
                    const isActive = activeTab === tab.key;

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            ref={(el) => {
                                if (el) tabRefs.current[i] = el;
                            }}
                            className="flex items-center gap-2 transition-colors cursor-pointer"
                            style={{
                                color: isActive
                                    ? 'var(--accent-text)'
                                    : '#b0b0b0',
                            }}
                        >
                            {tab.label}
                            <span
                                className="rounded-full px-2 py-0.5 text-xs"
                                style={{
                                    backgroundColor: isActive
                                        ? 'var(--accent-border)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    color: isActive
                                        ? 'var(--accent-text)'
                                        : '#d0d0d0',
                                }}
                            >
                                {tab.count}
                            </span>
                        </button>
                    );
                })}

                {/* Animated underline */}
                <span
                    className="absolute bottom-0 h-[2px] rounded-full transition-all duration-300"
                    style={{
                        width: underlineStyle.width,
                        left: underlineStyle.left,
                        backgroundColor: 'var(--accent-border)',
                    }}
                />
            </div>

            <div
                key={activeTab}
                className="grid gap-4 sm:grid-cols-2 animate-fadeIn"
            >
                {projects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                ))}
            </div>
        </div>
    );
}
