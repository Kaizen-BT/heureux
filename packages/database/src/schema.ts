/**
 * Schema for the database
 * TODO: Consider refactor to separate tables out
 */

import { relations, sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

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

export const milestones = sqliteTable("milestones", {
  ...baseShape,
  projectId: integer()
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
});

export const tasks = sqliteTable("tasks", {
  ...baseShape,
  projectId: integer()
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  milestoneId: integer().references(() => milestones.id, {
    onDelete: "cascade",
  }),
});

// --- Relations ---

export const projectsRelations = relations(projects, ({ many }) => ({
  tasks: many(tasks),
  milestones: many(milestones),
}));

export const milestonesRelations = relations(milestones, ({ one, many }) => ({
  project: one(projects, {
    fields: [milestones.projectId],
    references: [projects.id],
  }),

  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),

  milestone: one(milestones, {
    fields: [tasks.milestoneId],
    references: [milestones.id],
  }),
}));
