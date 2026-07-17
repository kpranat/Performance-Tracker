import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members, profiles } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, joinDate, domain, department } = body;

    if (!name || !email || !role || !domain || !department) {
      return NextResponse.json(
        { error: "Missing required registration fields." },
        { status: 400 }
      );
    }

    const joinDateValue = joinDate ? new Date(joinDate) : new Date();

    const existingMembers = await db
      .select({ id: members.id })
      .from(members)
      .where(eq(members.email, email))
      .limit(1);

    let memberId = existingMembers[0]?.id;

    if (!memberId) {
      const insertedMembers = await db
        .insert(members)
        .values({
          name,
          email,
          password_hash: "",
          role: role || "member",
          join_date: joinDateValue,
        })
        .returning({ id: members.id });

      memberId = insertedMembers[0]?.id;
    } else {
      await db
        .update(members)
        .set({
          name,
          role: role || "member",
          join_date: joinDateValue,
        })
        .where(eq(members.id, memberId));
    }

    if (!memberId) {
      return NextResponse.json(
        { error: "Unable to persist member record." },
        { status: 500 }
      );
    }

    const existingProfiles = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.memberId, memberId))
      .limit(1);

    if (existingProfiles[0]) {
      return NextResponse.json({ success: true, memberId, duplicate: true });
    }

    try {
      await db.insert(profiles).values({
        memberId,
        domain,
        expertiseLevel: "Beginner",
        collegeDept: department,
      });
    } catch (profileError) {
      console.error("Profile creation failed; continuing with member creation.", profileError);
    }

    return NextResponse.json({ success: true, memberId, duplicate: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
