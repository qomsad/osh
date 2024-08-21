import { Module } from "@nestjs/common";
import { VariantService } from "./variant.service";
import { VariantController } from "./variant.controller";
import { TrainingController } from "./training/training.controller";
import { LearningController } from "./learning/learning.controller";

@Module({
  providers: [VariantService],
  controllers: [VariantController, TrainingController, LearningController],
})
export class VariantModule {}
