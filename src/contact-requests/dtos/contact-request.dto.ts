import { IsEmail, IsNotEmpty } from "class-validator";

export class NewContactDto {
    @IsNotEmpty({ message: 'Please enter your name' })
    readonly name: string;

    readonly subject?: string;

    @IsEmail({ validationOptions: { message: "Email is not valid" } })
    readonly email: string;

    @IsNotEmpty({ message: 'Please enter a message' })
    readonly message: string;
}