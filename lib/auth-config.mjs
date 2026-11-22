import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

/**
 * Shared Better Auth factory.
 * - Used by the Next.js route handler (`lib/auth.js`)
 * - Used by the seed script (`scripts/seed.mjs`) so demo accounts get real,
 *   login-ready password hashes.
 */
export function createAuth() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing in .env.local");
  }
  if (!process.env.BETTER_AUTH_SECRET) {
    throw new Error("BETTER_AUTH_SECRET is missing in .env.local");
  }

  // Reuse one Mongo connection (Next.js dev server reloads files often)
  const client = globalThis._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
  globalThis._mongoClient = client;

  const db = client.db(process.env.DB_NAME || "mentorlagbe");

  const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 6,
    },

    user: {
      // Use our own "users" collection instead of Better Auth's default "user"
      modelName: "users",
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "student",
          input: true,
        },
        plan: {
          type: "string",
          required: false,
          defaultValue: "free",
          input: false,
        },
        phone: { type: "string", required: false, input: true },
        bio: { type: "string", required: false, input: true },
      },
    },

    databaseHooks: {
      user: {
        create: {
          // Security: nobody can sign up as admin or as a pro user.
          // Only "student" or "tutor" is allowed; admin is set manually.
          before: async (user) => {
            const role = user.role === "tutor" ? "tutor" : "student";
            return { data: { ...user, role, plan: "free" } };
          },
        },
      },
    },

    plugins: [jwt()],
  });

  return { auth, db, client };
}
