import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MSME-Mitra - Your AI Compliance Assistant",
  description: "Instantly answer small business compliance questions (GST, export, tax filing) in Hindi-English for Indian MSMEs. Built for LUB Ideathon 2025.",
  keywords: "MSME, GST, compliance, AI, chatbot, India, tax, export, Hindi, English",
  authors: [{ name: "Team MSME-Mitra" }],
  openGraph: {
    title: "MSME-Mitra - AI Compliance Assistant",
    description: "Get instant answers to GST and compliance questions in Hindi & English",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: '#FAFAFA' }}>
      <body 
        className={`${inter.className} antialiased`}
        style={{ background: '#FAFAFA', color: '#212121' }}
      >
        {children}
      </body>
    </html>
  );
}
