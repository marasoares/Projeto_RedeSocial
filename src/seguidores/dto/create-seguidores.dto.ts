/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSeguidoresDto {
    @IsNotEmpty()
    @IsInt()
    idSeguidor: number;

    @IsNotEmpty()
    @IsInt()
    usuarioid: number;
}
