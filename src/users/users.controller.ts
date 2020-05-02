import { Controller, Get, UseGuards, Post, Body, Param, Delete, Put, ClassSerializerInterceptor, UseInterceptors, UseFilters } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { QueryFailedErrorFilter } from 'src/exceptions/queryFailedError';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UseFilters(new QueryFailedErrorFilter())
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)   
    async findOne(@Param('id') id: number){
        return this.usersService.findOne(id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    async update(@Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: number){
        return this.usersService.remove(id)
    }

}
