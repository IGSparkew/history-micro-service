import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";


export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    owner_id: number;

    @Prop()
    group_id: number | undefined;

    @Prop()
    user_id:number | undefined;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);