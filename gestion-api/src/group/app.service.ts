import {Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group } from "src/schemas/group.schema";
import { CreateGroupResponse, GetAllGroupsResponse, GetGroupResponse } from "src/stubs/group/v1alpha/group";

@Injectable()
export class GroupService {

    constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

    async create(groupName: string): Promise<CreateGroupResponse> {
        console.log(groupName)
        const groupCreated = new this.groupModel({name: groupName});
        const result = await groupCreated.save();
        return {
            groupId:result.id,
            name: result.name
        };
    }

    async get(group_id: string): Promise<GetGroupResponse> {
        const getGroup = await this.groupModel.findById(group_id);
        if (!getGroup) {
            return undefined;
        }

        return {
            groupId: getGroup.id,
            name: getGroup.name
        };
    }

    async findAll(): Promise<GetAllGroupsResponse> {
        const getGroups = await this.groupModel.find({});
        if (!getGroups || getGroups.length <= 0) {
            return undefined;
        }
        
        const responses: GetGroupResponse[] = [];
        for(let grp of getGroups) {
            responses.push({groupId: grp.id, name: grp.name})
        }

        return {
            groups: responses
        }
        
    }

}