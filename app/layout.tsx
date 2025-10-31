import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NewProvider from "./utils/provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { Toaster } from "sonner";

// Load Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"], // Add other weights like "500", "700" if needed
});

export const metadata: Metadata = {
  title: "Attendly",
  description: "Attendence Management System",

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    // Handle JWT decryption errors - invalidate session if secret changed
    console.error("Session error:", error);
    session = null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, maximum-scale=1.0, user-scalable=no, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Toaster richColors />
        <NewProvider session={session}>
          {children}
        </NewProvider>
      </body>
    </html>
  );
}
