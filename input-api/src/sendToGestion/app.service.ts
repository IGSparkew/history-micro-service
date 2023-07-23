import { Metadata } from '@grpc/grpc-js';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import {
  ClientGrpc,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { ChatRequest, ChatResponse, GroupRequest, GroupResponse } from 'src/stubs/auth/v1alpha/auth';
import { CHAT_V1ALPHA_PACKAGE_NAME } from 'src/stubs/chat/v1alpha/chat';
import { GROUP_V1ALPHA_PACKAGE_NAME } from 'src/stubs/group/v1alpha/group';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SendToGestion {
  private grpcClient: ClientGrpc;

  constructor(private jwtService: JwtService) {
    this.grpcClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5000',
        package: [CHAT_V1ALPHA_PACKAGE_NAME, GROUP_V1ALPHA_PACKAGE_NAME],
        protoPath: [
          join(__dirname, '../proto/chat/v1alpha/chat.proto'),
          join(__dirname, '../proto/group/v1alpha/group.proto'),

        ],
      },
    });
  }

  async sendToChat(data: ChatRequest, sendMetadata: Metadata): Promise<ChatResponse> {
    const service = await this.getGrpcService('ChatService');
    const metadata = await this.generateToken(sendMetadata);
    const response = await service.CreateChatWithUser(data, metadata).toPromise();
    return response;
  }

  async sendToGroup(data: GroupRequest, sendMetadata: Metadata): Promise<GroupResponse> {
    const service = await this.getGrpcService('ChatService');
    const metadata = await this.generateToken(sendMetadata);
    const response = await service.CreateChatWitGroup(data, metadata).toPromise();
    return response;
  }

  private async getGrpcService(nameService: string) {
    return await this.grpcClient.getService<any>(nameService);
  }

  getToken(metadata: Metadata): string {
    const header = metadata.get('authorization')[0];
    const token: string = header.slice(header.indexOf(' ') + 1) as string;
    if (!token) {
      throw new UnauthorizedException();
    }
    return token;
  }

  private async generateToken(sendMetadata: Metadata) {
    const token = this.getToken(sendMetadata);
    const sendPayload: any = await this.jwtService.decode(token);
    const payload = { api: process.env.TOKEN_API, user_id: sendPayload.sub }
    const metadata = new Metadata()
    metadata.add('authorization', 'Bearer ' + await this.jwtService.signAsync(payload))
    return metadata
  }
}
