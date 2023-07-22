import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { grpcConfig } from './grpc.config';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import {ChatController} from "./chat/app.controller";
import {ChatService} from "./chat/app.service";
import { GroupController } from './group/app.controller';
import { GroupService } from './group/app.service';
import { Group, GroupSchema } from './schemas/group.schema';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthCheckService } from './check_auth/app.service';
import { CheckUserService } from './check_user/app.service';


@Module({
  imports: [GrpcReflectionModule.register(grpcConfig),
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET_KEY}` ,
      signOptions: { expiresIn: '120s'}
    }),
    ConfigModule.forRoot({
    envFilePath: '.env.local',
    isGlobal: true,
  }), 
  MongooseModule.forRoot(process.env.DATABASE_URL, {
    dbName: 'chat'
  }),
  MongooseModule.forFeature([
    {
      name:Group.name,
      schema: GroupSchema
    },
    {
      name: Chat.name,
      schema: ChatSchema
    }
  ])],
  controllers: [AppController, ChatController, GroupController],
  providers: [AppService, ChatService, GroupService, AuthCheckService, CheckUserService],
})
export class AppModule {}
