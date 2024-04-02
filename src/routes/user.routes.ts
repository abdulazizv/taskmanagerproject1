import { Context } from 'koa';
import Router from 'koa-router';

export const userRouter = new Router()

userRouter.get('/',async(ctx: Context) => {
    ctx.body = 'List of users'
})

userRouter.get('/:id',async(ctx: Context) => {
    ctx.body = 'ID of users'
})

