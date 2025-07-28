"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { Plus, Trash2 } from "lucide-react"

interface CardEditorProps {
  cards: any[]
  onChange: (cards: any[]) => void
  isLoading?: boolean
}

export function CardEditor({ cards, onChange, isLoading = false }: CardEditorProps) {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(cards.length > 0 ? 0 : null)

  const handleCardChange = (index: number, updatedCard: any) => {
    const newCards = [...cards]
    newCards[index] = updatedCard
    onChange(newCards)
  }

  const addNewCard = () => {
    // Create a template for a new card
    const newCard = {
      id: `card-${Date.now()}`,
      name: "New Card",
      element: "fire",
      number: cards.length + 1,
      description: "Description of the new card",
      firstEnd: {
        name: "First End",
        description: "Description of the first end",
        keywords: ["keyword1", "keyword2"],
        imagePath: "/cards/placeholder.jpg",
      },
      secondEnd: {
        name: "Second End",
        description: "Description of the second end",
        keywords: ["keyword1", "keyword2"],
        imagePath: "/cards/placeholder.jpg",
      },
    }

    const newCards = [...cards, newCard]
    onChange(newCards)
    setSelectedCardIndex(newCards.length - 1)
  }

  const deleteCard = (index: number) => {
    const newCards = [...cards]
    newCards.splice(index, 1)
    onChange(newCards)

    if (selectedCardIndex === index) {
      setSelectedCardIndex(newCards.length > 0 ? 0 : null)
    } else if (selectedCardIndex !== null && selectedCardIndex > index) {
      setSelectedCardIndex(selectedCardIndex - 1)
    }
  }

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-1 border rounded-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-medium">Cards ({cards.length})</h3>
          <Button size="sm" onClick={addNewCard}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
        <ScrollArea className="h-[540px]">
          <div className="p-2 space-y-1">
            {cards.map((card, index) => (
              <div
                key={card.id || index}
                className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${
                  selectedCardIndex === index ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCardIndex(index)}
              >
                <div className="truncate">
                  {card.number || index + 1}. {card.name || "Unnamed Card"}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-50 hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Card</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this card? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteCard(index)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {cards.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No cards found. Click "Add" to create a new card.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      <div className="md:col-span-3">
        {selectedCardIndex !== null && cards[selectedCardIndex] ? (
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="basic">
                <TabsList className="mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="firstEnd">First End</TabsTrigger>
                  <TabsTrigger value="secondEnd">Second End</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Card Name</Label>
                        <Input
                          id="name"
                          value={cards[selectedCardIndex].name || ""}
                          onChange={(e) => {
                            const updatedCard = {
                              ...cards[selectedCardIndex],
                              name: e.target.value,
                            }
                            handleCardChange(selectedCardIndex, updatedCard)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="number">Card Number</Label>
                        <Input
                          id="number"
                          type="number"
                          value={cards[selectedCardIndex].number || ""}
                          onChange={(e) => {
                            const updatedCard = {
                              ...cards[selectedCardIndex],
                              number: Number.parseInt(e.target.value) || 0,
                            }
                            handleCardChange(selectedCardIndex, updatedCard)
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="element">Element</Label>
                      <Input
                        id="element"
                        value={cards[selectedCardIndex].element || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            element: e.target.value,
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        value={cards[selectedCardIndex].description || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            description: e.target.value,
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="firstEnd">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstEndName">Name</Label>
                      <Input
                        id="firstEndName"
                        value={cards[selectedCardIndex].firstEnd?.name || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            firstEnd: {
                              ...cards[selectedCardIndex].firstEnd,
                              name: e.target.value,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstEndDescription">Description</Label>
                      <textarea
                        id="firstEndDescription"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        value={cards[selectedCardIndex].firstEnd?.description || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            firstEnd: {
                              ...cards[selectedCardIndex].firstEnd,
                              description: e.target.value,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="firstEndKeywords">Keywords (comma separated)</Label>
                      <Input
                        id="firstEndKeywords"
                        value={(cards[selectedCardIndex].firstEnd?.keywords || []).join(", ")}
                        onChange={(e) => {
                          const keywords = e.target.value
                            .split(",")
                            .map((k) => k.trim())
                            .filter((k) => k)
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            firstEnd: {
                              ...cards[selectedCardIndex].firstEnd,
                              keywords,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="secondEnd">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="secondEndName">Name</Label>
                      <Input
                        id="secondEndName"
                        value={cards[selectedCardIndex].secondEnd?.name || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            secondEnd: {
                              ...cards[selectedCardIndex].secondEnd,
                              name: e.target.value,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondEndDescription">Description</Label>
                      <textarea
                        id="secondEndDescription"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        value={cards[selectedCardIndex].secondEnd?.description || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            secondEnd: {
                              ...cards[selectedCardIndex].secondEnd,
                              description: e.target.value,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondEndKeywords">Keywords (comma separated)</Label>
                      <Input
                        id="secondEndKeywords"
                        value={(cards[selectedCardIndex].secondEnd?.keywords || []).join(", ")}
                        onChange={(e) => {
                          const keywords = e.target.value
                            .split(",")
                            .map((k) => k.trim())
                            .filter((k) => k)
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            secondEnd: {
                              ...cards[selectedCardIndex].secondEnd,
                              keywords,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="images">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstEndImage">First End Image Path</Label>
                      <Input
                        id="firstEndImage"
                        value={cards[selectedCardIndex].firstEnd?.imagePath || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            firstEnd: {
                              ...cards[selectedCardIndex].firstEnd,
                              imagePath: e.target.value,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                      {cards[selectedCardIndex].firstEnd?.imagePath && (
                        <div className="mt-2 border rounded-md p-2">
                          <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                          <div className="relative aspect-[3/4] w-32 overflow-hidden rounded-md">
                            <img
                              src={cards[selectedCardIndex].firstEnd.imagePath || "/placeholder.svg"}
                              alt="First End Preview"
                              className="object-cover"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = "/abstract-geometric-card.png"
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondEndImage">Second End Image Path</Label>
                      <Input
                        id="secondEndImage"
                        value={cards[selectedCardIndex].secondEnd?.imagePath || ""}
                        onChange={(e) => {
                          const updatedCard = {
                            ...cards[selectedCardIndex],
                            secondEnd: {
                              ...cards[selectedCardIndex].secondEnd,
                              imagePath: e.target.value,
                            },
                          }
                          handleCardChange(selectedCardIndex, updatedCard)
                        }}
                      />
                      {cards[selectedCardIndex].secondEnd?.imagePath && (
                        <div className="mt-2 border rounded-md p-2">
                          <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
                          <div className="relative aspect-[3/4] w-32 overflow-hidden rounded-md">
                            <img
                              src={cards[selectedCardIndex].secondEnd.imagePath || "/placeholder.svg"}
                              alt="Second End Preview"
                              className="object-cover"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = "/abstract-geometric-card.png"
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                {cards.length === 0
                  ? "No cards available. Click 'Add' to create a new card."
                  : "Select a card from the list to edit its details."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
