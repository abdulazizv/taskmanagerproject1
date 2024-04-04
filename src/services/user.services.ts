import { Context } from "koa";
import * as UserRepository from '../repository/user.repository';
import * as JwtService from "lib/utils/generate-token.util";

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
    response[0].insertId;
    await UserRepository.updateUserById(response[0].insertId,{refreshToken: token})

    const res = {
        success: true,
        message: "OK",
        token
    }
    return res;
}

const getUserById = async(ctx: Context) => {
    const paramsId = ctx.params.id;

    const data = await UserRepository.getUserById(+paramsId);

    return data;
}

const updateUser = async(ctx: Context) => {
    const data = ctx.body;
    const paramsId = ctx.params.id;

    const response = await UserRepository.updateUserById(+paramsId,data);

    return response;
}

const deleteUser = async(ctx: Context) => {
    const paramsId = ctx.params.id;

    const response = await UserRepository.deleteUserById(+paramsId);

    return response;
}

export { createUser,getUserById,updateUser,deleteUser }