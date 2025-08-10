"use client"

import { useState } from "react"
import { FoodCard } from "@/components/food-card"
import { Button } from "@/components/ui/button"
import type { Food } from "@/app/page"

interface FeaturedMealsProps {
  foods: Food[]
  loading: boolean
  onUpdateFood: (id: string, data: Partial<Food>) => void
  onDeleteFood: (id: string) => void
}

export function FeaturedMeals({ foods, loading, onUpdateFood, onDeleteFood }: FeaturedMealsProps) {
  const [visibleCount, setVisibleCount] = useState(8)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (foods.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Meals</h2>
          <div className="text-center py-12">
            <div className="empty-state-message text-gray-500 text-lg">No items available</div>
          </div>
        </div>
      </section>
    )
  }

  const visibleFoods = foods.slice(0, visibleCount)
  const hasMore = foods.length > visibleCount

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Featured Meals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {visibleFoods.map((food) => (
            <FoodCard key={food.id} food={food} onUpdate={onUpdateFood} onDelete={onDeleteFood} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center">
            <Button
              onClick={handleLoadMore}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium"
            >
              Load more →
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
