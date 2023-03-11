import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { rabbitmqWrapper } from 'src/wrapper/rabbitmq-wrapper';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import * as http from 'http';
import { User, UserDocument } from './schemas/user.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './events/usersCreate.event';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const avatar = await this.getAvatar(createUserDto.id);
    const userData = new this.userModel(createUserDto);
    userData.avatars.push(avatar);
    await this.userModel.create(userData);

    await this.downloadFile(avatar, `files/${avatar}.png`);


    rabbitmqWrapper.channel.sendToQueue(
      process.env.RABBITMQ_QUEUE_NAME,
      Buffer.from(
        JSON.stringify({
          ...createUserDto,
          date: new Date(),
        }),
      ),
    );
    return;
  }

  async findOne(id: number): Promise<any> {
    const user = await this.userModel.findById(id);
    const avatar = await this.getAvatar(id);
    return { user: user, avatar: avatar };
  }

  async downloadFile(url: string, filename: string) {
    const file = fs.createWriteStream(filename);
    await http.get(url, function (response) {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('Download Completed');
      });
    });
  }

  async getAvatar(userId: number): Promise<any> {
    const res = await fetch(`https://reqres.in/api/users/${userId}`);
    if (res.ok) {
      const data = await res.json();
      return data.avatar;
    }
    return null;
  }

  async findByAvatar(id: number, avatar: string): Promise<string> {
    const avatars = (await this.userModel.findById(id)).avatars;

    const avatarData = avatars.find((item) => {
      return item.avatar_hash === avatar;
    });

    try {
      return fs.readFileSync(`files/${avatarData.avatar_hash}.png`, 'base64');
    } catch (err) {
      return null;
    }
  }

  async remove(id: number, avatar: string): Promise<any> {
    const user = await this.userModel.findById(id);

    const avatars = user.avatars.filter(function (item) {
      return item.avatar_url != avatar;
    });
    await this.userModel.updateOne({ id: id }, { avatars: avatars });
    fs.unlink(`files/${avatar}.png`, (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });
  }
}
