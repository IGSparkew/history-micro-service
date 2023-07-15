import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { grpcConfig } from './grpc.config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import {ChatController} from "./chat/app.controller";
import {ChatService} from "./chat/app.service";


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }), 
  MongooseModule.forRoot(process.env.DATABASE_URL), 
  GrpcReflectionModule.register(grpcConfig)],
  controllers: [AppController, ChatController],
  providers: [AppService, ChatService],
})
export class AppModule {}
