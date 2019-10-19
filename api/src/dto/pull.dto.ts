import { ApiModelProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class PullDto {
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    browserType: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    osType: string;

    @IsString()
    @IsNotEmpty()
    @ApiModelProperty()
    browserVersion: string;
}
