import { Inject, Injectable } from '@nestjs/common';
import { FirebaseProvider } from '../../providers/firebase.provider';
import { UserConverter } from './converters/user.converter';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { StylesService } from '../styles/styles.service';

@Injectable()
export class UsersService {
  static readonly collection: string = 'users';
  constructor(@Inject(FirebaseProvider) private readonly firestoreProvider: FirebaseProvider, private userConverter: UserConverter, @Inject(StylesService) private readonly stylesService: StylesService) { }

  async findAll(): Promise<User[]> {
    const users = await this.firestoreProvider.getFirestore().collection(UsersService.collection).withConverter(this.userConverter).get();
    return users.docs.map(user => this.userConverter.fromFirestore(user));
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.firestoreProvider.getFirestore().collection(UsersService.collection).doc(id).withConverter(this.userConverter).get();
    if (!user.exists) {
      return undefined;
    }
    let userObject = this.userConverter.fromFirestoreDocumentSnapshot(user);
    // Object style in user only contains id, so we need to fetch the styles from the styles collection.
    if (user.data().styles != undefined && user.data().styles.length === 0) {
      const styles = await this.stylesService.findAll(user.data().styles.map(style => style.id));
      userObject.styles = styles;
    }
    return userObject;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto.id, createUserDto.firstname, createUserDto.lastname, createUserDto.email);
    const userRef = await this.firestoreProvider.getFirestore().collection(UsersService.collection).doc(user.id).withConverter(this.userConverter).set(user);
    return user;
  }
}
