import { splitByContribution } from "./scoring";
import type {
  Assignment,
  AssignmentResult,
  UnderfilledVenue,
  Venue,
  Volunteer,
} from "./types";

function getMixedVolunteers(volunteers: Volunteer[]): Volunteer[] {
  const { highContributors, lowContributors } =
    splitByContribution(volunteers);

  const mixed: Volunteer[] = [];

  let highIndex = 0;
  let lowIndex = 0;

  while (
    highIndex < highContributors.length ||
    lowIndex < lowContributors.length
  ) {
    if (highIndex < highContributors.length) {
      mixed.push(highContributors[highIndex]);
      highIndex++;
    }

    if (lowIndex < lowContributors.length) {
      mixed.push(lowContributors[lowIndex]);
      lowIndex++;
    }
  }

  return mixed;
}

export function autoAssign(
  volunteers: Volunteer[],
  venues: Venue[],
): AssignmentResult {
  const assignments: Assignment[] = [];
  const underfilledVenues: UnderfilledVenue[] = [];

  const availableVolunteers = [...volunteers];

  const totalCapacity = venues.reduce(
    (sum, venue) => sum + venue.capacity,
    0,
  );

  const eligibleVolunteerCount = volunteers.length;

  const totalVolunteers = eligibleVolunteerCount;

  const venueTargets = new Map<number, number>();

  // FAIR DISTRIBUTION MODE
  if (totalVolunteers < totalCapacity) {
    const venueCount = venues.length;

    const baseAllocation = Math.floor(
      totalVolunteers / venueCount,
    );

    let remaining = totalVolunteers % venueCount;

    for (const venue of venues) {
      let target = Math.min(
        baseAllocation,
        venue.capacity,
      );

      if (
        remaining > 0 &&
        target < venue.capacity
      ) {
        target++;
        remaining--;
      }

      venueTargets.set(venue.id, target);
    }
  } else {
    // NORMAL MODE
    for (const venue of venues) {
      venueTargets.set(
        venue.id,
        venue.capacity,
      );
    }
  }

  for (const venue of venues) {
    let seatsFilled = 0;

    const targetSeats =
      venueTargets.get(venue.id) ?? 0;

    // STEP 1: PRIORITY DOMAIN
    const priorityDomainVolunteers =
  availableVolunteers.filter(
        (volunteer) =>
          volunteer.domain ===
          venue.priorityDomain,
      );

    const mixedPriorityVolunteers =
      getMixedVolunteers(
        priorityDomainVolunteers,
      );

    for (const volunteer of mixedPriorityVolunteers) {
      if (seatsFilled >= targetSeats) {
        break;
      }

      assignments.push({
        volunteerId: volunteer.id,
        venueId: venue.id,
        assignedDomain: volunteer.domain,
      });

      const index =
        availableVolunteers.findIndex(
          (v) => v.id === volunteer.id,
        );

      if (index !== -1) {
        availableVolunteers.splice(index, 1);
      }

      seatsFilled++;
    }

    // STEP 2: FILL REMAINING SEATS
    const remainingEligible =
  getMixedVolunteers(
    availableVolunteers,
  );

    for (const volunteer of remainingEligible) {
      if (seatsFilled >= targetSeats) {
        break;
      }

      assignments.push({
        volunteerId: volunteer.id,
        venueId: venue.id,
        assignedDomain: volunteer.domain,
      });

      const index =
        availableVolunteers.findIndex(
          (v) => v.id === volunteer.id,
        );

      if (index !== -1) {
        availableVolunteers.splice(index, 1);
      }

      seatsFilled++;
    }

    // STEP 3: UNDERFILLED CHECK
    if (seatsFilled < venue.capacity) {
      underfilledVenues.push({
        venueId: venue.id,
        venueName: venue.name,
        requiredCapacity: venue.capacity,
        assignedCount: seatsFilled,
      });
    }
  }

  return {
    assignments,
    underfilledVenues,
  };
}