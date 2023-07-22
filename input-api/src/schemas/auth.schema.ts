import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";


export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    token: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);