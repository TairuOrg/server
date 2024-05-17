import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthCredentials {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string

}
