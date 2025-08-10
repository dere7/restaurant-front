"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Food } from "@/app/page"

interface EditFoodModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<Food>) => void
  food: Food
}

export function EditFoodModal({ isOpen, onClose, onSubmit, food }: EditFoodModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    image: "",
    restaurant: {
      id: "",
      name: "",
      logo: "",
      status: "OPEN_NOW" as "OPEN_NOW" | "CLOSED",
    },
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (food) {
      setFormData({
        name: food.name,
        rating: food.rating.toString(),
        image: food.image || "",
        restaurant: {
          id: food.restaurant.id,
          name: food.restaurant.name,
          logo: food.restaurant.logo || "",
          status: food.restaurant.status,
        },
      })
    }
  }, [food])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Food name is required"
    }

    if (!formData.rating || isNaN(Number(formData.rating)) || Number(formData.rating) < 0 || Number(formData.rating) > 5) {
      newErrors.rating = "Rating must be a number between 0 and 5"
    }

    if (!formData.restaurant.name.trim()) {
      newErrors.restaurantName = "Restaurant name is required"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        name: formData.name.trim(),
        rating: Number(formData.rating),
        image: formData.image.trim(),
        restaurant: {
          id: food.restaurant.id,
          name: formData.restaurant.name.trim(),
          logo: formData.restaurant.logo.trim(),
          status: formData.restaurant.status,
        },
      })

      setErrors({})
    }
  }

  const handleChange = (
    field: keyof typeof formData,
    value: string,
    nestedField?: keyof typeof formData.restaurant
  ) => {
    if (nestedField && field === "restaurant") {
      setFormData((prev) => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          [nestedField]: value,
        },
      }))
      if (errors[nestedField as string]) {
        setErrors((prev) => ({ ...prev, [nestedField as string]: "" }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field as string]) {
        setErrors((prev) => ({ ...prev, [field as string]: "" }))
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-8">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-orange-500">Edit Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-600 text-sm mb-2 block">
              Food name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`bg-gray-100 border-0 h-12 rounded-lg ${errors.name ? "border border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="rating" className="text-gray-600 text-sm mb-2 block">
              Food rating
            </Label>
            <Input
              id="rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
              className={`bg-gray-100 border-0 h-12 rounded-lg ${errors.rating ? "border border-red-500" : ""}`}
            />
            {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
          </div>

          <div>
            <Label htmlFor="image" className="text-gray-600 text-sm mb-2 block">
              Food image (link)
            </Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="bg-gray-100 border-0 h-12 rounded-lg"
            />
          </div>

          <div>
            <Label htmlFor="restaurant_name" className="text-gray-600 text-sm mb-2 block">
              Restaurant name
            </Label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant.name}
              onChange={(e) => handleChange("restaurant", e.target.value, "name")}
              className={`bg-gray-100 border-0 h-12 rounded-lg ${errors.restaurantName ? "border border-red-500" : ""}`}
            />
            {errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>}
          </div>

          <div>
            <Label htmlFor="restaurant_logo" className="text-gray-600 text-sm mb-2 block">
              Restaurant logo (link)
            </Label>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              value={formData.restaurant.logo}
              onChange={(e) => handleChange("restaurant", e.target.value, "logo")}
              className="bg-gray-100 border-0 h-12 rounded-lg"
            />
          </div>

          <div>
            <Label htmlFor="edit_restaurant_status" className="text-gray-600 text-sm mb-2 block">
              Restaurant status (open/close)
            </Label>
            <Select
              name="restaurant_status"
              value={formData.restaurant.status}
              onValueChange={(value: "OPEN_NOW" | "CLOSED") => handleChange("restaurant", value, "status")}
            >
              <SelectTrigger className="bg-gray-100 border-0 h-12 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OPEN_NOW">Open Now</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 h-12 rounded-lg font-medium"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
