import { IsString, IsInt, Min, Max, Length, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

//En Dto för att kontrollera/validerar inmatningar med post och i en partial class för put
//Denna är viktig för att data som lagras är av correkt typ eller längd enligt specifikationen nedan
//Denna klass använde Class-validator och vilkoren används även för att hjälpa min felhantering.

export class CreateDiscDto {

    @IsString()
    @Length(1, 200)
    @IsNotEmpty()
    bookId: string;

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    heading: string;

    @IsString()
    @Length(5, 10000)
    @IsNotEmpty()
    about: string;

    @IsInt()
    @IsNotEmpty()
    @Min(1) 
    @Max(5) 
    score: number;

    @IsInt()
    @IsOptional()
    likes: number;

    @IsInt()
    @IsOptional()
    views: number;

}
