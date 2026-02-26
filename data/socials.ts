import {
    FaGithub,
    FaYoutube,
    FaSteam,
    FaSpotify,
    FaDiscord,
} from 'react-icons/fa';
import { SiMyanimelist } from 'react-icons/si';

export const socials = [
    {
        name: 'GitHub',
        value: 'Raiden',
        url: 'https://github.com/raidensakura',
        icon: FaGithub,
    },
    {
        name: 'YouTube',
        value: 'Raiden Sakura',
        url: 'https://www.youtube.com/@raidensakura',
        icon: FaYoutube,
    },
    {
        name: 'Steam',
        value: 'Raiden',
        url: 'https://steamcommunity.com/id/raidensakura/',
        icon: FaSteam,
    },
    {
        name: 'MyAnimeList',
        value: 'RaidenSakura',
        url: 'https://myanimelist.net/profile/RaidenSakura',
        icon: SiMyanimelist,
    },
    {
        name: 'Spotify',
        value: 'Raiden',
        url: 'https://open.spotify.com/user/1ar2lpk0vrl5ap8yitcdcwshn',
        icon: FaSpotify,
    },
    { name: 'Discord', value: 'raiden_sakura', url: '#', icon: FaDiscord },
];
