export async function GET() {
  return Response.json({
    status: "ok",
    service: "clearledger-saas",
    timestamp: new Date().toISOString(),
  });
}
