export type FreeHour = {
  dayOrder: number;
  startTime: string;
  endTime: string;
};

export type Volunteer = {
  id: number;
  name: string;
  domain: string;
  department: string;
  expertiseLevel?: string;
  totalPoints: number;
  availability: FreeHour[];
};

export type Venue = {
  id: number;
  name: string;
  capacity: number;
  priorityDomain: string;
};

export type Assignment = {
  volunteerId: number;
  venueId: number;
  assignedDomain: string;
};

export type UnderfilledVenue = {
  venueId: number;
  venueName: string;
  requiredCapacity: number;
  assignedCount: number;
};

export type AssignmentResult = {
  assignments: Assignment[];
  underfilledVenues: UnderfilledVenue[];
};

export type SlotGroup = {
  key: string;
  volunteers: Volunteer[];
};