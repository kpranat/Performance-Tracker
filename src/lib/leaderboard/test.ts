import { runLeaderboard } from "./service";

const leaderboard = await runLeaderboard();

console.log(
  JSON.stringify(
    leaderboard,
    null,
    2,
  ),
);