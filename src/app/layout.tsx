import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StructuredData from "@/components/structured-data";
import Navigation from "@/components/navigation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
