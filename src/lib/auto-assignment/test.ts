import { autoAssign } from "./autoAssign";
import { volunteers, venues } from "./seedData";

console.log("Before assignment");

const result = autoAssign(volunteers, venues);

console.log("Assignments:");
console.log(result.assignments);

console.log("Underfilled Venues:");
console.log(result.underfilledVenues);