import { Module } from "@nestjs/common";
import { SpecialistModule } from "./specialist/specialist.module";
import { SpecialtyModule } from "./specialty/specialty.module";
import { VariantModule } from "./variant/variant.module";
import { ProgramModule } from "./program/program.module";

@Module({
  imports: [SpecialtyModule, SpecialistModule, VariantModule, ProgramModule],
})
export class DomainModule {}
