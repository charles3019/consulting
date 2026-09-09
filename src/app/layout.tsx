import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = { themeColor: "#062452" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  title: "ConnectForge IT Services | IT Support, Networks, Websites & CCTV",
  description:
    "ConnectForge IT Services helps organisations build secure networks, modern websites, applications, structured cabling, CCTV, IT support and field engineering.",
  keywords: [
    "ConnectForge IT Services",
    "Network Engineering",
    "Web Development",
    "Network Installations", "CCTV Installation & Surveillance", "IT Support", "Field Engineering Services",
    "App Development",
    "Charles Agyemang",
    "Ammayu Waktole",
  ],
  authors: [{ name: "Charles Agyemang" }, { name: "Ammayu Waktole" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ConnectForge IT Services",
    title: "ConnectForge IT Services | Technology built for growth",
    description:
      "Secure networks, modern websites, intelligent automation, and custom apps for ambitious organisations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConnectForge IT Services",
    description:
      "Networks, web, automation, and apps—connected into one dependable technology partner.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-bg text-foreground overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        <MotionProvider>
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10 w-full overflow-x-clip">
          {children}
        </main>
        <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

