import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jakebknowles.com"),
  title: {
    default: "Jakeb Knowles | Brisbane Software Engineer and Product-Focused Builder",
    template: "%s | Jakeb Knowles",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
  description:
    "Brisbane, Australia software engineer building end-to-end products across web, mobile, APIs, AI-assisted workflows, and platform modernisation.",
  applicationName: "Jakeb Knowles",
  keywords: [
    "Jakeb Knowles",
    "Jakeb Knowles software engineer",
    "Jakeb Knowles software developer",
    "Jakeb Knowles portfolio",
    "Brisbane software engineer",
    "Brisbane software developer",
    "software engineer Brisbane",
    "software developer Brisbane",
    "Brisbane full stack developer",
    "Brisbane app developer",
    "Brisbane mobile app developer",
    "Brisbane product engineer",
    "Australian software engineer",
    "Brisbane React developer",
    "Brisbane React Native developer",
    "Brisbane Laravel developer",
    "AI product engineer Australia",
    "product-focused software engineer",
  ],
  authors: [{ name: "Jakeb Knowles", url: "https://jakebknowles.com" }],
  creator: "Jakeb Knowles",
  publisher: "Jakeb Knowles",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jakeb Knowles | Brisbane Software Engineer and Product-Focused Builder",
    description:
      "Brisbane, Australia software engineer building end-to-end products across web, mobile, APIs, AI-assisted workflows, and platform modernisation.",
    url: "https://jakebknowles.com",
    siteName: "Jakeb Knowles",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Jakeb Knowles | Brisbane Software Engineer and Product-Focused Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jakeb Knowles | Brisbane Software Engineer and Product-Focused Builder",
    description:
      "Brisbane, Australia software engineer building end-to-end products across web, mobile, APIs, AI-assisted workflows, and platform modernisation.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "AU-QLD",
    "geo.placename": "Brisbane",
    "geo.position": "-27.4698;153.0251",
    ICBM: "-27.4698, 153.0251",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${spaceGrotesk.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
