export interface Project {
    title: string;
    description: string;
    url: string;
    icon?: string;
}

export const PROJECTS: Project[] = [
    {
        title: 'Shogun',
        description:
            'Based on open source project, Red Discord Bot serving various utilities like moderation, fun commands, and more.',
        url: 'https://dash.project-mei.xyz',
        icon: '/projects/shogun.png',
    },
    {
        title: 'Sirin Homeserver',
        description:
            'Personal homeserver setup, running various services like Nextcloud, Jellyfin, and more.',
        url: '#',
        icon: '/projects/sirin.jpg',
    },
];
