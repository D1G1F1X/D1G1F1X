import { NextResponse } from "next/server"

type ErrorResponse = {
  success: false
  error: string
  details?: any
}

type SuccessResponse<T> = {
  success: true
  data: T
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export function createErrorResponse(message: string, status = 500, details?: any): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details && { details }),
    },
    { status },
  )
}

export function createSuccessResponse<T>(data: T, status = 200): NextResponse<SuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status },
  )
}

export async function withErrorHandling<T>(
  handler: () => Promise<T>,
  errorMessage = "An unexpected error occurred",
): Promise<NextResponse> {
  try {
    const result = await handler()
    return createSuccessResponse(result)
  } catch (error) {
    console.error(errorMessage, error)
    return createErrorResponse(errorMessage, 500, error instanceof Error ? error.message : undefined)
  }
}

export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string[] {
  return requiredFields.filter((field) => {
    const value = data[field]
    return value === undefined || value === null || value === ""
  })
}
