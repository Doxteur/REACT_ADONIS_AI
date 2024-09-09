'use client'

import { Button } from "@/components/ui/button"

export function PrettyButton() {
  return (
    <Button
      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      Click me!
    </Button>
  )
}