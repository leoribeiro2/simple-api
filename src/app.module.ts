import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/simple-api';

@Module({
  imports: [
    MongooseModule.forRoot(mongoURI, { useNewUrlParser: true }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
