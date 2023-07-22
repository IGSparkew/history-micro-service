import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { AUTH_V1ALPHA_PACKAGE_NAME } from './stubs/auth/v1alpha/auth';
export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: 'localhost:3000',
    package: AUTH_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/auth/v1alpha/auth.proto'),
  },
}) as GrpcOptions;
