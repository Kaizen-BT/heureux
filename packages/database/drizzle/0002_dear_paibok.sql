PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_milestones` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text DEFAULT 'A cool description',
	`urgency` text DEFAULT 'Non-Critical' NOT NULL,
	`dueDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`startDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`icon` text,
	`name` text DEFAULT 'An interesting milestone' NOT NULL,
	`projectId` integer NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_milestones`("id", "description", "urgency", "dueDate", "startDate", "createdAt", "icon", "name", "projectId") SELECT "id", "description", "urgency", "dueDate", "startDate", "createdAt", "icon", "name", "projectId" FROM `milestones`;--> statement-breakpoint
DROP TABLE `milestones`;--> statement-breakpoint
ALTER TABLE `__new_milestones` RENAME TO `milestones`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text DEFAULT 'A cool description',
	`urgency` text DEFAULT 'Non-Critical' NOT NULL,
	`dueDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`startDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`icon` text,
	`name` text DEFAULT 'Awesome Project' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "description", "urgency", "dueDate", "startDate", "createdAt", "icon", "name") SELECT "id", "description", "urgency", "dueDate", "startDate", "createdAt", "icon", "name" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
CREATE TABLE `__new_tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`description` text DEFAULT 'A cool description',
	`urgency` text DEFAULT 'Non-Critical' NOT NULL,
	`dueDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`startDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`icon` text,
	`name` text DEFAULT 'An exciting task' NOT NULL,
	`projectId` integer NOT NULL,
	`milestoneId` integer,
	FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`milestoneId`) REFERENCES `milestones`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_tasks`("id", "description", "urgency", "dueDate", "startDate", "createdAt", "icon", "name", "projectId", "milestoneId") SELECT "id", "description", "urgency", "dueDate", "startDate", "createdAt", "icon", "name", "projectId", "milestoneId" FROM `tasks`;--> statement-breakpoint
DROP TABLE `tasks`;--> statement-breakpoint
ALTER TABLE `__new_tasks` RENAME TO `tasks`;