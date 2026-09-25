import { completeSession } from "@/app/utils/cashPattiEngine";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { sessionId } = body;

  if (!sessionId) {
    return Response.json({ error: "sessionId required" }, { status: 400 });
  }

  const result = completeSession(sessionId);
  if (result.error) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json(result, { status: 200 });
}
