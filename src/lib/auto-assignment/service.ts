import { autoAssign } from "./autoAssign";
import { groupVolunteersBySlot } from "./groupBySlot";
import { volunteers, venues } from "./seedData";

export async function runAutoAssignment() {
  const slotGroups =
    groupVolunteersBySlot(volunteers);

  const results = [];

  for (const group of slotGroups) {
    const result = autoAssign(
      group.volunteers,
      venues,
    );

    results.push({
      slot: group.key,
      ...result,
    });
  }

  return results;
}