import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const userData = await request.json()

    // In a real app, you would create the user in your database
    // For this demo, we'll just return a success response

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        id: "new-user-" + Date.now(),
        ...userData,
      },
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
