import { winnerService } from "@/services/winner.service";

export async function POST(req: Request) {
  const { drawId } = await req.json();

  const result = await winnerService.generateWinners(drawId);

  return Response.json(result);
}