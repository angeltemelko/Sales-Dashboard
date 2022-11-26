import { RoleDto } from "./RoleDto";

export interface UserDto {
  id?: number;
  email: string;
  password: string;
}

export interface LoginUserDto extends UserDto {}

export interface LoggedInUserDto {
  first_name: string;
  last_name: string;
  id?: number;
  email: string;
  role?: RoleDto;
}

export interface RegisterUserDto extends UserDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmed: string;
  role: RoleDto;
}
