import { Controller, Get, UseGuards, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/update-userDto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }

    @Put()
    @UseGuards(JwtAuthGuard)
    async update(@Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string){
        return this.usersService.remove(id)
    }

}
