"use client"

import { Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddMeal: () => void
}

export function Header({ onAddMeal }: HeaderProps) {
  return (
    <header className="bg-white px-4 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">FoodWagen</span>
        </div>

        <Button
          onClick={onAddMeal}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          Add Meal
        </Button>
      </div>
    </header>
  )
}
