import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { LocalAuthGuard } from "./local.auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UserCustomDecorator } from "./user.decorator";
import { User } from "src/users/users.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() request): any {
        return this.authService.login(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Request() req): string {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('getName')
    async findOne(@UserCustomDecorator() user: User) {
        return user;
    }
}