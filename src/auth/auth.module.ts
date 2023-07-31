import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/modules/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './helper/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './helper/jwt.strategy';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { User } from 'src/users/typeorm/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [AuthService, PassportModule, LocalStrategy, JwtStrategy],
    imports: [UsersModule, JwtModule.register({
        secret: "peaknose secret",
        signOptions: { expiresIn : '60s' }
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }
