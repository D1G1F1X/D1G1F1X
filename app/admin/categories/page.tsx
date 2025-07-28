"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

// Mock data for categories
const initialCategories = [
  { id: "1", name: "Oracle Cards", slug: "oracle-cards", count: 12 },
  { id: "2", name: "Numerology", slug: "numerology", count: 8 },
  { id: "3", name: "Readings", slug: "readings", count: 5 },
  { id: "4", name: "Spiritual Tools", slug: "spiritual-tools", count: 3 },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" })
  const [editCategory, setEditCategory] = useState<{ id: string; name: string; slug: string } | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleAddCategory = () => {
    if (!newCategory.name) return

    const slug = newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-")
    const newId = (categories.length + 1).toString()

    setCategories([...categories, { id: newId, name: newCategory.name, slug, count: 0 }])
    setNewCategory({ name: "", slug: "" })
    setIsAddDialogOpen(false)

    toast({
      title: "Category added",
      description: `${newCategory.name} has been added successfully.`,
    })
  }

  const handleEditCategory = () => {
    if (!editCategory) return

    setCategories(
      categories.map((cat) =>
        cat.id === editCategory.id
          ? {
              ...cat,
              name: editCategory.name,
              slug: editCategory.slug || editCategory.name.toLowerCase().replace(/\s+/g, "-"),
            }
          : cat,
      ),
    )

    setIsEditDialogOpen(false)

    toast({
      title: "Category updated",
      description: `${editCategory.name} has been updated successfully.`,
    })
  }

  const handleDeleteCategory = () => {
    if (!deleteId) return

    const categoryToDelete = categories.find((cat) => cat.id === deleteId)
    setCategories(categories.filter((cat) => cat.id !== deleteId))
    setDeleteId(null)

    toast({
      title: "Category deleted",
      description: `${categoryToDelete?.name} has been deleted successfully.`,
    })
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Manage product and content categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category for products or content.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (optional)</Label>
                <Input
                  id="slug"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  placeholder="category-slug"
                />
                <p className="text-xs text-muted-foreground">Leave empty to generate automatically from name</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 p-4 border-b font-medium">
          <div className="col-span-5">Name</div>
          <div className="col-span-4">Slug</div>
          <div className="col-span-1">Count</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="grid grid-cols-12 p-4 border-b items-center">
            <div className="col-span-5 font-medium">{category.name}</div>
            <div className="col-span-4 text-muted-foreground">{category.slug}</div>
            <div className="col-span-1">{category.count}</div>
            <div className="col-span-2 flex justify-end space-x-2">
              <Dialog
                open={isEditDialogOpen && editCategory?.id === category.id}
                onOpenChange={(open) => {
                  setIsEditDialogOpen(open)
                  if (!open) setEditCategory(null)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditCategory({ id: category.id, name: category.name, slug: category.slug })
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>Update category details</DialogDescription>
                  </DialogHeader>
                  {editCategory && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                          id="edit-name"
                          value={editCategory.name}
                          onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-slug">Slug</Label>
                        <Input
                          id="edit-slug"
                          value={editCategory.slug}
                          onChange={(e) => setEditCategory({ ...editCategory, slug: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditCategory}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(category.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{category.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteCategory}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
