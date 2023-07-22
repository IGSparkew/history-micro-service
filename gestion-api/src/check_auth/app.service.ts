import { Metadata } from "@grpc/grpc-js";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthCheckService {
    constructor(private jwtService: JwtService) {}

    async checkTokenApi(metadata: Metadata) {
          try {
            const token = this.getToken(metadata);
            const payload: any = await this.jwtService.decode(token);
            const isMatch = await bcrypt.compare(process.env.TOKEN_API, payload.api);
            if (!isMatch) {
              throw new UnauthorizedException();
            }
          } catch (err) {
            return false;
          }
      
          return true;
    }

    async getUserId(metadata: Metadata): Promise<string> {
        try {
            const token = this.getToken(metadata);
            const payload: any = await this.jwtService.decode(token);
            if (!payload || !payload.api || !payload.user_id) {
                throw new UnauthorizedException();
            }

            return payload.user_id;
        } catch(err) {
            return undefined;
        }
    }

    private getToken(metadata: Metadata): string {
        const header = metadata.get('authorization')[0];
        const token: string = header.slice(header.indexOf(' ') + 1) as string;
        if (!token) {
            throw new UnauthorizedException();
        }
        return token;
    }

}