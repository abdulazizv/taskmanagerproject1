import Koa from 'koa';
import logger from 'koa-logger';
import config from "./config/index.js";
import { router } from './routes/index.routes.js'; 
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { errorHandler } from './lib/middlewares/error-handling.middleware.js';

const app = new Koa();

const port = config.server.port || 9080;

app.use(logger())
app.use(bodyParser())
app.use(cors())
app.use(router.routes());

app.use((ctx,next) => errorHandler(ctx.body,ctx,next))
app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
});