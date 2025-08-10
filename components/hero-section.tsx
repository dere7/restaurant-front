"use client"

import type React from "react"

import { useState } from "react"
import { Search, Truck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeroSectionProps {
  onSearch: (term: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery")

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Are you starving?</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={activeTab === "delivery" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("delivery")}
                  className={`flex items-center gap-2 ${
                    activeTab === "delivery"
                      ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  Delivery
                </Button>
                <Button
                  variant={activeTab === "pickup" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("pickup")}
                  className={`flex items-center gap-2 ${
                    activeTab === "pickup"
                      ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Pickup
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="search-bar"
                    className="pl-10 pr-4 py-3 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    placeholder="What do you like to eat today?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Find Meal
                </Button>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/hero-ramen.png"
              alt="Delicious ramen bowl with egg and vegetables"
              className="w-full max-w-md mx-auto rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
