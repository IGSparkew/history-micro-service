/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "group.v1alpha";

export interface Empty {
}

export interface CreateGroupRequest {
  name: string;
}

export interface CreateGroupResponse {
  groupId: string;
  name: string;
}

export interface GetGroupRequest {
  groupId: string;
}

export interface GetGroupResponse {
  groupId: string;
  name: string;
}

export interface GetAllGroupsResponse {
  groups: GetGroupResponse[];
}

export const GROUP_V1ALPHA_PACKAGE_NAME = "group.v1alpha";

export interface GroupServiceClient {
  createGroup(request: CreateGroupRequest, metadata?: Metadata): Observable<CreateGroupResponse>;

  findGroup(request: GetGroupRequest, metadata?: Metadata): Observable<GetGroupResponse>;

  findAllGroup(request: Empty, metadata?: Metadata): Observable<GetAllGroupsResponse>;
}

export interface GroupServiceController {
  createGroup(
    request: CreateGroupRequest,
    metadata?: Metadata,
  ): Promise<CreateGroupResponse> | Observable<CreateGroupResponse> | CreateGroupResponse;

  findGroup(
    request: GetGroupRequest,
    metadata?: Metadata,
  ): Promise<GetGroupResponse> | Observable<GetGroupResponse> | GetGroupResponse;

  findAllGroup(
    request: Empty,
    metadata?: Metadata,
  ): Promise<GetAllGroupsResponse> | Observable<GetAllGroupsResponse> | GetAllGroupsResponse;
}

export function GroupServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createGroup", "findGroup", "findAllGroup"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("GroupService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("GroupService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const GROUP_SERVICE_NAME = "GroupService";
