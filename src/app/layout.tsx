import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import { SiteDataProvider } from "@/context/SiteDataContext";

export const metadata: Metadata = {
  title: {
    default: "Intravent - Global Tech Company",
    template: "%s | Intravent",
  },
  description:
    "Intravent delivers end-to-end solutions in technology, talent, design, energy, consulting, and software, helping businesses scale, innovate, and future-proof operations with world-class talent and cutting-edge technology.",
  keywords: [
    "technology",
    "talent",
    "design",
    "energy",
    "consulting",
    "software",
    "Intravent",
    "digital solutions",
    "Africa tech",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Intravent",
    title: "Intravent - Global Tech Company",
    description:
      "Delivering end-to-end solutions in technology, talent, design, energy, consulting, and software.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900,401,701&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <SiteDataProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <NewsletterSection />
          <Footer />
        </SiteDataProvider>
      </body>
    </html>
  );
}
