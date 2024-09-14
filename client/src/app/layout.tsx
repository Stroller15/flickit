import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const firaCode = localFont({
  src: "./fonts/FiraCode.woff",
  variable: "--font-fira-code",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Flickit",
  description: "A thumbnail comparison web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-slate-50",
          `${firaCode.variable} antialiased`
        )}
      >
        {children}
      </body>
    </html>
  );
}
