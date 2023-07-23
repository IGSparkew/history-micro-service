/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth.v1alpha";

export interface Chat {
  id: string;
  content: string;
  ownerId: string;
}

export interface Auth {
  username: string;
  password: string;
}

export interface Group {
  groupId: string;
  name: string;
  ownerId: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface ChatRequest {
  chat: Chat | undefined;
  userId: string;
}

export interface GroupRequest {
  chat: Chat | undefined;
  groupId: string;
}

export interface ChatResponse {
  chat: Chat | undefined;
}

export interface GroupResponse {
  chat: Chat | undefined;
}

export interface checkUserRequest {
  id: string;
}

export interface checkUserResponse {
  message: boolean;
}

export const AUTH_V1ALPHA_PACKAGE_NAME = "auth.v1alpha";

export interface AuthServiceClient {
  register(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  checkUser(request: checkUserRequest, metadata?: Metadata): Observable<checkUserResponse>;

  chatWithUser(request: ChatRequest, metadata?: Metadata): Observable<ChatResponse>;

  chatWithGroup(request: GroupRequest, metadata?: Metadata): Observable<GroupResponse>;
}

export interface AuthServiceController {
  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  checkUser(
    request: checkUserRequest,
    metadata?: Metadata,
  ): Promise<checkUserResponse> | Observable<checkUserResponse> | checkUserResponse;

  chatWithUser(
    request: ChatRequest,
    metadata?: Metadata,
  ): Promise<ChatResponse> | Observable<ChatResponse> | ChatResponse;

  chatWithGroup(
    request: GroupRequest,
    metadata?: Metadata,
  ): Promise<GroupResponse> | Observable<GroupResponse> | GroupResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login", "checkUser", "chatWithUser", "chatWithGroup"];
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
