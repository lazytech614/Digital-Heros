import { NextRequest, NextResponse } from "next/server";
import { createCharity, getAllCharities } from "@/services/charity.service";

export async function GET() {
  const charities = await getAllCharities();
  return NextResponse.json(charities);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, imageUrl } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    const charity = await createCharity({
      name,
      description,
      imageUrl,
    });

    return NextResponse.json(charity);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create charity" },
      { status: 500 }
    );
  }
}