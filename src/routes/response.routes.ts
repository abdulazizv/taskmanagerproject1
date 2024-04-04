import Koa from "koa";
import Router from "koa-router";
import Response from "../lib/services/response.service";
import lodash from "lodash";
import { Context } from "koa";

const responseRouter = new Router();

responseRouter.use((ctx: Context, next: Function) => {
  ctx.ok = (status: number, data: any, notification = {}) => {
    let showNull: boolean = ctx.query.showNull !== 'false';
    removeNullableNestedObject(data, showNull, function (response: any) {
      let resp = new Response(status, response, null, notification);
      ctx.status = status;
      ctx.body = resp;
    });
  };

  ctx.error = (status: number, err: any, data = {}) => {
    if (err.req) {
      err.clientInfo = {
        token: ctx.headers.token,
        body: err.req.body,
        method: err.req.method,
        url: err.req.originalUrl,
        address: err.req._remoteAdress,
        deviceType: err.req.headers.devicetype,
        appVersion: err.req.headers.appversion,
      };
      delete err.req;
    }
    if (typeof err == "object") {
      let response = new Response(status, data, err, {});
      response.getError((errorResp: any) => {
        ctx.status = status;
        ctx.body = errorResp;
        ctx.end;
      });
    }
  };

  return next();
});

export default () => responseRouter.routes();

const removeNullableNestedObject = function (
  params: any,
  showNull: boolean,
  callback: Function
) {
  try {
    params = pruneEmpty(params, showNull);
  } catch (ex) {
    console.error("Error when remove nullable nested objects:", ex);
  }

  callback(params);
};

function pruneEmpty(obj: any, showNull: boolean) {
  return (function prune(current: any) {
    lodash.forOwn(current, function (value, key) {
      if (
        lodash.isUndefined(value) ||
        lodash.isNull(value) ||
        lodash.isNaN(value) ||
        (lodash.isString(value) && lodash.isEmpty(value)) ||
        (lodash.isObject(value) &&
          lodash.isEmpty(prune(value)) &&
          !lodash.isDate(value))
      ) {
        if (showNull) current[key] = "";
        if (showNull && lodash.isNumber(current[key]))
          return (current[key] = 0);
        if (showNull && lodash.isArray(value)) return (current[key] = []);
        delete current[key];
      }
    });
    if (lodash.isArray(current)) lodash.pull(current, undefined);

    return current;
  })(lodash.cloneDeep(obj));
}
