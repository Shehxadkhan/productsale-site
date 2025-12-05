import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "ProductSale - Your One Stop Shop",
  description: "Shop for sports shoes, mobiles, laptops, and accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <WhatsAppButton 
          phoneNumber="1234567890" 
          message="Hello! I'm interested in your products. Can you help me?"
        />
      </body>
    </html>
  );
}

