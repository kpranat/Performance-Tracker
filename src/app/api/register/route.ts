import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members, profiles } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role, joinDate, domain, department } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

  const [newMember] = await db.insert(members).values({
  name,
  email,
  role: role.toLowerCase(),
  join_date: new Date(joinDate),
}).returning();

    await db.insert(profiles).values({
      memberId: newMember.id,
      domain,
      collegeDept: department,
      expertiseLevel: "Beginner",
      totalPoints: 0,
      badges: [],
    });

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (error: any) {
    console.error("Registration Error:", error);
    if (error.code === '23505') {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to save profile." }, { status: 500 });
  }
}