import {Injectable} from "@nestjs/common";
import {ChatList, ChatReponse} from "../stubs/chat/v1alpha/chat";
import { InjectModel } from "@nestjs/mongoose";
import { Chat  } from "src/schemas/chat.schema";
import { Model } from "mongoose";
import { GroupService } from "src/group/app.service";

@Injectable()
export class ChatService {

    constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>, private groupService: GroupService) {}

    async createChatWithUser(content: string, userId: string, ownerId: string): Promise<ChatReponse> {
        const createdChatWithUser = new this.chatModel({
            content: content,
            user_id: userId,
            owner_id: ownerId
        });
        const response = await createdChatWithUser.save();
        return {
            chat: {
                id: response.id,
                content: response.content,
                ownerId: response.owner_id
            }
        };
    }

    async createChatWithGroup(content: string, groupId: string, ownerId: string): Promise<ChatReponse> {
        const createdChatWithGroup = new this.chatModel({
            content: content,
            group_id: groupId,
            owner_id: ownerId
        });

        if (!this.groupService.get(groupId)) {
            return undefined;
        }

        const response = await createdChatWithGroup.save();
        return {
            chat: {
                id: response.id,
                content: response.content,
                ownerId: response.owner_id
            }
        };
    }

    async findChatWithGroup(groupId: string): Promise<ChatList> {
        const chatsFinded = await this.chatModel.find({group_id: groupId});
        const response = []
        if (!chatsFinded || chatsFinded.length == 0) {
            return {
                chats: response
            }
        }

        for(let chatFind of chatsFinded) {
            response.push({
                id: chatFind.id,
                content: chatFind.content,
                owner_id: chatFind.owner_id
            })
        }

        return {
            chats: response
        }
    }

    async findChatWithUser(userId: string, owner_id: string): Promise<ChatList> {
        const response = [];
        // owner send to user 
        const chatsFinded = await this.chatModel.find({user_id: userId, owner_id: owner_id});
        // user resonse 
        chatsFinded.concat(await this.chatModel.find({user_id: owner_id, owner_id: userId}));
        
        if (!chatsFinded || chatsFinded.length == 0) {
            return {
                chats: response
            }
        }

        chatsFinded.sort(this.comparerPerDate);

        for(let chatFind of chatsFinded) {
            response.push({
                id: chatFind.id,
                content: chatFind.content,
                owner_id: chatFind.owner_id
            })
        }

        return {
            chats: response
        }
    }

    private comparerPerDate(first: Chat, second: Chat): number {
        return first.createdAt.getTime() - second.createdAt.getTime();
    }
}