import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

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

export const metadata: Metadata = {
  title: "Factura Flow",
  description: "Factura Flow is a seamless platform for suppliers to upload invoices and for companies to manage, track, and update invoice statuses efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer 
          position="bottom-left" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          closeButton={false}
        />
      </body>
    </html>
  );
}
