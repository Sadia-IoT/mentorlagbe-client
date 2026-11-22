import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// Reuse one Mongo connection (Next.js dev server reloads files often)
const client = globalThis._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalThis._mongoClient = client;

const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
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
      role: { type: "string", required: false, defaultValue: "student", input: true },
      plan: { type: "string", required: false, defaultValue: "free", input: false },
      phone: { type: "string", required: false, input: true },
      bio: { type: "string", required: false, input: true },
    },
  },

  databaseHooks: {
    user: {
      create: {
        // Security: nobody can sign up as admin or as a pro user.
        // Only "student" or "tutor" is allowed; admin is set manually in Atlas.
        before: async (user) => {
          const role = user.role === "tutor" ? "tutor" : "student";
          return { data: { ...user, role, plan: "free" } };
        },
      },
    },
  },

  plugins: [jwt()],
});