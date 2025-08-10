"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedMeals } from "@/components/featured-meals"
import { Footer } from "@/components/footer"
import { AddFoodModal } from "@/components/add-food-modal"

export interface Food {
  id: string
  food_name: string
  food_rating: number
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: "Open Now" | "Closed"
  price: number
}

export default function HomePage() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchFoods = async (search?: string) => {
    try {
      setLoading(true)
      const url = search ? `/api/v1/foods?name=${encodeURIComponent(search)}` : "/api/v1/foods"

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setFoods(data)
      }
    } catch (error) {
      console.error("Error fetching foods:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    fetchFoods(term)
  }

  const handleAddFood = async (foodData: Omit<Food, "id">) => {
    try {
      const response = await fetch("/api/v1/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      })

      if (response.ok) {
        fetchFoods(searchTerm)
        setIsAddModalOpen(false)
      }
    } catch (error) {
      console.error("Error adding food:", error)
    }
  }

  const handleUpdateFood = async (id: string, foodData: Partial<Food>) => {
    try {
      const response = await fetch(`/api/v1/foods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      })

      if (response.ok) {
        fetchFoods(searchTerm)
      }
    } catch (error) {
      console.error("Error updating food:", error)
    }
  }

  const handleDeleteFood = async (id: string) => {
    try {
      const response = await fetch(`/api/v1/foods/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchFoods(searchTerm)
      }
    } catch (error) {
      console.error("Error deleting food:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onAddMeal={() => setIsAddModalOpen(true)} />
      <main>
        <HeroSection onSearch={handleSearch} />
        <FeaturedMeals
          foods={foods}
          loading={loading}
          onUpdateFood={handleUpdateFood}
          onDeleteFood={handleDeleteFood}
        />
      </main>
      <Footer />
      <AddFoodModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddFood} />
    </div>
  )
}
