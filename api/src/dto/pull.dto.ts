import { IsString, IsNotEmpty } from "class-validator";

export class PullDto {
    @IsString()
    @IsNotEmpty()
    browserType: string;

    @IsString()
    @IsNotEmpty()
    osType: string;

    @IsString()
    @IsNotEmpty()
    browserVersion: string;
}
