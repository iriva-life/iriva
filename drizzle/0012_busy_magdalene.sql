ALTER TABLE `applications` ADD `availability_slots` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `contact_preference` text DEFAULT 'email' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `revision` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `updated` text DEFAULT '' NOT NULL;