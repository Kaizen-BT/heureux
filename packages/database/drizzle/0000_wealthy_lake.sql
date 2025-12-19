CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text DEFAULT 'An Awesome Project' NOT NULL,
	`description` text DEFAULT 'A cool description',
	`urgency` text DEFAULT 'Non-Critical' NOT NULL,
	`dueDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`startDate` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`icon` text
);
