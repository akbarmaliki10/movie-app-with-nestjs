import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    providers: [AuthService, PassportModule, LocalStrategy, JwtStrategy],
    imports: [UsersModule, JwtModule.register({
        secret: "peaknose secret",
        signOptions: { expiresIn : '60s' }
    })],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
