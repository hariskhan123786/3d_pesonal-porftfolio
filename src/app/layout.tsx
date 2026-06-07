import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Creative Developer & Designer | Portfolio",
  description: "A high-performance scrollytelling personal portfolio website showcasing creative design and front-end engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="font-sans antialiased bg-[#121212] text-[#f3f4f6] min-h-screen overflow-x-hidden selection:bg-white/10 selection:text-white">
        {children}
      </body>
    </html>
  );
}
