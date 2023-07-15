import {Injectable} from "@nestjs/common";
import {ChatReponse} from "../stubs/chat/v1alpha/chat";
import { InjectModel } from "@nestjs/mongoose";
import { Chat  } from "src/schemas/chat.schema";
import { Model } from "mongoose";

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

    async createChatWithUser(content: string, userId: number, ownerId: number): Promise<ChatReponse> {
        const createdChatWithUser = new this.chatModel({
            content: content,
            user_id: userId,
            owner_id: ownerId
        });
        const response = await createdChatWithUser.save();
        return {
            chat: {
                id: response.id,
                content: response.content
            }
        };
    }

    async createChatWithGroup(content: string, groupId: number, ownerId: number): Promise<ChatReponse> {
        const createdChatWithGroup = new this.chatModel({
            content: content,
            group_id: groupId,
            owner_id: ownerId
        });
        const response = await createdChatWithGroup.save();
        return {
            chat: {
                id: response.id,
                content: response.content
            }
        };
    }
}