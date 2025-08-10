"use client"

import { useState } from "react"
import { Star, MoreVertical, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EditFoodModal } from "@/components/edit-food-modal"
import { DeleteFoodModal } from "@/components/delete-food-modal"
import type { Food } from "@/app/page"

interface FoodCardProps {
  food: Food
  onUpdate: (id: string, data: Partial<Food>) => void
  onDelete: (id: string) => void
}

export function FoodCard({ food, onUpdate, onDelete }: FoodCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleEdit = () => {
    setIsEditModalOpen(true)
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    onDelete(food.id)
  }

  const handleUpdate = (updatedData: Partial<Food>) => {
    onUpdate(food.id, updatedData)
    setIsEditModalOpen(false)
  }

  return (
    <>
      <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={food.image || `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(food.name)}`}
            alt={food.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {/* If you want to show price, you need to add it to the new interface or remove this */}
          </div>
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={
                food.restaurant.logo ||
                `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(food.restaurant.name + " logo") || "/placeholder.svg"}`
              }
              alt={`${food.restaurant.name} logo`}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="restaurant-name font-semibold text-gray-900 text-lg">{food.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="restaurant-rating text-sm text-gray-600">{food.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="restaurant-name text-sm text-gray-600">{food.restaurant.name}</span>
            <span
              className={`restaurant-status px-3 py-1 rounded-full text-xs font-medium ${
                food.restaurant.status === "OPEN_NOW" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {food.restaurant.status === "OPEN_NOW" ? "Open" : "Closed"}
            </span>
          </div>
        </div>
      </article>

      <EditFoodModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        food={food}
      />

      <DeleteFoodModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        foodName={food.name}
      />
    </>
  )
}
