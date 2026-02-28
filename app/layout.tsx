import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '../components/Common/Footer';
import './globals.css';
import { siteMetadata } from '../data/site';
import { THEME } from '../data/theme';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata = siteMetadata;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                style={
                    {
                        '--accent-start': THEME.accentStart,
                        '--accent-end': THEME.accentEnd,
                        '--accent-text': THEME.accentText,
                        '--accent-border': THEME.accentBorder,
                    } as React.CSSProperties
                }
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors`}
            >
                <main className="flex-1 bg-[var(--background)]">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
