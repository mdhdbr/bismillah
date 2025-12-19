import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster"
import { GlobalContextMenu } from '@/components/global-context-menu';

export const metadata: Metadata = {
  title: 'MHB Logistics',
  description: 'Complete Fleet Management Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhpmA9dtkBogaczWINGjb2audocularoQeGs2ROL/M9A="
          crossOrigin=""/>
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
        )}
        suppressHydrationWarning
      >
        <GlobalContextMenu>
          <div vaul-drawer-wrapper="">
            {children}
          </div>
        </GlobalContextMenu>
        <Toaster />
      </body>
    </html>
  );
}
