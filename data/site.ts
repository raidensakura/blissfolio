import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
    title: 'Raiden Sakura',
    description: 'My personal website built with Next.js.',
    metadataBase: new URL('https://raidensakura.netlify.app'),
    openGraph: {
        title: 'Raiden Sakura',
        description: 'My personal website built with Next.js.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Raiden Sakura',
        description: 'My personal website built with Next.js.',
    },
};
