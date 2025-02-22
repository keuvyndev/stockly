import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/sidebar";
import {Inter} from "next/font/google";

export const metadata: Metadata = {
  title: "STOCKLY",
  description: "More Control, more visibility, more proposal",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'auto',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <div className="flex gap-8 h-full">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
