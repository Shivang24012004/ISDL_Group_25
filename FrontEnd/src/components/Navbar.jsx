import React from 'react'
import { Image } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
    <div className="flex h-14 items-center w-full justify-between">
      <div className="flex items-center gap-2 text-xl font-semibold">
        <Image className="h-6 w-6" />
        <span>Image SaaS</span>
      </div>
      
      

      <div className="flex items-center gap-2">
            <Link to="/login">
        <Button className="rounded-xl px-5" >
            Login</Button>
            </Link>
      </div>
    </div>
  </header>
  )
}