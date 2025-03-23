import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientAnalytics from "@/components/ClientAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safarnama - Premium Travel Experiences",
  description: "Safarnama is your trusted travel partner offering exceptional tour packages, flight bookings, and visa services. Book your dream vacation today.",
  keywords: ["Safarnama", "Travel Agency", "travel agency", "tour packages", "flight booking", "visa services"],
  authors: [{ name: "Safarnama" }],
  creator: "Safarnama",
  publisher: "Safarnama",
  metadataBase: new URL("https://safarnama.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Safarnama - Premium Travel Experiences",
    description: "Safarnama is your trusted travel partner offering exceptional tour packages, flight bookings, and visa services. Book your dream vacation today.",
    url: "https://safarnama.vercel.app",
    siteName: "Safarnama",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://safarnama.vercel.app/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Safarnama - Your Trusted Travel Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safarnama - Premium Travel Experiences",
    description: "Safarnama is your trusted travel partner offering exceptional tour packages, flight bookings, and visa services.",
    images: ["https://safarnama.vercel.app/og-image.jpg"], // Same as OG image
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "verification_token", // Replace with your Google Search Console verification token
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Fredoka:wght@300..700&family=Frijole&family=Marcellus&family=Oswald:wght@200..700&family=Pacifico&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ClientAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
