// src/lib/auth.js
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function getDb() {
  await client.connect();
  return client.db();
}

const db = await getDb();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  appName: "SunCart",
  baseURL: process.env.BETTER_AUTH_URL,

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});