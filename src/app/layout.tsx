
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import {StateProvider} from "@/libs/stateManager/StateProvider";
import ClientWrapper from "@/components/clientWrapper/clientWrapper";

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
      <ClientWrapper>
          {children}
      </ClientWrapper>
      </body>
    </html>

  );
}
