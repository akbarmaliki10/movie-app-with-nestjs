import { CreateUserDto } from "../dto/user.dto";


export class AuthCreatedEvent {
    constructor(public readonly createUserDto: CreateUserDto){};
}