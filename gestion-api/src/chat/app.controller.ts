import { Controller } from "@nestjs/common";
import {
    ChatGroupRequest,
    ChatList,
    ChatReponse,
    ChatServiceController,
    ChatServiceControllerMethods, ChatUserRequest, GroupRequest, UserRequest
} from "../stubs/chat/v1alpha/chat";
import {Metadata} from "@grpc/grpc-js";
import {RpcException} from "@nestjs/microservices";
import {ChatService} from "./app.service";

@Controller()
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController {

    constructor(private readonly chatService:ChatService ) {}

    async createChatWitGroup(request: ChatGroupRequest, metadata?: Metadata): Promise<ChatReponse>  {
        return {
            chat: {
                id: 0,
                content: "test"
            }
        };
    }

    async createChatWithUser(request: ChatUserRequest, metadata?: Metadata): Promise<ChatReponse>  {
        console.log("test");
        if (!request.userId || !request.ownerId) {
            throw new RpcException("Error Input not valid");
        }

        return this.chatService.createChatWithUser(request.chat);

    }

    async findChatWithGroup(request: GroupRequest, metadata?: Metadata): Promise<ChatList>  {
        return {
            chats: []
        }
    }

    async findChatWithUser(request: UserRequest, metadata?: Metadata): Promise<ChatList>  {
        return {
            chats: []
        }
    }

}