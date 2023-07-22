/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth.v1alpha";

export interface Auth {
    username?: string | undefined;
    password?: string | undefined;
}

export interface RegisterRequest {
    username?: string | undefined;
    password?: string | undefined;
}

export interface LoginRequest {
    username?: string | undefined;
    password?: string | undefined;
}

export interface LoginResponse {
    token?: String | undefined;
}

export interface RegisterResponse {
    message?: string | undefined;
}

export interface checkUserRequest {
    id: string;
}

export interface checkUserResponse {
    message: boolean;
}

export interface ChatRequest {
    token : string;
    data : Array<any>;
}

export interface ChatResponse {
    token : string;
    data : Array<any>;
}

export interface checkUserRequest {
  id: string;
}

export interface checkUserResponse {
  message: string;
}

export const AUTH_V1ALPHA_PACKAGE_NAME = "auth.v1alpha";

export interface AuthServiceClient {
  register(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  checkUser(request: checkUserRequest, metadata?: Metadata): Observable<checkUserResponse>;

  chat(request: ChatRequest, metadata?: Metadata): Observable<ChatResponse>;
}

export interface AuthServiceController {
    register(
        request: RegisterRequest,
        metadata?: Metadata,
    ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

    login(
        request: LoginRequest,
        metadata?: Metadata,
    ): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  checkUser(
    request: checkUserRequest,
    metadata?: Metadata,
  ): Promise<checkUserResponse> | Observable<checkUserResponse> | checkUserResponse;

  chat(request: ChatRequest, metadata?: Metadata): Promise<ChatResponse> | Observable<ChatResponse> | ChatResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "checkUser", "chat"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
