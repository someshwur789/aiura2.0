"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface ClientLayoutProps {
  children: React.ReactNode
}

function ClientLayoutContent({ children }: ClientLayoutProps) {
  const searchParams = useSearchParams()

  return <>{children}</>
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  )
}
