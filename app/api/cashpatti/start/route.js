import { createSession } from "@/app/utils/cashPattiEngine";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const userId = body.userId ?? "anonymous";
  const result = createSession(userId);
  if (result.error) {
    return Response.json({ error: result.error }, { status: 400 });
  }
  return Response.json(result, { status: 200 });
}
