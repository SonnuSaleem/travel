import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientAnalytics from "@/components/ClientAnalytics";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Safarnama Travels - Premium Pakistan Tours & Packages",
  description: "Safarnama Travels is Pakistan's trusted travel agency offering exceptional tour packages to Hunza, Skardu, and other stunning destinations. Book your dream vacation today.",
  keywords: ["Pakistan travel", "Hunza valley tours", "Skardu packages", "Pakistan tourism", "Gilgit-Baltistan travel", "Northern Pakistan tours", "Safarnama Travels", "Shangrila Resort", "Deosai National Park"],
  authors: [{ name: "Safarnama" }],
  creator: "Safarnama",
  publisher: "Safarnama",
  metadataBase: new URL("https://www.safarnamatravels.fun"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Safarnama Travels - Premium Pakistan Tours & Packages",
    description: "Safarnama Travels is Pakistan's trusted travel agency offering exceptional tour packages to Hunza, Skardu, and other stunning destinations. Book your dream vacation today.",
    url: "https://www.safarnamatravels.fun",
    siteName: "Safarnama Travels",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Safarnama Travels - Explore Pakistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safarnama Travels - Premium Pakistan Tours & Packages",
    description: "Pakistan's trusted travel agency offering exceptional tour packages.",
    images: ["/images/og-image.jpg"],
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
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "google-site-verification": "google7b5ccef807913efb", // Replace with your Google Search Console verification code
  },
  verification: {
    google: "google7b5ccef807913efb", // Replace with your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Fredoka:wght@300..700&family=Frijole&family=Marcellus&family=Oswald:wght@200..700&family=Pacifico&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&family=Winky+Sans:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64x64.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="google7b5ccef807913efb" />
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
        <StructuredData />
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </head>
      
      <body className={`${inter.className} bg-white text-slate-800`}>
        <ClientAnalytics />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton phoneNumber="+923258894708" />
      </body>
    </html>
  );
}