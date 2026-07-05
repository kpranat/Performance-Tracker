import type { Volunteer } from "./types";

export function mapProfileToVolunteer(profile: any): Volunteer {
  return {
    id: profile.memberId,
    name: profile.name,
    domain: profile.domain,
    department: profile.collegeDept,
    totalPoints: profile.totalPoints ?? 0,
    availability: [],
  };
}