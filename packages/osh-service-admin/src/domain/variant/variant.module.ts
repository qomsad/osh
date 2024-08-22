import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ProgramModule } from "../program/program.module";
import { Variant } from "./entity/variant.entity";
import { LearningController } from "./learning/learning.controller";
import { TrainingController } from "./training/training.controller";
import { VariantController } from "./variant.controller";
import { VariantService } from "./variant.service";

@Module({
  imports: [MikroOrmModule.forFeature([Variant]), ProgramModule],
  providers: [VariantService],
  controllers: [VariantController, TrainingController, LearningController],
})
export class VariantModule {}
