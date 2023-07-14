import { GrpcOptions, Transport } from "@nestjs/microservices";
import { addReflectionToGrpcConfig } from "nestjs-grpc-reflection";
import { join } from "path";

export const grpcConfig =  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:3000',
      package: ['chat'],
      protoPath: [
        join(__dirname, 'proto/chat/v1alpha/chat.proto'),
      ],
    },
  }) as GrpcOptions;