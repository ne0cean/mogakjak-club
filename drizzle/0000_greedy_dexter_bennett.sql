CREATE TABLE `survey_responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`desired_work` text NOT NULL,
	`blocker` text NOT NULL,
	`experience` text NOT NULL,
	`tools` text NOT NULL,
	`tools_other` text DEFAULT '' NOT NULL,
	`goals` text NOT NULL,
	`goals_other` text DEFAULT '' NOT NULL,
	`first_session_topics` text NOT NULL,
	`first_session_topics_other` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
