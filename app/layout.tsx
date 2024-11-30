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
         <body className="font-sans">
            <Toaster
               position="top-center"
               gutter={12}
               containerStyle={{ margin: "8px" }}
               toastOptions={{
                  success: {
                     duration: 1000,
                  },
                  error: {
                     duration: 2000,
                  },
               }}
            />
            {children}
         </body>
      </html>
   );
}
