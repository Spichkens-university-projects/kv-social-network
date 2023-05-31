import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum Gender {
  MALE,
  FEMALE,
}

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true, _id: true })
export class User {
  @ApiProperty({
    type: String,
    description: 'Почта',
    name: 'email',
    example: 'test@mail.ru',
    required: true,
    uniqueItems: true,
  })
  @Prop({ unique: true, nullable: false })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Пароль',
    name: 'password',
    example: '12345',
    required: true,
  })
  @Prop({ nullable: false })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Имя',
    name: 'name',
    example: 'Саша',
    required: true,
  })
  @Prop({ nullable: false })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Фамилия',
    name: 'surname',
    example: 'Спичка',
    required: true,
  })
  @Prop({ nullable: false })
  surname: string;

  @ApiProperty({
    type: String,
    description: 'Никнейм',
    name: 'username',
    example: '@Spichkens',
    required: true,
    uniqueItems: true,
  })
  @Prop({ unique: true, nullable: false })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Аватар',
    name: 'avatar',
    example: '/upload/avatar.jpg',
    required: false,
  })
  @Prop()
  avatar: string;

  @ApiProperty({
    type: String,
    description: 'Пол',
    name: 'gender',
    example: 'Мужской',
    required: false,
  })
  @Prop()
  gender: Gender;

  @ApiProperty({
    type: String,
    description: 'Фон профиля',
    name: 'profileBackground',
    example: '/uploads/profileBackground.jpg',
    required: false,
  })
  @Prop()
  profileBackground: string;

  @ApiProperty({
    type: [String],
    description: 'Фото',
    name: 'photos',
    example: ['/uploads/photo1.jpg', '/uploads/photo2.jpg'],
    required: false,
  })
  @Prop({ defaultOptions: { default: [] } })
  photos: string[];

  @ApiProperty({
    type: [String],
    description: 'Друзья',
    name: 'friends',
    example: ['644a7aa801f21d93fc7a063c', '644a7aa801f21d93fc7a063c'],
    required: false,
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  friends: User[];

  @ApiProperty({
    type: [String],
    description: 'Подписчики',
    name: 'subscribers',
    example: ['644a7aa801f21d93fc7a063c', '644a7aa801f21d93fc7a063c'],
    required: false,
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  subscribers: User[];

  @ApiProperty({
    type: [String],
    description: 'Подписки',
    name: 'subscriptions',
    example: ['644a7aa801f21d93fc7a063c', '644a7aa801f21d93fc7a063c'],
    required: false,
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  subscriptions: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
