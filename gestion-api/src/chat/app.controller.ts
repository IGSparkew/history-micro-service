import { Controller } from "@nestjs/common";
import {
    ChatGroupRequest,
    ChatList,
    ChatReponse,
    ChatServiceController,
    ChatServiceControllerMethods, ChatUserRequest, GroupRequest, UserRequest
} from "../stubs/chat/v1alpha/chat";
import {Metadata} from "@grpc/grpc-js";
import {Observable} from "rxjs";

@Controller()
@ChatServiceControllerMethods()
export class ChatController implements ChatServiceController{

    createChatWitGroup(request: ChatGroupRequest, metadata?: Metadata): Promise<ChatReponse> | Observable<ChatReponse> | ChatReponse {
        return undefined;
    }

    createChatWithUser(request: ChatUserRequest, metadata?: Metadata): Promise<ChatReponse> | Observable<ChatReponse> | ChatReponse {
        return undefined;
    }

    findChatWithGroup(request: GroupRequest, metadata?: Metadata): Promise<ChatList> | Observable<ChatList> | ChatList {
        return undefined;
    }

    findChatWithUser(request: UserRequest, metadata?: Metadata): Promise<ChatList> | Observable<ChatList> | ChatList {
        return undefined;
    }

}