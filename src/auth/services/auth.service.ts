import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/user.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { AuthCreatedEvent } from '../events/AuthCreatedEvent';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly eventEmitter: EventEmitter2,
    ) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne(
            {where:{'name':username}}
        );
        if (user == null) {
            return null
        }
        if (user && user.password == password) {
            return user;
        }

        return null;
    }

    async login(user:  any) {
        const payload = { name: user.name, sub: user.id }

        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async createUserService(createUserDto: CreateUserDto) {
        const userNew = this.eventEmitter.emit(
            'user.created',
            new AuthCreatedEvent(createUserDto)
        )
        return createUserDto;
    }

    @OnEvent('user.created')
    async welcomeNewUser(payload: AuthCreatedEvent) {
        this.logger.log("Creating User --- " + payload.createUserDto.name)
        const newUser = this.userRepository.create(payload.createUserDto);
        return this.userRepository.save(newUser).then(u => this.login(u)).catch(err => {
            throw new HttpException({
                message: err.message
            }, HttpStatus.BAD_REQUEST)
        });
    }
}
