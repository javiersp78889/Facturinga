import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { LoginModule } from 'src/login/login.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule,CloudinaryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
