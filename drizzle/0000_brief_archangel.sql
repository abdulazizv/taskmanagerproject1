CREATE TABLE `tasks` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`title` varchar(200),
	`description` text,
	`status` enum('TODO','IN_PROGRESS','DONE'),
	`dueDate` timestamp,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userName` varchar(256),
	`email` varchar(256),
	`refreshToken` varchar(200),
	`isAdmin` boolean DEFAULT false,
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
