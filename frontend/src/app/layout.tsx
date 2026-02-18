import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider"; // Import your new provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShibBurn AMM",
  description: "Architecting the future of SHIB burns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}