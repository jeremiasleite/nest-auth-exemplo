import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/update-userDto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User>{
    return this.usersRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOneUserName(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({username: username});
  }

  async update(usuario: UpdateUserDto): Promise<User> {
    const usuarioToUpdate = await this.usersRepository.findOne(usuario.id).then(e => new User(e));
    if( !(await usuarioToUpdate).id){
        //throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    usuarioToUpdate.username = usuario.username
    usuarioToUpdate.email = usuario.email
    usuarioToUpdate.isActive = usuario.isActive
     
    return this.usersRepository.save(usuarioToUpdate)
}

}
