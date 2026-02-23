<img src="https://github.com/raidensakura/blissfolio/blob/master/public/icon.png" alt="Alt Text" width="300" align="center">

See the demo [here](https://raidensakura.netlify.app/).

# Blissfolio [![Netlify Status](https://api.netlify.com/api/v1/badges/5fa3e86a-ce6f-45cc-9f99-c7f9646cfba6/deploy-status)](https://app.netlify.com/projects/raidensakura/deploys)

A modern personal website built with Next.js 14, featuring:

- Discord rich presence display and Spotify now playing status\*
- GitHub stats and activity display
- Easy accent color customization
- Clean, lightweight and mobile responsive UI

\*Spotify integration must be enabled in Discord to work

## Dynamic Features

- Discord rich presence (via [Lanyard API](https://lanyard.rest/))  
  Live Discord status display with game activity detection and platform indicator (Desktop / Mobile / Web)
- Spotify playback display (via [Lanyard API](https://lanyard.rest/))  
  Displays album artwork, now playing information with live progress bar.
- GitHub stats display (relies on [Github Chart API](https://ghchart.rshah.org/))  
  Displays GitHub recent activity and contributions chart.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Disclaimer

Discord and Spotify status feature relies on a third party API, [lanyard.rest](https://github.com/Phineas/lanyard).

GitHub activity display relies on a third party [Github Chart API](https://github.com/2016rshah/githubchart-api).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Feel free to edit the assets in `public` folder and config in `data` folder as you see fit.

## Credits

This project is inspired by [Thusuzzee's website](https://z1.gg/).
