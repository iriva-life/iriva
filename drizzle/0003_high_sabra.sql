CREATE TABLE `practice_pairs` (
	`id` text PRIMARY KEY NOT NULL,
	`household` text NOT NULL,
	`first` text NOT NULL,
	`second` text NOT NULL,
	`url` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE `sessions` ADD `pair` text;