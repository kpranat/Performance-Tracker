import type { Volunteer, Venue } from "./types";

export const volunteers: Volunteer[] = [
  {
    id: 1,
    name: "Alice",
    domain: "Tech",
    department: "CSE",
    totalPoints: 120,
    availability: [
      {
        dayOrder: 1,
        startTime: "10:00",
        endTime: "13:00",
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
    domain: "Design",
    department: "ECE",
    totalPoints: 40,
    availability: [
      {
        dayOrder: 1,
        startTime: "08:00",
        endTime: "10:00",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie",
    domain: "Tech",
    department: "CSE",
    totalPoints: 80,
    availability: [
      {
        dayOrder: 1,
        startTime: "11:00",
        endTime: "15:00",
      },
    ],
  },
  {
    id: 4,
    name: "David",
    domain: "Content",
    department: "IT",
    totalPoints: 20,
    availability: [
      {
        dayOrder: 2,
        startTime: "10:00",
        endTime: "13:00",
      },
    ],
  },
  {
    id: 5,
    name: "Eva",
    domain: "Design",
    department: "ECE",
    totalPoints: 150,
    availability: [
      {
        dayOrder: 1,
        startTime: "09:00",
        endTime: "14:00",
      },
    ],
  },
];

export const venues: Venue[] = [
  {
    id: 1,
    name: "Venue A",
    capacity: 3,
    priorityDomain: "Tech",
  },
  {
    id: 2,
    name: "Venue B",
    capacity: 2,
    priorityDomain: "Design",
  },
];