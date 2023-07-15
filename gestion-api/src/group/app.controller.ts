import { Controller } from "@nestjs/common";
import { GroupServiceControllerMethods, GroupServiceController, CreateGroupRequest, CreateGroupResponse, GetGroupRequest, GetGroupResponse } from "../stubs/group/v1alpha/group";
import { Metadata } from "@grpc/grpc-js";
import { GroupService } from "./app.service";

@Controller()
@GroupServiceControllerMethods()
export class GroupController implements GroupServiceController {

    constructor(private readonly groupService:GroupService) {}

    async createGroup(request: CreateGroupRequest,metadata?: Metadata): Promise<CreateGroupResponse> {
        return {
            groupId: 0,
            name: "test"
        };
      }
    
    async findGroup(request: GetGroupRequest,metadata?: Metadata): Promise<GetGroupResponse>{
        return undefined;
      }
}