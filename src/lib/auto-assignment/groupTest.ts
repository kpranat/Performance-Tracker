import { volunteers } from "./seedData";
import { groupVolunteersBySlot } from "./groupBySlot";

const groups = groupVolunteersBySlot(volunteers);

for (const group of groups) {
  console.log(group.key);

  console.log(
    group.volunteers.map(
      (volunteer) => volunteer.name,
    ),
  );
}