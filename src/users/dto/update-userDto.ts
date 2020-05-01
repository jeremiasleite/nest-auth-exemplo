import { IsNumber, IsNotEmpty, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class UpdateUserDto{

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsEmail()
    @IsOptional()
    readonly email?: string;

    @IsNotEmpty()
    @IsOptional()
    readonly username?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsBoolean()
    readonly isActive?: boolean;
}