CREATE TABLE `coach_drafts` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`household` text NOT NULL,
	`topic` text NOT NULL,
	`goal` text NOT NULL,
	`story` text NOT NULL,
	`outline` text NOT NULL,
	`reflection` text NOT NULL,
	`feedback` text NOT NULL,
	`updated` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `coach_usage` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL
);
