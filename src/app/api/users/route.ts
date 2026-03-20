import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/services/user.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const filters = {
      sort: searchParams.get("sort") || "desc",
      subscription: searchParams.get("subscription"),
      contribution: searchParams.get("contribution"),
      charities: searchParams.getAll("charities"),
    };

    const users = await getUsers(filters);

    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}