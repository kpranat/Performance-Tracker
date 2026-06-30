import type {
  SlotGroup,
  Volunteer,
} from "./types";

export function groupVolunteersBySlot(
  volunteers: Volunteer[],
): SlotGroup[] {
  const groups = new Map<
    string,
    Volunteer[]
  >();

  for (const volunteer of volunteers) {
    for (const slot of volunteer.availability) {
      const key =
        `${slot.dayOrder}-${slot.startTime}-${slot.endTime}`;

      if (!groups.has(key)) {
        groups.set(key, []);
      }

      groups.get(key)?.push(volunteer);
    }
  }

  return Array.from(groups.entries()).map(
    ([key, volunteers]) => ({
      key,
      volunteers,
    }),
  );
}