import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "src/schemas/auth.schema";
import { LoginResponse, RegisterResponse, checkUserResponse } from "src/stubs/auth/v1alpha/auth";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>, private jwtService: JwtService) { }

    async register(username: string, password: string): Promise<RegisterResponse> {
        const register = new this.authModel({
            username: username,
            password: password
        });
        const response = await register.save();
        return {
            message: 'utilisateur créé'
        };
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        const login = await this.authModel.findOne({ username: username, password: password });
        if (!login) {
            return undefined;
        }
        const payload = {sub: login._id, username: login.username}
        return {
            token: await this.jwtService.signAsync(payload)
        };
    }

    async checkUser(id: string): Promise<checkUserResponse> {
        const check = await this.authModel.findById(id);
        if (!check) {
            return { message: false };
        }
        return { message: true };
    }
}