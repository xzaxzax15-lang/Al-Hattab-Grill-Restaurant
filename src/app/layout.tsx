import type { Metadata } from "next";
import './globals.css'
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "مطعم شواية الحطاب | أشهى الأكلات الجنوبية",
  description: "استمتع بأشهى الأكلات الجنوبية الأصيلة في جازان. فطور، غداء، حلويات، ومشروبات. جودة الطعم سر تميزنا.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="bg-[#0F0F0F] text-white antialiased selection:bg-[#D97706] ">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

