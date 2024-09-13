import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const firaCode = localFont({
  src: "./fonts/FiraCode.woff", 
  variable: "--font-fira-code",
  weight: "100 900",
});

console.log(firaCode)

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
        className={`${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
