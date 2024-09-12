"use client";

import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/constants/navbar";
import { useState } from "react";
import { Sidebar } from "@/components/constants/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ThemeProvider } from "@/components/constants/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar onMenuClick={toggleSidebar} />
            <div className="flex flex-1">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetContent side="left" className="p-0 pt-6 w-[300px]">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <aside className="hidden md:block w-60 bg-background border-r">
                <Sidebar />
              </aside>
              <main className="flex-1 p-4">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
