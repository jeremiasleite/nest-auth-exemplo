
export class UpdateUserDto{
    readonly id: number;
    readonly email?: string;
    readonly username?: string;
    readonly isActive?: boolean;
}