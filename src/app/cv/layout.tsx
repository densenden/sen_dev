import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denis Kreuzer - CV | Creative Director & Full-Stack Developer",
  description: "Professional CV of Denis Kreuzer - 15+ years experience in creative direction and full-stack development, specializing in rapid MVP development and startup tech partnerships.",
  keywords: "Denis Kreuzer, CV, resume, creative director, full-stack developer, MVP development, startup development, React, Next.js, AI integration",
  robots: {
    index: false, // CV should not be indexed by search engines
    follow: false,
  },
};

export default function CVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}