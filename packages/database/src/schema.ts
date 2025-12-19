/**
 * Schema for the database
 * TODO: Consider refactor to separate tables out
 */

import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

// --- Helpers ---

const dateWithDefault = (name: string) =>
  integer(name, { mode: "timestamp_ms" }).default(sql`(unixepoch() * 1000)`);

const dateWithDefaultNN = (name: string = "dateCol") =>
  dateWithDefault(name).notNull();

// --- Raw Shapes ---

const baseShape = {
  id: integer().primaryKey({ autoIncrement: true }),

  // Entity descriptors
  name: text().notNull().default("An Awesome Project"),
  description: text().default("A cool description"),
  urgency: text({ enum: ["Non-Critical", "Important", "Critical"] })
    .notNull()
    .default("Non-Critical"),
  dueDate: dateWithDefaultNN("dueDate"),

  // The following dates will likely be readonly
  startDate: dateWithDefaultNN("startDate"),
  createdAt: dateWithDefaultNN("createdAt"),

  // UI fields... might change to use store instead
  icon: text(),
};

// --- Tables ---

export const projects = sqliteTable("projects", {
  ...baseShape,
});
