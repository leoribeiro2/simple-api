import { Injectable, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.inteface';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async signUp(body: SignUpDto): Promise<User> {
        const user = new this.userModel(body);
        try {
            const userSalved = await user.save();
            userSalved.senha = undefined;
            return userSalved;
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException({
                    erro: 'E-mail já existente',
                }, HttpStatus.BAD_REQUEST);
            } else {
                throw new InternalServerErrorException('Ocorreu um erro ao registrar o usuário');
            }
        }
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userModel.findById(id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }

    async validatePass(user: User, pass: string) {
        return user.validatePass(pass);
    }
}
