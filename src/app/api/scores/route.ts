import { scoreService } from "@/services/score.service";
import { getOrCreateUser } from "@/lib/getUser";

export async function POST(req: Request) {
  const body = await req.json();

  const user = await getOrCreateUser();

  const result = await scoreService.addScore(
    user.id,
    body.value,
    new Date(body.playedAt)
  );

  return Response.json(result);
}

export async function GET() {
  const user = await getOrCreateUser();

  const scores = await scoreService.getScores(user.id);

  return Response.json(scores);
}