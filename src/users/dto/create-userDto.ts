import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    username: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}