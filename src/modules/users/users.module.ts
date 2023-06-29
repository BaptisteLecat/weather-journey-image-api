import { Module } from '@nestjs/common';
import { FirebaseProvider } from 'src/providers/firebase.provider';
import { UserConverter } from './converters/user.converter';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { FirebaseAuthService } from 'src/services/firebase.auth.service';

@Module({
  providers: [UserConverter, FirebaseProvider, UsersService, AuthService, FirebaseAuthService],
  controllers: [UsersController],
})
export class UsersModule {}

