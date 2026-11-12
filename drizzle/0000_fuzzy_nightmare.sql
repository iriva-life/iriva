CREATE TABLE `households` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`host` text NOT NULL,
	`code` text NOT NULL,
	`topic` text NOT NULL,
	`week` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `households_code_unique` ON `households` (`code`);--> statement-breakpoint
CREATE TABLE `members` (
	`user` text PRIMARY KEY NOT NULL,
	`household` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`household` text NOT NULL,
	`author` text NOT NULL,
	`name` text NOT NULL,
	`body` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`household` text NOT NULL,
	`creator` text NOT NULL,
	`title` text NOT NULL,
	`kind` text NOT NULL,
	`at` text NOT NULL,
	`url` text DEFAULT '' NOT NULL
);
