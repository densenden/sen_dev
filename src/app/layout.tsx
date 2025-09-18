import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import StructuredData from "@/components/structured-data";
import { ThemeProvider } from "@/components/theme-provider";
import GTProviderWrapper from "@/components/gt-provider-wrapper";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import ConditionalLayout from "@/components/conditional-layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"], // Light and Regular only
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "SenDev™ - Where Vision Meets Velocity | Full-Package Development",
  description: "The designer's eye sees what others miss. Full-package delivery from idea to launch. No agencies, no translations, just pure execution. SenDev™ - proactive development for entrepreneurs.",
  keywords: "MVP development, startup development, React development, Next.js, AI integration, branding design, technical infrastructure, SenDev, designer engineer, startup growth, full package development",
  authors: [{ name: "SenDev" }],
  creator: "SenDev",
  publisher: "SenDev",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sencodev.com',
    title: 'SenDev™ - Where Vision Meets Velocity',
    description: 'The designer\'s eye sees what others miss. Full-package delivery from idea to launch. No agencies, no translations, just pure execution.',
    siteName: 'SenDev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SenDev™ - Where Vision Meets Velocity',
    description: 'The designer\'s eye sees what others miss. Full-package delivery from idea to launch. No agencies, no translations, just pure execution.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-light.svg" type="image/svg+xml" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <GoogleTagManager />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <GoogleTagManagerNoscript />
        <GTProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark', 'code']}
          >
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeProvider>
        </GTProviderWrapper>
      </body>
    </html>
  );
}
