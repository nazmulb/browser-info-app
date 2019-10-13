import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class BrowserInfo {
	@PrimaryGeneratedColumn()
	@ApiModelProperty()
	id: number;

	@Column({ nullable: true })
	@ApiModelProperty()
	userAgent: string;

	@Column({ nullable: true })
	@ApiModelProperty()
	osType: string;

	@Column({ nullable: true })
	@ApiModelProperty()
	browserType: string;

	@Column({ nullable: true })
	@ApiModelProperty()
	browserVersion: string;

	@Column({ nullable: true })
	@ApiModelProperty()
	acceptLanguage: string;

	@Column({ nullable: true })
	@ApiModelProperty()
	ipAddresses: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	@ApiModelProperty()
	createdAt: string;
}
