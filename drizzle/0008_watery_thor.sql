ALTER TABLE `applications` ADD `plan` text DEFAULT 'native' NOT NULL;--> statement-breakpoint
ALTER TABLE `households` ADD `duration` integer DEFAULT 6 NOT NULL;