import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartPark – Real-Time Smart Parking Dashboard",
  description: "IoT-based Smart Parking Management & Real-Time Availability Visualization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-[#0B1020] text-white font-sans antialiased selection:bg-[#7655F5] selection:text-white">
        {children}
      </body>
    </html>
  );
}
