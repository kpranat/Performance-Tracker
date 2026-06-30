import { runAutoAssignment } from "./service";

const result =
  await runAutoAssignment();

console.log(
  JSON.stringify(result, null, 2),
);