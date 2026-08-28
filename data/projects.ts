export interface Project {
    title: string;
    description: string;
    url: string;
    icon?: string;
    screenshots?: string[];
    discontinued?: boolean;
}

export const PERSONAL_PROJECTS: Project[] = [
    {
        title: 'Shogun',
        description:
            'Based on open source project, Red Discord Bot serving various utilities like moderation, fun commands, and more.',
        url: 'https://dash.project-mei.xyz',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=dash.project-mei.xyz',
    },
    {
        title: 'Sirin',
        description:
            'My own mini PC at home running Proxmox VE for hosting purposes.',
        url: '#',
        icon: '/projects/sirin.jpg',
    },
];

export const WORK_PROJECTS: Project[] = [
    {
        title: 'Artsoul Figurines',
        description:
            'Commerce platform tailored for a local business. Built with CodeIgniter 4, Bootstrap, and MySQL.',
        url: 'https://artsoulfigurines.com',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=artsoulfigurines.com',
        screenshots: ['/projects/work/artsoul.png'],
        discontinued: true,
    },
    {
        title: 'Bayar Zakat Platform',
        description:
            'A modern zakat calculator and payment platform. Built with CodeIgniter 4, Bootstrap, and MySQL.',
        url: 'https://bayarzakatonline.com',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=bayarzakatonline.com',
        screenshots: [
            '/projects/work/bayarzakat-1.png',
            '/projects/work/bayarzakat-2.png',
        ],
    },
    {
        title: 'Lanai Anggun Website',
        description:
            'E-commerce-ready website for a modern event venue. Built with CodeIgniter 4, Bootstrap, and MySQL.',
        url: 'https://lanaianggun.com',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=lanaianggun.com',
        screenshots: [
            '/projects/work/lanaianggun-1.png',
            '/projects/work/lanaianggun-2.png',
        ],
    },
    {
        title: 'T.G.C Academy',
        description:
            'Insurance-oriented commerce website. Built with CodeIgniter 4, Bootstrap, and MySQL.',
        url: 'https://infotakaful.com',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=infotakaful.com',
        screenshots: ['/projects/work/tgcacademy.png'],
        discontinued: true,
    },
    {
        title: 'Urban Park Hall Website',
        description:
            'E-commerce-ready website for a modern event venue. Built with CodeIgniter 4, Bootstrap, and MySQL.',
        url: 'https://urbanparkhall.com',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=urbanparkhall.com',
        screenshots: ['/projects/work/urbanpark.png'],
        discontinued: true,
    },
    {
        title: 'Adawiyyah Khan',
        description:
            'Personal site for selling a Shopee affiliate course, with built-in payment and purchase features.',
        url: 'https://adawiyyahkhan.com',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=adawiyyahkhan.com',
        screenshots: ['/projects/work/adawiyyahkhan.png'],
    },
];
