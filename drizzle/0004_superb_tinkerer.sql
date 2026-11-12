ALTER TABLE `practice_pairs` ADD `slot` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `practice_pair_slot` ON `practice_pairs` (`household`,`slot`);