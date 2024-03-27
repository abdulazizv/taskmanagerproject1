import { mysqlTable, bigint, varchar, boolean, timestamp, text, mysqlEnum, int } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
export const users = mysqlTable('users', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    userName: varchar('userName', { length: 256 }),
    email: varchar('email', { length: 256 }),
    refreshToken: varchar('refreshToken', { length: 200 }),
    isAdmin: boolean('isAdmin').default(false),
    isActive: boolean('isActive').default(true),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
export const tasks = mysqlTable('tasks', {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    title: varchar('title', { length: 200 }),
    description: text('description'),
    status: mysqlEnum('status', ['TODO', 'IN_PROGRESS', 'DONE']),
    dueDate: timestamp('dueDate'),
    userId: int('userId'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow()
});
export const userRelations = relations(users, ({ many }) => ({
    tasks: many(tasks)
}));
export const taskRelations = relations(tasks, ({ one }) => ({
    user: one(users, {
        fields: [tasks.userId],
        references: [users.id]
    })
}));
