// src/app/api/auth/[...all]/route.js
import { auth } from "@/lib/auth";

export const { GET, POST } = auth.handler;