import Koa from 'koa';
import logger from 'koa-logger';
import config from "../config/index.js";

const app = new Koa();

const port = config.server.port;

app.use(logger())

app.use(async ctx => {
    ctx.body = 'Hello World';
  });
  
app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
});