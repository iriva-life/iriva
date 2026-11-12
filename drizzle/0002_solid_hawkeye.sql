CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`language` text NOT NULL,
	`goal` text NOT NULL,
	`level` text NOT NULL,
	`timezone` text NOT NULL,
	`availability` text NOT NULL,
	`interests` text NOT NULL,
	`contact` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`household` text,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `applications_user_unique` ON `applications` (`user`);--> statement-breakpoint
CREATE TABLE `placements` (
	`email` text PRIMARY KEY NOT NULL,
	`household` text NOT NULL,
	`role` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`email` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`assignee` text NOT NULL,
	`due` text NOT NULL,
	`done` integer DEFAULT 0 NOT NULL,
	`created` text NOT NULL
);
