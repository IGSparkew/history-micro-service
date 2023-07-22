import { Controller } from '@nestjs/common';
import {
  GroupServiceControllerMethods,
  GroupServiceController,
  CreateGroupRequest,
  CreateGroupResponse,
  GetGroupRequest,
  GetGroupResponse,
  Empty,
  GetAllGroupsResponse,
} from '../stubs/group/v1alpha/group';
import { Metadata } from '@grpc/grpc-js';
import { GroupService } from './app.service';
import { RpcException } from '@nestjs/microservices';
import { group } from 'console';
import { Observable } from 'rxjs';
import { AuthCheckService } from 'src/check_auth/app.service';

@Controller()
@GroupServiceControllerMethods()
export class GroupController implements GroupServiceController {
  constructor(
    private readonly groupService: GroupService,
    private readonly checkAuthService: AuthCheckService,
  ) {}

  async findAllGroup(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GetAllGroupsResponse> {
    const right_auth = await this.checkAuthService.checkTokenApi(metadata);

    if (!right_auth) {
      throw new RpcException('Error unauthorized auth!');
    }

    return this.groupService.findAll();
  }

  async createGroup(
    request: CreateGroupRequest,
    metadata?: Metadata,
  ): Promise<CreateGroupResponse> {
    if (!request || !request.name || request.name == '') {
      throw new RpcException('Error on input name');
    }

    const right_auth = await this.checkAuthService.checkTokenApi(metadata);

    if (!right_auth) {
      throw new RpcException('Error unauthorized auth!');
    }

    return await this.groupService.create(request.name);
  }

  async findGroup(
    request: GetGroupRequest,
    metadata?: Metadata,
  ): Promise<GetGroupResponse> {
    if (!request || !request.groupId) {
      throw new RpcException('Error on input group_id');
    }

    const right_auth = await this.checkAuthService.checkTokenApi(metadata);

    if (!right_auth) {
      throw new RpcException('Error unauthorized auth!');
    }

    const groupFounded = await this.groupService.get(request.groupId);

    if (groupFounded == undefined) {
      throw new RpcException('Error no group found');
    }
    return groupFounded;
  }
}
