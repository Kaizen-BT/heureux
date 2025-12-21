CREATE TABLE `milestones` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'An Awesome Project' NOT NULL,
	`description` text DEFAULT 'A cool description',
	`urgency` text DEFAULT 'Non-Critical' NOT NULL,
	`dueDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`startDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`icon` text,
	`projectId` integer NOT NULL,
	FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'An Awesome Project' NOT NULL,
	`description` text DEFAULT 'A cool description',
	`urgency` text DEFAULT 'Non-Critical' NOT NULL,
	`dueDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`startDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`icon` text,
	`projectId` integer NOT NULL,
	`milestoneId` integer,
	FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`milestoneId`) REFERENCES `milestones`(`id`) ON UPDATE no action ON DELETE cascade
);
