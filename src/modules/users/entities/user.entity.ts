import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;

  public constructor(id: string, firstname: string, lastname: string, email: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  static fromFirestoreDocument(id: any, data: any): User {
    return new User(id, data.firstname, data.lastname, data.email);
  }

  static fromJson(data: any): User {
    return new User(data.id, data.firstname, data.lastname, data.email);
  }

  toFirestoreDocument(): any {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    };
  }

  toJson(): any {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
    };
  }
}
