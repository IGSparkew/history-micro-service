import { GrpcOptions, Transport } from "@nestjs/microservices";
import { addReflectionToGrpcConfig } from "nestjs-grpc-reflection";
import { join } from "path";
import { CHAT_V1ALPHA_PACKAGE_NAME } from "./stubs/chat/v1alpha/chat";
import { GROUP_V1ALPHA_PACKAGE_NAME } from "./stubs/group/v1alpha/group";

export const grpcConfig =  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: [CHAT_V1ALPHA_PACKAGE_NAME, GROUP_V1ALPHA_PACKAGE_NAME],
      protoPath: [
        join(__dirname, 'proto/chat/v1alpha/chat.proto'),
        join(__dirname, 'proto/group/v1alpha/group.proto'),

      ],
    },
  }) as GrpcOptions;