import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const keys = ["MONGODB_URI", "BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "DB_NAME"];
  const presence = Object.fromEntries(
    keys.map((key) => [key, Boolean(process.env[key]?.trim())])
  );

  const db = { connected: false, write: false, error: null };
  try {
    const client = new MongoClient(process.env.MONGODB_URI || "", {
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const collection = client
      .db(process.env.DB_NAME || "mentorlagbe")
      .collection("_debug_env_check");
    await collection.insertOne({ at: new Date() });
    db.write = true;
    await collection.deleteMany({});
    db.connected = true;
    await client.close();
  } catch (error) {
    db.error = String(error?.message || error)
      .replace(/mongodb(\+srv)?:\/\/[^@\s]+@/g, "mongodb://<redacted>@")
      .slice(0, 200);
  }

  return Response.json({ presence, db });
}
