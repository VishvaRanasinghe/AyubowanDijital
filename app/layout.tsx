import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const display = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ayubowandijital.com"),
  title: "AyubowanDiJital — Technology & Professional Solutions",
  description:
    "From academic support and research to modern technology, data, and business solutions. We deliver the precise expertise you need to scale and succeed.",
  openGraph: {
    title: "AyubowanDiJital",
    description: "Technology & Professional Solutions",
    url: "https://www.ayubowandijital.com",
    siteName: "AyubowanDiJital",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "AyubowanDiJital Logo",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AyubowanDiJital",
    description: "Technology & Professional Solutions",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
