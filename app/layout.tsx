import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
   title: "Droplo",
   description: "Rekrutacja Droplo Bartosz Troń",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pl">
         <body className={``}>{children}</body>
      </html>
   );
}
