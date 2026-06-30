import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  members,
  profiles,
  freeHours,
} from "../../db/schema";

export async function fetchVolunteers() {
  const rows = await db
    .select({
      memberId: members.id,
      name: members.name,

      domain: profiles.domain,
      collegeDept: profiles.collegeDept,
      expertiseLevel: profiles.expertiseLevel,
      totalPoints: profiles.totalPoints,

      dayOrder: freeHours.dayOrder,
      startTime: freeHours.startTime,
      endTime: freeHours.endTime,
    })
    .from(members)
    .innerJoin(
      profiles,
      eq(members.id, profiles.memberId),
    )
    .leftJoin(
      freeHours,
      eq(members.id, freeHours.memberId),
    );

  return rows;
}