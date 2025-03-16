import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientAnalytics from "@/components/ClientAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phool Nagar Travels - Best Travel Agency in Phool Nagar",
  description: "Phool Nagar Travels is your trusted travel agency offering affordable tour packages, flight bookings, and visa services. Book your dream vacation with the best travel agency in Phool Nagar.",
  keywords: ["Phool Nagar Travels", "Phool Nagar Travel Agency", "travel agency", "tour packages", "flight booking", "visa services", "Phool Nagar"],
  authors: [{ name: "Phool Nagar Travels" }],
  creator: "Phool Nagar Travels",
  publisher: "Phool Nagar Travels",
  metadataBase: new URL("https://phoolnagar-travels.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phool Nagar Travels - Best Travel Agency in Phool Nagar",
    description: "Phool Nagar Travels is your trusted travel agency offering affordable tour packages, flight bookings, and visa services. Book your dream vacation with the best travel agency in Phool Nagar.",
    url: "https://phoolnagar-travels.vercel.app",
    siteName: "Phool Nagar Travels",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://phoolnagar-travels.vercel.app/og-image.jpg", // You'll need to create this image
        width: 1200,
        height: 630,
        alt: "Phool Nagar Travels - Your Trusted Travel Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phool Nagar Travels - Best Travel Agency in Phool Nagar",
    description: "Phool Nagar Travels is your trusted travel agency offering affordable tour packages, flight bookings, and visa services.",
    images: ["https://phoolnagar-travels.vercel.app/og-image.jpg"], // Same as OG image
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
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
