import { generateLeaderboard } from "./leaderboard";
import { members } from "./seedData";

export async function runLeaderboard() {
  return generateLeaderboard(members);
}