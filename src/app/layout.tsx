import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, Navbar, Footer, FavoritesProvider } from "@/components";
import ClientLayout from "@/components/ClientLayout";
import { siteConfig } from "@/data";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@travelbangladesh",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <ThemeProvider>
          <FavoritesProvider>
            <ClientLayout>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </ClientLayout>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
