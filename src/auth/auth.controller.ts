import { Controller, Post, UseGuards, Request } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./local.auth.guard";

@Controller()
export class AuthController {
    constructor(private readonly userService : UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() request): any {
        return request.user;
    }
}