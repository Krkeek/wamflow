import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import StoreProvider from "@/libs/redux/StoreProvider";
import {ConfirmDialogProvider} from "@/utils/contexts/ConfirmDialogContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wamflow",
  description: "Empower your team, visualize, design, and collaborate effortlessly, bridging the gap between concept and implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <React.StrictMode>
              <StoreProvider>
                  {children}
              </StoreProvider>
      </React.StrictMode>
      </body>
    </html>

  );
}
