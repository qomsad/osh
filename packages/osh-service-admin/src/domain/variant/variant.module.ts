import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ProgramModule } from "../program/program.module";
import { Variant } from "./entity/variant.entity";
import { Learning } from "./learning/entity/learning.entity";
import { LearningController } from "./learning/learning.controller";
import { LearningService } from "./learning/learning.service";
import { Training } from "./training/entity/training.entity";
import { TrainingController } from "./training/training.controller";
import { TrainingService } from "./training/training.service";
import { VariantController } from "./variant.controller";
import { VariantService } from "./variant.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([Variant, Learning, Training]),
    ProgramModule,
  ],
  providers: [VariantService, LearningService, TrainingService],
  controllers: [VariantController, TrainingController, LearningController],
})
export class VariantModule {}
