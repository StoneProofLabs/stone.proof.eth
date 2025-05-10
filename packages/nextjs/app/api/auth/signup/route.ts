import { NextResponse } from "next/server";



export async function POST(request: Request) {
  try {
    // Get the form data from the incoming request
    const formData = await request.formData();

    // Prepare a new FormData to send to the real backend

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Forward all fields as-is

    const backendFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      backendFormData.append(key, value);
    }

    const minerals = ['gold', 'coltan'];
    const mineralsString = `[ "${minerals.join('", "')}" ]`; // results in [ "gold", "coltan" ]
    backendFormData.append('mineralsMined', mineralsString);

    // Forward the request to the real backend
    const backendResponse = await fetch("https://stoneproofbackend.onrender.com/api/v1/auth/register", {
      method: "POST",
      body: backendFormData,
      // Do NOT set Content-Type; fetch will set it automatically for FormData
    });

    const data = await backendResponse.json();


    const backendResponse = await fetch("https://stoneproofbackend.onrender.com/api/v1/auth/register", {
      method: "POST",
      body: backendFormData,
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Signup proxy error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user (proxy error)",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 