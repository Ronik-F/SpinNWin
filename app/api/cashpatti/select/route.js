import { selectPlayer } from "@/app/utils/cashPattiEngine";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { sessionId, playerId } = body;

  if (!sessionId || typeof playerId !== "number") {
    return Response.json({ error: "sessionId and numeric playerId required" }, { status: 400 });
  }

  const result = selectPlayer(sessionId, playerId);
  if (result.error) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json(result, { status: 200 });
}
