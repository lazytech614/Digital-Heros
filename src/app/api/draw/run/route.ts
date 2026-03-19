import { drawService } from "@/services/draw.service";

export async function POST() {
  const draw = await drawService.runMonthlyDraw();

  return Response.json(draw);
}