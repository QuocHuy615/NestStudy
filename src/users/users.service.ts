import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>
  ) {}

  getHashPasswoed = ( password: string ) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.getHashPasswoed(createUserDto.password);

    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashedPassword,
      name: createUserDto.name,
    });

    return user;
    console.log(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return {
      message: `This action updates a #${id} user`,
      data: updateUserDto,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
