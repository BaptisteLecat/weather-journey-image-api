import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  style?: string;

  public constructor(id: string, firstname: string, lastname: string, email: string, style?: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.style = style;
  }

  static fromFirestoreDocument(id: any, data: any): User {
    return new User(id, data.firstname, data.lastname, data.email, data.style);
  }

  static fromJson(data: any): User {
    return new User(data.id, data.firstname, data.lastname, data.email, data.style);
  }

  toFirestoreDocument(): any {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      style: this.style,
    };
  }

  toJson(): any {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      style: this.style,
    };
  }
}
