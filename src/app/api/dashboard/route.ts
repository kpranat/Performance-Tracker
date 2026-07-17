import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { members, profiles, assignments, events, requests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth/server";

export async function GET(req: Request) {
  try {
   const session = await (auth as any).api.getSession({ headers: req.headers });
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const member = await db.query.members.findFirst({
      where: eq(members.email, userEmail),
    });

    if (!member) {
      return NextResponse.json({ error: "Member not found in database" }, { status: 404 });
    }

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

    const pending = userRequests.filter(r => r.status?.toLowerCase() === 'pending').length;
    const approved = userRequests.filter(r => r.status?.toLowerCase() === 'approved').length;
    const rejected = userRequests.filter(r => r.status?.toLowerCase() === 'rejected').length;

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
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}