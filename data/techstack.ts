import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiDocker,
    SiLinux,
    SiPython,
    SiPostgresql,
    SiTailwindcss,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiRedux,
    SiPhp,
    SiProxmox,
    SiNodedotjs,
} from 'react-icons/si';

import type { IconType } from 'react-icons';

export type TechCategory =
    | 'frontend'
    | 'backend'
    | 'database'
    | 'devops'
    | 'infrastructure'
    | 'tooling';

export interface Tech {
    key: string;
    name: string;
    category: TechCategory;
    icon: IconType; // icon is stored here
    description?: string;
    featured?: boolean;
    currentlyUsing?: boolean;
}

export const TECH_STACK: Tech[] = [
    {
        key: 'nextjs',
        name: 'Next.js',
        category: 'frontend',
        icon: SiNextdotjs,
        currentlyUsing: false,
        featured: true,
    },
    {
        key: 'react',
        name: 'React',
        category: 'frontend',
        icon: SiReact,
        currentlyUsing: false,
        featured: true,
    },
    {
        key: 'typescript',
        name: 'TypeScript',
        category: 'frontend',
        icon: SiTypescript,
        currentlyUsing: false,
        featured: true,
    },
    {
        key: 'nodejs',
        name: 'Node.js',
        category: 'backend',
        icon: SiNodedotjs,
        currentlyUsing: false,
        featured: true,
    },
    {
        key: 'php',
        name: 'PHP',
        category: 'backend',
        icon: SiPhp,
        currentlyUsing: true,
        featured: true,
    },
    {
        key: 'python',
        name: 'Python',
        category: 'backend',
        icon: SiPython,
        currentlyUsing: true,
        featured: true,
    },
    { key: 'python', name: 'Python', category: 'backend', icon: SiPython },
    {
        key: 'postgres',
        name: 'PostgreSQL',
        category: 'database',
        icon: SiPostgresql,
    },
    {
        key: 'tailwind',
        name: 'Tailwind CSS',
        category: 'frontend',
        icon: SiTailwindcss,
        featured: true,
    },
    {
        key: 'javascript',
        name: 'JavaScript',
        category: 'frontend',
        icon: SiJavascript,
    },
    {
        key: 'html',
        name: 'HTML5',
        category: 'frontend',
        icon: SiHtml5,
        featured: true,
    },
    {
        key: 'css',
        name: 'CSS3',
        category: 'frontend',
        icon: SiCss3,
        featured: true,
    },
    {
        key: 'docker',
        name: 'Docker',
        category: 'devops',
        icon: SiDocker,
        currentlyUsing: true,
    },
    {
        key: 'linux',
        name: 'Linux',
        category: 'infrastructure',
        icon: SiLinux,
        featured: true,
    },
    {
        key: 'proxmox',
        name: 'Proxmox VE',
        category: 'infrastructure',
        icon: SiProxmox,
        currentlyUsing: true,
    },
    { key: 'redux', name: 'Redux', category: 'frontend', icon: SiRedux },
];
