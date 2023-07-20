import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';

@Module({
    providers: [AuthService, PassportModule, LocalStrategy],
    imports: [UsersModule],
    controllers: [AuthController]
})
export class AuthModule {}
