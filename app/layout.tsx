import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import ModalProvider from '@/providers/ModalProvider';
import { ToastProvider } from '@/providers/ToastProvider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
    description: 'Admin Dashboard',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    {' '}
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ToastProvider />
                        <ModalProvider />
                        {children}{' '}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
