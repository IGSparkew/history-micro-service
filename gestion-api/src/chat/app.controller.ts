import { Controller, UseGuards } from '@nestjs/common';
import {
  ChatGroupRequest,
  ChatList,
  ChatReponse,
  ChatServiceController,
  ChatServiceControllerMethods,
  ChatUserRequest,
  GroupRequest,
  UserRequest,
} from '../stubs/chat/v1alpha/chat';
import { Metadata } from '@grpc/grpc-js';
import { ClientGrpc, ClientProxyFactory, RpcException, Transport } from '@nestjs/microservices';
import { ChatService } from './app.service';
import { AuthCheckService } from 'src/check_auth/app.service';
import { join } from 'path';
import { AUTH_V1ALPHA_PACKAGE_NAME } from 'src/stubs/auth/v1alpha/auth';
import { CheckUserService } from 'src/check_user/app.service';


@Controller()
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {

  constructor(private readonly chatService: ChatService, private checkAuthService: AuthCheckService, private checkUserService: CheckUserService) {
  }

  async createChatWitGroup(
    request: ChatGroupRequest,
    metadata?: Metadata,
  ): Promise<ChatReponse> {
    if (
      !request ||
      !request.groupId ||
      !request.chat ||
      !request.chat.content ||
      request.chat.content == ''
    ) {
      throw new RpcException('Error Input not valid');
    }

    const right_auth = await this.checkAuthService.checkTokenApi(metadata);
    if (!right_auth) {
      throw new RpcException('Error unauthorized auth!')
    }
    
    const ownerId = await this.checkAuthService.getUserId(metadata);
    const isOwner = this.checkUserService.checkUser(ownerId);

    if(!isOwner) {
      throw new RpcException('Error not valid user');
    }

    return this.chatService.createChatWithGroup(
      request.chat.content,
      request.groupId,
      ownerId,
    );

  }

  async createChatWithUser(
    request: ChatUserRequest,
    metadata?: Metadata,
  ): Promise<ChatReponse> {
    if (
      !request ||
      !request.userId ||
      !request.ownerId ||
      !request.chat ||
      !request.chat.content ||
      request.chat.content == ''
    ) {
      throw new RpcException('Error Input not valid');
    }

    return this.chatService.createChatWithUser(
      request.chat.content,
      request.userId,
      request.ownerId,
    );
  }

  async findChatWithGroup(
    request: GroupRequest,
    metadata?: Metadata,
  ): Promise<ChatList> {
    if(!request || !request.groupId || !request.ownerId) {
      throw new RpcException('Error Input not valid');
    }


    return this.chatService.findChatWithGroup(request.groupId)
  }

  async findChatWithUser(
    request: UserRequest,
    metadata?: Metadata,
  ): Promise<ChatList> {
    return {
      chats: [],
    };
  }



}
