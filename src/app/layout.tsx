import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StructuredData from "@/components/structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sencodev - Fast-track MVPs with Vibe Coding™ | Designer-Engineer for Startups",
  description: "Fast-track MVPs and startup infrastructures with full-stack Vibe Coding™, integrated branding, and scalable tech setup – built by a designer-engineer for rapid growth. No WordPress limitations.",
  keywords: "MVP development, startup development, React development, Next.js, AI integration, branding design, technical infrastructure, Vibe Coding, designer engineer, startup growth",
  authors: [{ name: "sencodev" }],
  creator: "sencodev",
  publisher: "sencodev",
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
    title: 'sencodev - Fast-track MVPs with Vibe Coding™',
    description: 'Fast-track MVPs and startup infrastructures with full-stack Vibe Coding™, integrated branding, and scalable tech setup – built by a designer-engineer for rapid growth.',
    siteName: 'sencodev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sencodev - Fast-track MVPs with Vibe Coding™',
    description: 'Fast-track MVPs and startup infrastructures with full-stack Vibe Coding™, integrated branding, and scalable tech setup – built by a designer-engineer for rapid growth.',
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
        {children}
      </body>
    </html>
  );
}
