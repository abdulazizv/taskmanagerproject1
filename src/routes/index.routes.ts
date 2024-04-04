import Router from 'koa-router';
export const router = new Router();

import { userRouter } from './user.routes.js';
import responseRouter from './response.routes.js';

router.use(responseRouter())
router.use('/users',userRouter.routes());

