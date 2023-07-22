import { Controller } from '@nestjs/common';
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
import { RpcException } from '@nestjs/microservices';
import { ChatService } from './app.service';

@Controller()
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {
  constructor(private readonly chatService: ChatService) {}

  async createChatWitGroup(
    request: ChatGroupRequest,
    metadata?: Metadata,
  ): Promise<ChatReponse> {
    if (
      !request ||
      !request.groupId ||
      !request.ownerId ||
      !request.chat ||
      !request.chat.content ||
      request.chat.content == ''
    ) {
      throw new RpcException('Error Input not valid');
    }

    return this.chatService.createChatWithGroup(
      request.chat.content,
      request.groupId,
      request.ownerId,
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
