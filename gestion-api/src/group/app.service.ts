import {Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group } from "src/schemas/group.schema";
import { CreateGroupResponse, GetGroupResponse } from "src/stubs/group/v1alpha/group";

@Injectable()
export class GroupService {

    constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

    async create(groupName: string): Promise<CreateGroupResponse> {
        const groupCreated = new this.groupModel({name: groupName});
        const result = await groupCreated.save();
        return {
            groupId:result.group_id,
            name: result.name
        };
    }

    async get(group_id: number): Promise<GetGroupResponse> {
        const getGroup = await this.groupModel.findOne({group_id: group_id});
        if (!getGroup) {
            return undefined;
        }

        return {
            groupId: getGroup.group_id,
            name: getGroup.name
        };
    }

}