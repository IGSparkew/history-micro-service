import { Injectable } from '@nestjs/common';
import {
  ClientGrpc,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_V1ALPHA_PACKAGE_NAME } from 'src/stubs/auth/v1alpha/auth';

@Injectable()
export class CheckUserService {
  private grpcClient: ClientGrpc;

  constructor() {
    this.grpcClient = ClientProxyFactory.create({
      transport: Transport.GRPC,
      options: {
        url: 'localhost:3000',
        package: AUTH_V1ALPHA_PACKAGE_NAME,
        protoPath: join('../proto/auth/v1alpha/auth.proto'),
      },
    });
  }

  async checkUser(userId: string): Promise<boolean> {
    const service = await this.getGrpcService('AuthService');
    const userTocheck = {
      id: userId,
    };
    const response = await service.checkUser(userTocheck).toPromise();
    return response.message;
  }

  private async getGrpcService(nameService: string) {
    return await this.grpcClient.getService<any>(nameService);
  }
}
