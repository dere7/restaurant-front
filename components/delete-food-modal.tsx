"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface DeleteFoodModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  foodName?: string
}

export function DeleteFoodModal({ isOpen, onClose, onConfirm }: DeleteFoodModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl p-8">
        <DialogHeader className="text-center mb-6">
          <DialogTitle className="text-2xl font-bold text-orange-500">Delete Meal</DialogTitle>
        </DialogHeader>

        <div className="text-center mb-8">
          <p className="text-gray-600 text-base">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-lg font-medium"
          >
            Yes
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 h-12 rounded-lg font-medium"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
