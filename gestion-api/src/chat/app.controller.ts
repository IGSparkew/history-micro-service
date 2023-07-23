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
import {  RpcException } from '@nestjs/microservices';
import { ChatService } from './app.service';
import { AuthCheckService } from 'src/check_auth/app.service';
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

    const isExistUser = this.checkUserService.checkUser(request.userId);

    if(!isExistUser) {
      throw new RpcException('Error user you want to send message does not exist');
    }

    return this.chatService.createChatWithUser(
      request.chat.content,
      request.userId,
      ownerId,
    );
  }

  async findChatWithGroup(
    request: GroupRequest,
    metadata?: Metadata,
  ): Promise<ChatList> {
    if(!request || !request.groupId) {
      throw new RpcException('Error Input not valid');
    }

    const right_auth = await this.checkAuthService.checkTokenApi(metadata);
    
    if (!right_auth) {
      throw new RpcException('Error unauthorized auth!')
    }
    return this.chatService.findChatWithGroup(request.groupId)
  }

  async findChatWithUser(
    request: UserRequest,
    metadata?: Metadata,
  ): Promise<ChatList> {
    if(!request || !request.userId) {
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

    return this.chatService.findChatWithUser(request.userId, ownerId);
  }



}
