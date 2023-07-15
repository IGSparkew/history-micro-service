import {Injectable} from "@nestjs/common";
import {Chat, ChatReponse} from "../stubs/chat/v1alpha/chat";

@Injectable()
export class ChatService {

    async createChatWithUser(chat: Chat): Promise<ChatReponse> {
        return {
            chat: chat
        };
    }
}