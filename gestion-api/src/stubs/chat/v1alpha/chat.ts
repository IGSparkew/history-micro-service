/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "chat.v1alpha";

export interface Chat {
  id: string;
  content: string;
  ownerId: string;
}

export interface ChatUserRequest {
  chat: Chat | undefined;
  userId: string;
}

export interface ChatGroupRequest {
  chat: Chat | undefined;
  groupId: string;
}

export interface ChatReponse {
  chat: Chat | undefined;
}

export interface UserRequest {
  userId: string;
}

export interface GroupRequest {
  groupId: string;
}

export interface ChatList {
  chats: Chat[];
}

export const CHAT_V1ALPHA_PACKAGE_NAME = "chat.v1alpha";

export interface ChatServiceClient {
  createChatWithUser(request: ChatUserRequest, metadata?: Metadata): Observable<ChatReponse>;

  createChatWitGroup(request: ChatGroupRequest, metadata?: Metadata): Observable<ChatReponse>;

  findChatWithUser(request: UserRequest, metadata?: Metadata): Observable<ChatList>;

  findChatWithGroup(request: GroupRequest, metadata?: Metadata): Observable<ChatList>;
}

export interface ChatServiceController {
  createChatWithUser(
    request: ChatUserRequest,
    metadata?: Metadata,
  ): Promise<ChatReponse> | Observable<ChatReponse> | ChatReponse;

  createChatWitGroup(
    request: ChatGroupRequest,
    metadata?: Metadata,
  ): Promise<ChatReponse> | Observable<ChatReponse> | ChatReponse;

  findChatWithUser(request: UserRequest, metadata?: Metadata): Promise<ChatList> | Observable<ChatList> | ChatList;

  findChatWithGroup(request: GroupRequest, metadata?: Metadata): Promise<ChatList> | Observable<ChatList> | ChatList;
}

export function ChatServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createChatWithUser", "createChatWitGroup", "findChatWithUser", "findChatWithGroup"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ChatService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ChatService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CHAT_SERVICE_NAME = "ChatService";
