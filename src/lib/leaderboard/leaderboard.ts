import type {
  LeaderboardEntry,
  Member,
} from "./types";

export function generateLeaderboard(
  members: Member[],
): LeaderboardEntry[] {
  const sortedMembers = [...members].sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );

  const leaderboard: LeaderboardEntry[] = [];

  let currentRank = 1;
  let previousPoints: number | null = null;

  for (const member of sortedMembers) {
    if (
      previousPoints !== null &&
      member.totalPoints < previousPoints
    ) {
      currentRank++;
    }

    leaderboard.push({
      rank: currentRank,
      id: member.id,
      name: member.name,
      domain: member.domain,
      totalPoints: member.totalPoints,
    });

    previousPoints = member.totalPoints;
  }

  return leaderboard;
}