CREATE TABLE `practice_invites` (
	`id` text PRIMARY KEY NOT NULL,
	`household` text NOT NULL,
	`pair` text NOT NULL,
	`sender` text NOT NULL,
	`recipient` text NOT NULL,
	`topic` text NOT NULL,
	`at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`session` text,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
