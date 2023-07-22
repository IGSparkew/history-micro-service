import { Controller } from "@nestjs/common";
import { GroupServiceControllerMethods, GroupServiceController, CreateGroupRequest, CreateGroupResponse, GetGroupRequest, GetGroupResponse, Empty, GetAllGroupsResponse } from "../stubs/group/v1alpha/group";
import { Metadata } from "@grpc/grpc-js";
import { GroupService } from "./app.service";
import { RpcException } from "@nestjs/microservices";
import { group } from "console";
import { Observable } from "rxjs";

@Controller()
@GroupServiceControllerMethods()
export class GroupController implements GroupServiceController {

    constructor(private readonly groupService:GroupService) {}


    findAllGroup(request: Empty, metadata?: Metadata): Promise<GetAllGroupsResponse> {
        return this.groupService.findAll()
    }

    async createGroup(request: CreateGroupRequest,metadata?: Metadata): Promise<CreateGroupResponse> {
        if (!request || !request.name ||request.name == "") {
            throw new RpcException("Error on input name");
        }
        return await this.groupService.create(request.name);
      }
    
    async findGroup(request: GetGroupRequest,metadata?: Metadata): Promise<GetGroupResponse>{
        if(!request || !request.groupId) {
            throw new RpcException("Error on input group_id");
        }
        const groupFounded = await this.groupService.get(request.groupId);
        if (groupFounded == undefined) {
            throw new RpcException("Error no group found");
        }
        return groupFounded;
      }
}