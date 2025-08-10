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
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "Open Now" as "Open Now" | "Closed",
    price: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (food) {
      setFormData({
        food_name: food.food_name,
        food_rating: food.food_rating.toString(),
        food_image: food.food_image || "",
        restaurant_name: food.restaurant_name,
        restaurant_logo: food.restaurant_logo || "",
        restaurant_status: food.restaurant_status,
        price: food.price.toString(),
      })
    }
  }, [food])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food name is required"
    }

    if (
      !formData.food_rating ||
      isNaN(Number(formData.food_rating)) ||
      Number(formData.food_rating) < 0 ||
      Number(formData.food_rating) > 5
    ) {
      newErrors.food_rating = "Rating must be a number between 0 and 5"
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant name is required"
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        food_name: formData.food_name.trim(),
        food_rating: Number(formData.food_rating),
        food_image: formData.food_image.trim(),
        restaurant_name: formData.restaurant_name.trim(),
        restaurant_logo: formData.restaurant_logo.trim(),
        restaurant_status: formData.restaurant_status,
        price: Number(formData.price),
      })

      setErrors({})
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Food</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit_food_name">Food Name *</Label>
            <Input
              id="edit_food_name"
              name="food_name"
              placeholder="Enter food name"
              value={formData.food_name}
              onChange={(e) => handleChange("food_name", e.target.value)}
              className={errors.food_name ? "border-red-500" : ""}
            />
            {errors.food_name && <p className="text-red-500 text-sm mt-1">{errors.food_name}</p>}
          </div>

          <div>
            <Label htmlFor="edit_food_rating">Food Rating *</Label>
            <Input
              id="edit_food_rating"
              name="food_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Enter rating (0-5)"
              value={formData.food_rating}
              onChange={(e) => handleChange("food_rating", e.target.value)}
              className={errors.food_rating ? "border-red-500" : ""}
            />
            {errors.food_rating && <p className="text-red-500 text-sm mt-1">{errors.food_rating}</p>}
          </div>

          <div>
            <Label htmlFor="edit_food_image">Food Image URL</Label>
            <Input
              id="edit_food_image"
              name="food_image"
              placeholder="Enter image URL"
              value={formData.food_image}
              onChange={(e) => handleChange("food_image", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit_restaurant_name">Restaurant Name *</Label>
            <Input
              id="edit_restaurant_name"
              name="restaurant_name"
              placeholder="Enter restaurant name"
              value={formData.restaurant_name}
              onChange={(e) => handleChange("restaurant_name", e.target.value)}
              className={errors.restaurant_name ? "border-red-500" : ""}
            />
            {errors.restaurant_name && <p className="text-red-500 text-sm mt-1">{errors.restaurant_name}</p>}
          </div>

          <div>
            <Label htmlFor="edit_restaurant_logo">Restaurant Logo URL</Label>
            <Input
              id="edit_restaurant_logo"
              name="restaurant_logo"
              placeholder="Enter logo URL"
              value={formData.restaurant_logo}
              onChange={(e) => handleChange("restaurant_logo", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="edit_restaurant_status">Restaurant Status</Label>
            <Select
              name="restaurant_status"
              value={formData.restaurant_status}
              onValueChange={(value: "Open Now" | "Closed") => handleChange("restaurant_status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit_price">Price *</Label>
            <Input
              id="edit_price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter price"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
              Save
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
