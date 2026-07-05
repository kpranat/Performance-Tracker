import type { Volunteer } from "./types";

export function splitByContribution(volunteers: Volunteer[]) {
  const average =
    volunteers.reduce((sum, volunteer) => sum + volunteer.totalPoints, 0) /
    volunteers.length;

  return {
    highContributors: volunteers.filter(
      (volunteer) => volunteer.totalPoints >= average,
    ),
    lowContributors: volunteers.filter(
      (volunteer) => volunteer.totalPoints < average,
    ),
  };
}