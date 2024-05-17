import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthCredentials {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    @Length(8, 50)
    readonly password: string

}
