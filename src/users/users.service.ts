import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

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

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return "not found user";
    
    return this.userModel.findOne({
      _id: id,
    })
   
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id: id}, { ...updateUserDto});
  }

  remove(id: string) {
    return this.userModel.deleteOne({_id: id})
  }
}
