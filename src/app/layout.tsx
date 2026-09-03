import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConnectForge Technologies Ltd | Networks, Web, Automation & Apps",
  description:
    "ConnectForge Technologies Ltd helps organisations build secure networks, modern websites, business automations, and custom applications.",
  keywords: [
    "ConnectForge Technologies Ltd",
    "Network Engineering",
    "Web Development",
    "Automation Consultant",
    "App Development",
    "Charles Agyemang",
    "Ammayu Waktole",
  ],
  authors: [{ name: "Charles Agyemang" }, { name: "Ammayu Waktole" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "ConnectForge Technologies Ltd",
    title: "ConnectForge Technologies Ltd | Technology built for growth",
    description:
      "Secure networks, modern websites, intelligent automation, and custom apps for ambitious organisations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConnectForge Technologies Ltd",
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
        <Navbar />
        <main className="flex-grow flex flex-col relative z-10 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

