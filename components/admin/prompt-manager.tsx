"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Sparkles, Plus, Pencil, Trash2, Copy } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Mock prompt data
const initialPrompts = [
  {
    id: "1",
    name: "Single Card Reading",
    description: "Prompt for generating a single card reading",
    content:
      "You are a mystical oracle reader with deep knowledge of numerology and symbolism. Interpret this single card: {{card}} for the querent who asked: {{question}}. Provide a detailed reading that includes the card's meaning, numerological significance, and advice.",
    category: "readings",
    variables: ["card", "question"],
  },
  {
    id: "2",
    name: "Three Card Spread",
    description: "Prompt for generating a three card spread reading",
    content:
      "You are a mystical oracle reader with deep knowledge of numerology and symbolism. Interpret these three cards: {{card1}} (past), {{card2}} (present), and {{card3}} (future) for the querent who asked: {{question}}. Provide a detailed reading that connects all three cards into a cohesive narrative.",
    category: "readings",
    variables: ["card1", "card2", "card3", "question"],
  },
  {
    id: "3",
    name: "Numerology Profile",
    description: "Prompt for generating a numerology profile",
    content:
      "You are a numerology expert. Create a detailed numerology profile for {{name}} born on {{birthdate}}. Include their life path number, destiny number, and personality number. Explain what each number means for their life journey.",
    category: "numerology",
    variables: ["name", "birthdate"],
  },
]

export default function PromptManager() {
  const [prompts, setPrompts] = useState(initialPrompts)
  const [activeTab, setActiveTab] = useState("all")
  const [editingPrompt, setEditingPrompt] = useState<(typeof initialPrompts)[0] | null>(null)
  const [newPrompt, setNewPrompt] = useState({
    name: "",
    description: "",
    content: "",
    category: "readings",
    variables: [] as string[],
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletePromptId, setDeletePromptId] = useState<string | null>(null)
  const [newVariable, setNewVariable] = useState("")

  const filteredPrompts = activeTab === "all" ? prompts : prompts.filter((prompt) => prompt.category === activeTab)

  const handleAddPrompt = () => {
    if (!newPrompt.name || !newPrompt.content) {
      toast({
        title: "Missing information",
        description: "Please provide a name and content for the prompt.",
        variant: "destructive",
      })
      return
    }

    const id = `new-${Date.now()}`
    setPrompts([...prompts, { ...newPrompt, id }])
    setNewPrompt({
      name: "",
      description: "",
      content: "",
      category: "readings",
      variables: [],
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Prompt added",
      description: `"${newPrompt.name}" has been added successfully.`,
    })
  }

  const handleUpdatePrompt = () => {
    if (!editingPrompt) return

    setPrompts(prompts.map((p) => (p.id === editingPrompt.id ? editingPrompt : p)))
    setIsEditDialogOpen(false)

    toast({
      title: "Prompt updated",
      description: `"${editingPrompt.name}" has been updated successfully.`,
    })
  }

  const handleDeletePrompt = () => {
    if (!deletePromptId) return

    const promptToDelete = prompts.find((p) => p.id === deletePromptId)
    setPrompts(prompts.filter((p) => p.id !== deletePromptId))
    setDeletePromptId(null)

    toast({
      title: "Prompt deleted",
      description: `"${promptToDelete?.name}" has been deleted successfully.`,
    })
  }

  const handleAddVariable = () => {
    if (!newVariable) return

    if (editingPrompt) {
      setEditingPrompt({
        ...editingPrompt,
        variables: [...editingPrompt.variables, newVariable],
      })
    } else {
      setNewPrompt({
        ...newPrompt,
        variables: [...newPrompt.variables, newVariable],
      })
    }

    setNewVariable("")
  }

  const handleRemoveVariable = (variable: string) => {
    if (editingPrompt) {
      setEditingPrompt({
        ...editingPrompt,
        variables: editingPrompt.variables.filter((v) => v !== variable),
      })
    } else {
      setNewPrompt({
        ...newPrompt,
        variables: newPrompt.variables.filter((v) => v !== variable),
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Prompt Manager</h1>
          <p className="text-muted-foreground">Manage prompts for AI-generated content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Prompt</DialogTitle>
              <DialogDescription>Create a new prompt template for AI-generated content.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPrompt.name}
                  onChange={(e) => setNewPrompt({ ...newPrompt, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newPrompt.description}
                  onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <select
                  id="category"
                  value={newPrompt.category}
                  onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="readings">Readings</option>
                  <option value="numerology">Numerology</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  value={newPrompt.content}
                  onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                  className="col-span-3"
                  rows={6}
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <Label className="text-right">Variables</Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      value={newVariable}
                      onChange={(e) => setNewVariable(e.target.value)}
                      placeholder="Add variable (e.g. 'name')"
                    />
                    <Button type="button" onClick={handleAddVariable} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newPrompt.variables.map((variable) => (
                      <div key={variable} className="flex items-center bg-muted rounded-full px-3 py-1 text-sm">
                        <span className="mr-1">{variable}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveVariable(variable)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPrompt}>Create Prompt</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Prompts</TabsTrigger>
          <TabsTrigger value="readings">Readings</TabsTrigger>
          <TabsTrigger value="numerology">Numerology</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{prompt.name}</CardTitle>
                  <CardDescription>{prompt.description}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(prompt.content)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Dialog
                    open={isEditDialogOpen && editingPrompt?.id === prompt.id}
                    onOpenChange={(open) => {
                      setIsEditDialogOpen(open)
                      if (!open) setEditingPrompt(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingPrompt(prompt)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Prompt</DialogTitle>
                        <DialogDescription>Make changes to the prompt template.</DialogDescription>
                      </DialogHeader>
                      {editingPrompt && (
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="edit-name"
                              value={editingPrompt.name}
                              onChange={(e) => setEditingPrompt({ ...editingPrompt, name: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-description" className="text-right">
                              Description
                            </Label>
                            <Input
                              id="edit-description"
                              value={editingPrompt.description}
                              onChange={(e) => setEditingPrompt({ ...editingPrompt, description: e.target.value })}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-category" className="text-right">
                              Category
                            </Label>
                            <select
                              id="edit-category"
                              value={editingPrompt.category}
                              onChange={(e) => setEditingPrompt({ ...editingPrompt, category: e.target.value })}
                              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="readings">Readings</option>
                              <option value="numerology">Numerology</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <Label htmlFor="edit-content" className="text-right">
                              Content
                            </Label>
                            <Textarea
                              id="edit-content"
                              value={editingPrompt.content}
                              onChange={(e) => setEditingPrompt({ ...editingPrompt, content: e.target.value })}
                              className="col-span-3"
                              rows={6}
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <Label className="text-right">Variables</Label>
                            <div className="col-span-3 space-y-2">
                              <div className="flex gap-2">
                                <Input
                                  value={newVariable}
                                  onChange={(e) => setNewVariable(e.target.value)}
                                  placeholder="Add variable (e.g. 'name')"
                                />
                                <Button type="button" onClick={handleAddVariable} size="sm">
                                  Add
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {editingPrompt.variables.map((variable) => (
                                  <div
                                    key={variable}
                                    className="flex items-center bg-muted rounded-full px-3 py-1 text-sm"
                                  >
                                    <span className="mr-1">{variable}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveVariable(variable)}
                                      className="text-muted-foreground hover:text-foreground"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdatePrompt}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setDeletePromptId(prompt.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Prompt</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{prompt.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletePromptId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeletePrompt}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-3 rounded-md text-sm font-mono whitespace-pre-wrap">{prompt.content}</div>
              {prompt.variables.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Variables:</p>
                  <div className="flex flex-wrap gap-2">
                    {prompt.variables.map((variable) => (
                      <div key={variable} className="bg-muted rounded-full px-3 py-1 text-sm">
                        {variable}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No prompts found</h3>
          <p className="text-muted-foreground">Create a new prompt or change your filter to see results.</p>
        </div>
      )}
    </div>
  )
}
