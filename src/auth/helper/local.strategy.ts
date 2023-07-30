import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { User } from "src/users/users.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authServe : AuthService){
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authServe.validateUser(username,password);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}