import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";



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
      <body className={cn("min-h-screen bg-slate-50")}>
        {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
