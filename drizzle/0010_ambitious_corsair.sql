CREATE TABLE `feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`email` text NOT NULL,
	`category` text NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `applications` ADD `age_band` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `life_stage` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `location` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `mbti` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `partner_preferences` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `suggestion` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `oral_level` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `applications` ADD `oral_notes` text DEFAULT '' NOT NULL;