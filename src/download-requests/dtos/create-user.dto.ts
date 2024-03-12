import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsEmail({}, { message: 'Email is not valid' } )
  readonly email: string;

  readonly company: string;

  @IsNotEmpty({ message: 'Please enter your country' })
  readonly country: string;

  readonly interests?: string;

  readonly newsletter?: boolean;
}
