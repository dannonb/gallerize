import { SiteModalProvider } from "@/providers/site-modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main className="w-full">
              <SiteModalProvider />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
