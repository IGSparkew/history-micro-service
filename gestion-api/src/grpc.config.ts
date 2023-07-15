import { GrpcOptions, Transport } from "@nestjs/microservices";
import { addReflectionToGrpcConfig } from "nestjs-grpc-reflection";
import { join } from "path";
import { CHAT_V1ALPHA_PACKAGE_NAME } from "./stubs/chat/v1alpha/chat";

export const grpcConfig =  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: [CHAT_V1ALPHA_PACKAGE_NAME],
      protoPath: [
        join(__dirname, 'proto/chat/v1alpha/chat.proto'),
      ],
    },
  }) as GrpcOptions;