import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // TODO: Add your API endpoint here
    // For now, we'll just return a mock response
    return NextResponse.json(
      { 
        success: true,
        message: "Login successful",
        data: {
          id: "mock-user-id",
          email: body.email,
          token: "mock-jwt-token",
          role: "mock-role"
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Failed to login",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 401 }
    );
  }
} 