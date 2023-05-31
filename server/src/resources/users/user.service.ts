import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SELECT_PARAMS,
  USER_EXCLUDING_FIELDS,
  USER_PATHS_FOR_EXCLUDING_FIELDS,
} from '../../config/populate.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getAll(
    page: number,
    limit: number,
    searchTerm: string,
    excludeUserId: string,
  ): Promise<User[]> {
    const regex = new RegExp(searchTerm, 'i');
    return await this.userModel
      .find({
        _id: { $nin: excludeUserId },
        $or: [
          { name: { $regex: regex } },
          { surname: { $regex: regex } },
          { username: { $regex: regex } },
        ],
      })
      .select(USER_EXCLUDING_FIELDS)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async getCurrentUser(id: string): Promise<User> {
    const foundUser = await this.userModel
      .findById(id)
      .select(SELECT_PARAMS)
      .lean()
      .exec();
    if (!foundUser) throw new NotFoundException(`Пользователь ${id} не найден`);
    return foundUser;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<User> {
    const foundUser = await this.userModel
      .findById(id)
      .select(SELECT_PARAMS)
      .populate({
        path: USER_PATHS_FOR_EXCLUDING_FIELDS,
        select: USER_EXCLUDING_FIELDS,
      })
      .lean()
      .exec();
    if (!foundUser) throw new NotFoundException(`Пользователь ${id} не найден`);
    return foundUser;
  }

  async findByUsername(username: string): Promise<User> {
    const foundUser = await this.userModel
      .findOne({ username })
      .select(SELECT_PARAMS)
      .populate({ path: 'friends', select: USER_EXCLUDING_FIELDS })
      .lean()
      .exec();
    if (!foundUser)
      throw new NotFoundException(`Пользователь ${username} не найден`);
    return foundUser;
  }

  async checkPropBusiness(prop: string): Promise<User> {
    return await this.userModel.findOne({ prop }).lean().exec();
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    currentUserId: string,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(currentUserId, updateUserDto, { new: true })
      .lean()
      .exec();

    if (updateUserDto.profileBackground)
      updatedUser.photos.unshift(updateUserDto.profileBackground);

    if (updateUserDto.avatar) updatedUser.photos.unshift(updateUserDto.avatar);

    if (!updatedUser)
      throw new NotFoundException(`Ошибка обновления пользователя`);
    return updatedUser;
  }

  async saveNewUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async addPhoto(photo: string, currentUserId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(
        currentUserId,
        { $push: { photos: photo } },
        { new: true },
      )
      .lean()
      .exec();
    return user;
  }
}
