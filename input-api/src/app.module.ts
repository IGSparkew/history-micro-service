import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection'
import { grpcConfig } from './grpc.config';
import { AuthController } from './auth/app.controller';
import { AuthService } from './auth/app.service';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthCheckService } from './check_auth/app.service';
import { SendToGestion } from './sendToGestion/app.service';


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
  }), MongooseModule.forRoot(process.env.DATABASE_URL, {
    dbName: 'auth',
  }),
  MongooseModule.forFeature([
    {
      name: Auth.name,
      schema: AuthSchema
    },
  ])],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthCheckService, SendToGestion],
})
export class AppModule { }
