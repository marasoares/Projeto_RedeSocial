/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSeguindoDto {
  @IsNotEmpty()
  @IsInt()
  idSeguindo: number;

  @IsNotEmpty()
  @IsInt()
  usuarioid: number;
}
