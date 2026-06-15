import { pgTable, serial, text, timestamp, time, integer, jsonb } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  role: text("role").default("member").notNull(),
  join_date: timestamp("join_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  domain: text("domain").notNull(),
  expertiseLevel: text("expertise_level").notNull(), 
  totalPoints: integer("total_points").default(0),
  collegeDept: text("college_dept").notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  domain: text("domain").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  eventName: text("event_name").notNull(),
  createdBy: integer("created_by").references(() => members.id),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  eventId: integer("event_id").references(() => events.id),
  pointsAwarded: integer("points_awarded").default(0),
  status: text("status").default("Assigned").notNull(),
});

export const formComponents = pgTable("form_components", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id),
  domainDist: jsonb("domain_dist").notNull(),
  venueName: text("venue_name").notNull(),
  venueCapacity: integer("venue_capacity").notNull(),
});

export const freeHours = pgTable("free_hours", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id),
  dayOrder: integer("day_order"),
  startTime: time("start_time"),
  endTime: time("end_time"),
});