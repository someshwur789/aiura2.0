import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ClientLayout } from "@/components/client-layout"
import { AutoMusic } from "@/components/auto-music"
import { Suspense } from "react"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "AI Aura 2.0 - Coming Soon | S.A. Engineering College",
  description: "National Level Technical Symposium - Exploring the Frontiers of AI & Data Science. September 26, 2025",
  generator: "v0.app",
  keywords: ["AI", "Data Science", "Symposium", "Technical", "S.A. Engineering College", "AI Aura"],
  authors: [{ name: "Department of AI & DS, S.A. Engineering College" }],
  openGraph: {
    title: "AI Aura 2.0 - Coming Soon",
    description: "National Level Technical Symposium - Exploring the Frontiers of AI & Data Science",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${montserrat.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientLayout>{children}</ClientLayout>
          <AutoMusic />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
