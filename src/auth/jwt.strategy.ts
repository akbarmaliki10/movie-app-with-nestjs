import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            secretOrKey: "peaknose secret", //should be from env var
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload : any){
        return {
            id: payload.sub,
            name: payload.name
        }
    }
}