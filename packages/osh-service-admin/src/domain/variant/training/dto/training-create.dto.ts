import { OmitType } from "@nestjs/swagger";
import { TrainingDto } from "./training.dto";

export class TrainingCreateDto extends OmitType(TrainingDto, ["id"]) {}
