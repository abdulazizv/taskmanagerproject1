import { Context, Next } from 'koa';
import ApiError from './error/api-error';

export async function errorHandler(err: Error, ctx: Context, next: Next): Promise<void> {
  console.log(err.message);
  if (err instanceof ApiError) {
    ctx.status = err.status;
    ctx.body = { message: err.message };
    return;
  }
  if (err.message.includes('Unexpected token')) {
    ctx.status = 400;
    ctx.body = { message: err.message };
    return;
  }
  ctx.status = 500;
  ctx.body = { message: 'Unexpected action!' };
}
