import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Your modern online store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
         <Navbar />
        {children}
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}