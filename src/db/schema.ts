import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  role: text("role").default("member").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
