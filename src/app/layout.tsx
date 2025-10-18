import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import all available fonts for AI usage
import "../lib/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dalcio Cabeleireiro - 25 anos realçando sua beleza",
  description: "Especialista em penteados para noivas e tratamentos exclusivos para mulheres. 25 anos de experiência em Conceição de Aparecida.",
  keywords: "cabeleireiro, penteados, noivas, tratamentos capilares, Conceição de Aparecida, Dalcio",
  openGraph: {
    title: "Dalcio Cabeleireiro - 25 anos realçando sua beleza",
    description: "Especialista em penteados para noivas e tratamentos exclusivos para mulheres. 25 anos de experiência em Conceição de Aparecida.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dalcio Cabeleireiro - 25 anos realçando sua beleza",
    description: "Especialista em penteados para noivas e tratamentos exclusivos para mulheres. 25 anos de experiência em Conceição de Aparecida.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}