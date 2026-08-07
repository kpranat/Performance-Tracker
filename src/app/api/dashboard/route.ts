import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members, profiles, assignments, events, requests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/server";

export async function GET(req: Request) {
  try {
    console.log("▶️ 1. Hitting Dashboard API...");

    // 💡 Fetch session directly from the auth object (Neon handles the headers/cookies)
    const { data: session } = await auth.getSession();
    
    console.log("▶️ 2. Session found:", !!session?.user);
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    console.log("▶️ 3. Looking up member for email:", userEmail);

    // ... The rest of your exact code stays exactly the same
    const member = await db.query.members.findFirst({
      where: eq(members.email, userEmail),
    });

    if (!member) {
      console.log("❌ Member not found in database.");
      return NextResponse.json({ error: "Member not found in database" }, { status: 404 });
    }

    console.log("▶️ 4. Member found. Fetching relations...");

    const profile = await db.query.profiles.findFirst({
      where: eq(profiles.memberId, member.id),
    });

    const userAssignments = await db.select({
      title: events.eventName,
      status: assignments.status,
    })
    .from(assignments)
    .innerJoin(events, eq(assignments.eventId, events.id))
    .where(eq(assignments.memberId, member.id))
    .limit(5);

    const allEvents = await db.query.events.findMany({
      limit: 3,
    });

    const userRequests = await db.query.requests.findMany({
      where: eq(requests.memberId, member.id),
    });

    console.log("▶️ 5. All database queries succeeded. Formatting response...");
/*
    const pending = userRequests.filter(r => r.status?.toLowerCase() === 'pending').length;
    const approved = userRequests.filter(r => r.status?.toLowerCase() === 'approved').length;
    const rejected = userRequests.filter(r => r.status?.toLowerCase() === 'rejected').length;
    */

    const pending = 0;
    const approved = 0;
    const rejected = 0;
    return NextResponse.json({

      profile: {
        name: member.name,
        role: member.role,
        domain: profile?.domain || "Unassigned",
        badges: profile?.badges ? (profile.badges as string[]).length : 0,
        totalPoints: profile?.totalPoints || 0,
      },
      assignments: userAssignments,
      events: allEvents.map(e => ({
        name: e.eventName,
        date: "TBD",
        venue: "TBD"
      })),
      requests: { pending, approved, rejected },
      badges: profile?.badges || [],
    });

  } catch (error) {
    console.error("🔴 DASHBOARD API CRASH:", error);
    
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}