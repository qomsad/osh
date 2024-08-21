import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { SpecialtyModule } from "../specialty/specialty.module";
import { Specialist } from "./entity/specialist.entity";
import { SpecialistController } from "./specialist.controller";
import { SpecialistService } from "./specialist.service";

@Module({
  imports: [MikroOrmModule.forFeature([Specialist]), SpecialtyModule],
  controllers: [SpecialistController],
  providers: [SpecialistService],
})
export class SpecialistModule {}
