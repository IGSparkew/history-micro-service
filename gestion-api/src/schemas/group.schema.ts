import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {

    @Prop({ default: () => Math.floor(Math.random() * 1000), unique: true, min: 0, required: true })
    group_id: number;

    @Prop({required: true})
    name: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);