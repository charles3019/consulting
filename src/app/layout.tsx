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
  title: "Ammayu Waktole | Infrastructure Engineer & DevOps Consultant",
  description:
    "Professional IT infrastructure engineering, cloud architecture, CI/CD DevOps automation, and Power Platform consulting services. Architecting reliable enterprise systems.",
  keywords: [
    "Ammayu Waktole",
    "Infrastructure Engineer",
    "DevOps Specialist",
    "Automation Consultant",
    "Cloud Architecture",
    "Linux Systems Administrator",
    "Power Apps",
    "Terraform",
    "Ansible",
    "AWS",
    "Azure",
  ],
  authors: [{ name: "Ammayu Waktole" }],
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

