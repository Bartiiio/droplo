import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
         <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
               success: {
                  duration: 3000,
               },
               error: {
                  duration: 5000,
               },
            }}
         />
         <body className="max-w-[1208px] mx-auto rounded-md">{children}</body>
      </html>
   );
}
