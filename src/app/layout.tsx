import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "~/lib/trpc/provider";
import { ThemeProvider } from "~/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0d" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  ),
  title: "Draftboard",
  description: "A place to share ideas and work in progress.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Draftboard",
    description: "A place to share ideas and work in progress.",
    images: [{ url: "/OG.png", width: 1200, height: 630 }],
    type: "website",
    siteName: "Draftboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Draftboard",
    description: "A place to share ideas and work in progress.",
    images: ["/OG.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Draftboard",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>{children}</TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
