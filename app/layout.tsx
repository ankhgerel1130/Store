import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Roboto_Mono } from "next/font/google"; // Mono font
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";
import "./globals.css";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";

<link
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap"
  rel="stylesheet"
/>
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        <ModalProvider/>
        <ToastProvider/>
        <Navbar />
        {children}
        <Footer />

      </body>
    </html>
  );
}
