import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {now, HydratedDocument } from "mongoose";
import { Group } from "./group.schema";


export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    owner_id: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Group'})
    group_id: Group;

    @Prop()
    user_id:string | undefined;

    @Prop({default: now()})
    createdAt:Date
}   

export const ChatSchema = SchemaFactory.createForClass(Chat);