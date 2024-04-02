import Router from 'koa-router';
export const router = new Router();

import { userRouter } from './user.routes.js';

router.use('/users',userRouter.routes());

