import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: "Name is required" })
    readonly name: string;

    @IsEmail({ validationOptions: { message: "Email is not valid" } })
    email: string;

    readonly company: string;

    @IsNotEmpty({ message: 'Please enter your country' })
    readonly country: string;

    readonly interests: string;

    readonly newsletter: boolean;
}