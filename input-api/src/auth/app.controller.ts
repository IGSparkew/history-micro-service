import { Controller } from "@nestjs/common";
import {
    AuthServiceController,
    AuthServiceControllerMethods,
    ChatRequest,
    ChatResponse,
    GroupRequest,
    GroupResponse,
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
import { Observable } from "rxjs";
import { AuthCheckService } from "src/check_auth/app.service";
import { SendToGestion } from "src/sendToGestion/app.service";
import { JwtService } from "@nestjs/jwt";



@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {

    constructor(private readonly authService: AuthService, private jwtService: JwtService, private sendToGestion: SendToGestion) { }

    async chatWithUser(request: ChatRequest, metadata?: Metadata): Promise<ChatResponse> {
        if(!this.authService.checkAuth(metadata)) {
            throw new RpcException('Error unauthorized auth!')
        }
        if (!request || !request.chat || !request.userId) {
            throw new RpcException('Error Input not valid');
        }
        return this.sendToGestion.sendToChat(request, metadata);
    }

    async chatWithGroup(request: GroupRequest, metadata?: Metadata): Promise<GroupResponse> {
        if(!this.authService.checkAuth(metadata)) {
            throw new RpcException('Error unauthorized auth!')
        }
        if (!request || !request.chat || !request.groupId) {
            throw new RpcException('Error Input not valid');
        }
        return this.sendToGestion.sendToGroup(request, metadata);
    }

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