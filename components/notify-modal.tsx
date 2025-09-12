"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Mail, Bell } from "lucide-react"

export function NotifyModal() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold rounded-lg border-glow">
          <Bell className="mr-2 h-5 w-5" />
          {"Notify Me"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-glow hologram-effect">
        <DialogHeader>
          <DialogTitle className="text-glow text-xl">{"Get Notified About AI Aura 2.0"}</DialogTitle>
        </DialogHeader>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {"Email Address"}
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-glow"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <Mail className="mr-2 h-4 w-4" />
              {"Subscribe for Updates"}
            </Button>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="text-glow text-lg mb-2">{"🚀 You're all set!"}</div>
            <p className="text-muted-foreground">
              {"We'll notify you when AI Aura 2.0 launches on September 26, 2025!"}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
