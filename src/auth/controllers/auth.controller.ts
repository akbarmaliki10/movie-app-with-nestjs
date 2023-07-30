import { Controller, Post, UseGuards, Request, Get, Body } from "@nestjs/common";
import { LocalAuthGuard } from "../guards/local.auth.guard";
import { AuthService } from "../services/auth.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { UserCustomDecorator } from "../helper/user.decorator";
import { CreateUserDto } from "../dto/user.dto";

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
    async findOne(@UserCustomDecorator() user: CreateUserDto) {
        return user;
    }

    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return this.authService.createUserService(createUserDto);
    }
}