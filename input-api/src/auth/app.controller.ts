import { Controller } from "@nestjs/common";
import {
    AuthServiceController,
    AuthServiceControllerMethods,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    checkUserRequest,
    checkUserResponse,

} from "../stubs/auth/v1alpha/auth";
import { Metadata } from "@grpc/grpc-js";
import { RpcException } from "@nestjs/microservices";
import { AuthService } from "./app.service";

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {

    constructor(private readonly authService: AuthService) { }

    async register(request: RegisterRequest, metadata?: Metadata): Promise<RegisterResponse> {
        if (!request || !request.username || !request.password) {
            throw new RpcException('Error Input not valid');
        }
        return this.authService.register(
            request.username,
            request.password
        );
    }

    async login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> {
        if (!request || !request.username || !request.password) {
            throw new RpcException('Error Input not valid');
        }
        return this.authService.login(
            request.username,
            request.password
        );
    }

    async checkUser(request: checkUserRequest, metadata?: Metadata): Promise<checkUserResponse> {
        if (!request || !request.id) {
            throw new RpcException('Error Input not valid');
        }
        return this.authService.checkUser(
            request.id,
        );
    }

}