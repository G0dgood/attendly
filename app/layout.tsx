import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import NewProvider from "./utils/provider";

// Load fonts
const lato = Lato({
  subsets: ["latin"],
  weight: ["400"], // you can add other weights like "700" if needed
});

export const metadata: Metadata = {
  title: "U-Connect ERP",
  description: "U-Connect is a Human Resource Consulting Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1.0, user-scalable=no, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body className={`${lato.className} antialiased`}>
        <NewProvider session={undefined}>
          {children}
        </NewProvider>
      </body>
    </html>
  );
}

