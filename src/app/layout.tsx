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
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Safarnama Travels Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safarnama Travels - Premium Pakistan Tours & Packages",
    description: "Pakistan's trusted travel agency offering exceptional tour packages.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
    other: {
      rel: "apple-touch-icon",
      url: "/images/logo.png",
    },
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
    "google-site-verification": "eHc5qU43lNhkEV0OpAlyfOlMzBsEYQ0RqlwdgMg2ykQ",
  },
  verification: {
    google: "eHc5qU43lNhkEV0OpAlyfOlMzBsEYQ0RqlwdgMg2ykQ",
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
        <link rel="icon" href="/images/logo.png" />
        <link rel="shortcut icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta name="msapplication-TileImage" content="/images/logo.png" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="next-head-count" content="0" />
        <meta name="google-site-verification" content="eHc5qU43lNhkEV0OpAlyfOlMzBsEYQ0RqlwdgMg2ykQ" />
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