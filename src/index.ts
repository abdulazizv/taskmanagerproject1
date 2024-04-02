import Koa from 'koa';
import logger from 'koa-logger';
import config from "../config/index.js";
import { router } from './routes/index.routes.js'; 

const app = new Koa();

const port = config.server.port || 9080;

app.use(logger())
app.use(router.routes());

app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
});