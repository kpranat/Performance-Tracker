import { auth } from "../../../../lib/auth/server";
import { NextResponse } from "next/server";

export const { GET, POST } = auth.handler();