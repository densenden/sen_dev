import { Inter, Fira_Code } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import GTProviderWrapper from "@/components/gt-provider-wrapper";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
            <div className="min-h-screen bg-background">
              {children}
            </div>
          </ThemeProvider>
        </GTProviderWrapper>
      </body>
    </html>
  )
}