import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lead Lifecycle Overview",
  description: "Manage lead lifecycle from Admin to FA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AppProvider>
          <Navbar />
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
