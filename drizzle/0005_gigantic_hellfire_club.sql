CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`session` text NOT NULL,
	`kind` text NOT NULL,
	`due` text NOT NULL,
	`read` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notification_once` ON `notifications` (`user`,`session`,`kind`);--> statement-breakpoint
ALTER TABLE `sessions` ADD `participant` text;