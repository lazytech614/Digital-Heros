import { cancelSubscription, deleteUser, cancelCharity } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function GET(req: NextRequest, { params }: Params) {
  const { id } =  params;
  return NextResponse.json({ id });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await deleteUser(id);
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  if (body.type === "cancel-subscription") {
    await cancelSubscription(id);
  }

  if (body.type === "cancel-charity") {
    await cancelCharity(id, body.charityId);
  }

  return NextResponse.json({ success: true });
}
