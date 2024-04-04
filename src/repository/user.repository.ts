import { Context } from 'koa';
import { db } from '../../database/db.js';
import { users } from '../../database/models/schema.js'
import { eq } from 'drizzle-orm';

async function createUser(data: any) {
    const { name,email } = data;

    return await db.insert(users).values({ userName: name,email: email }).execute()
}

async function getUserById(id: number) {
    
    return await db.select().from(users).where(eq(users.id, id));
}


async function updateUserById(id: number, data: any) {

    return await db.update(users).set({ ...data }).where(eq(users.id, id)).execute();
}


async function deleteUserById(id: number) {
    
    return await db.delete(users).where(eq(users.id, id)).execute();
}

export { createUser,getUserById,deleteUserById,updateUserById }