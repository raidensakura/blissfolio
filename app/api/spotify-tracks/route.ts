import { NextResponse } from 'next/server';

interface SpotifyTrackMeta {
    artist: string;
    coverArtUrl: string;
    title: string;
    url: string;
}

function decodeHtmlEntities(value: string) {
    return value
        .replace(/&#x27;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

function extractMetaTag(html: string, property: string) {
    const pattern = new RegExp(
        `<meta[^>]+(?:property|name)="${property}"[^>]+content="([^"]*)"`,
        'i'
    );

    return html.match(pattern)?.[1] ?? '';
}

function parseOEmbedTitle(title: string) {
    const cleaned = decodeHtmlEntities(title).replace(/\s+\|\s+Spotify$/, '');
    const [trackTitle, artistPart] = cleaned.split(' - song and lyrics by ');

    return {
        title: trackTitle?.trim() || 'Spotify Track',
        artist: artistPart?.trim() || 'Open in Spotify',
    };
}

async function fetchTrackMetaFromOEmbed(url: string): Promise<SpotifyTrackMeta> {
    const endpoint = `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
    const response = await fetch(endpoint, {
        next: { revalidate: 60 * 60 * 12 },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch Spotify oEmbed: ${response.status}`);
    }

    const data = (await response.json()) as {
        thumbnail_url?: string;
        title?: string;
    };
    const parsed = parseOEmbedTitle(data.title ?? '');

    return {
        url,
        title: parsed.title,
        artist: parsed.artist,
        coverArtUrl: data.thumbnail_url ?? '',
    };
}

async function fetchTrackMeta(url: string): Promise<SpotifyTrackMeta> {
    try {
        return await fetchTrackMetaFromOEmbed(url);
    } catch {
        const response = await fetch(url, {
            next: { revalidate: 60 * 60 * 12 },
            headers: {
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Spotify track: ${response.status}`);
        }

        const html = await response.text();
        const title = decodeHtmlEntities(extractMetaTag(html, 'og:title'));
        const artist = decodeHtmlEntities(
            extractMetaTag(html, 'music:musician_description')
        );
        const coverArtUrl = extractMetaTag(html, 'og:image');

        return {
            url,
            title: title || 'Spotify Track',
            artist: artist || 'Open in Spotify',
            coverArtUrl,
        };
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const urls = searchParams.getAll('url').filter(Boolean);

    if (urls.length === 0) {
        return NextResponse.json(
            { error: 'At least one Spotify track URL is required.' },
            { status: 400 }
        );
    }

    const tracks = await Promise.all(
        urls.map(async (url) => {
            try {
                return await fetchTrackMeta(url);
            } catch {
                return {
                    url,
                    title: 'Spotify Track',
                    artist: 'Open in Spotify',
                    coverArtUrl: '',
                };
            }
        })
    );

    return NextResponse.json({ tracks });
}
