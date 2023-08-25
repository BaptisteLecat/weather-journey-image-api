import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  styles?: string;
  frequencies?: string;

  public constructor(id: string, firstname: string, lastname: string, email: string, styles?: string, frequencies?: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.styles = styles;
    this.frequencies = frequencies;
  }

  static fromFirestoreDocument(id: any, data: any): User {
    return new User(id, data.firstname, data.lastname, data.email, data.styles, data.frequencies);
  }

  static fromJson(data: any): User {
    return new User(data.id, data.firstname, data.lastname, data.email, data.styles, data.frequencies);
  }

  toFirestoreDocument(): any {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      styles: this.styles,
      frequencies: this.frequencies,
    };
  }

  toJson(): any {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      styles: this.styles,
      frequencies: this.frequencies,
    };
  }
}
