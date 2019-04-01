import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoDatabase = process.env.MONGO_DATABASE || 'simple-api';
const options: any = {
  useNewUrlParser: true,
  createIndexes: true,
};

if (process.env.NODE_ENV === 'production') {
  options.auth = {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
  };
}

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`, options),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
