import { Context } from "koa";
import * as UserRepository from '../repository/user.repository.js';
import * as JwtService from "../lib/utils/generate-token.util.js";

const createUser = async(ctx: Context) => {
    const data: any = ctx.body;

    const response = await UserRepository.createUser(data)

    if(!response) {
        ctx.body = {error: "Error on creating user",status: 400}
    }

    const payload = {
        email: data.email,
        isAdmin: false
    }

    const token = JwtService.signToken(payload);

    await UserRepository.updateUserById(response[0].insertId,{refreshToken: token})

    const res = {
        success: true,
        message: "OK",
        token
    }

    return ctx.ok(res);
}

const getUserById = async(ctx: Context) => {
    const paramsId = ctx.params.id;

    const data = await UserRepository.getUserById(+paramsId);

    return ctx.ok(200,{ data })
}

const updateUser = async(ctx: Context) => {
    const data = ctx.body;
    const paramsId = ctx.params.id;

    const response = await UserRepository.updateUserById(+paramsId,data);

    if (!response) {
        return ctx.error(400,{ msg: "Not existed data"});
    }

    return ctx.ok(200, { data: response })
}

const deleteUser = async(ctx: Context) => {
    const paramsId = ctx.params.id;

    const response = await UserRepository.deleteUserById(+paramsId);

    if(!response) {
        return ctx.error(404,{ msg: "Not found this user"})
    }

    return ctx.ok(200,{ message: "successfully deleted"})
}

export { createUser,getUserById,updateUser,deleteUser }