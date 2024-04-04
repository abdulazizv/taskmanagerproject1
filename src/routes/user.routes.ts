import { Context } from 'koa';
import Router from 'koa-router';
import * as UserService from '../services/user.services.js';

export const userRouter = new Router()

userRouter.get('/:id',UserService.getUserById);
userRouter.delete('/:id',UserService.deleteUser);
userRouter.post('/',UserService.createUser);
userRouter.patch('/:id',UserService.updateUser);
