import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { CartProvider } from "@/contexts/CartContext";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { UserSync } from "@/components/auth/UserSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sewai - E-commerce Premium",
  description: "O melhor em e-commerce moderno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={inter.className}>
          <CartProvider>
            <UserSync />
            <MainLayout>
              {children}
            </MainLayout>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
