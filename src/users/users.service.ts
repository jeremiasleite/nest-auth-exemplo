import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-userDto';
import { UpdateUserDto } from './dto/update-userDto';
import { CostumeNotFoundException } from 'src/exceptions/notfound.exception';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto).then(e => new User(e));
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const usuario = this.usersRepository.findOne(id).then(e => new User(e));
    if (!(await usuario).id) {
      throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    return usuario
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    if(result.affected==0)
      throw new CostumeNotFoundException("Usuário não encontrado.")
    return {menssage: "User removido."};
  }

  async findOneUserName(username: string): Promise<User> {
    const usuario = this.usersRepository.findOne({ username: username }).then(e => new User(e));
    if (!(await usuario).id) {
      throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    return usuario;
  }

  async update(usuario: UpdateUserDto): Promise<User> {
    const usuarioToUpdate = await this.usersRepository.findOne(usuario.id).then(e => new User(e));
    if (!(await usuarioToUpdate).id) {
      throw new CostumeNotFoundException("Usuário não encontrado.")
    }
    usuarioToUpdate.username = usuario.username
    usuarioToUpdate.email = usuario.email
    usuarioToUpdate.isActive = usuario.isActive

    return this.usersRepository.save(usuarioToUpdate)
  }

}
