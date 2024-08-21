import { Module } from "@nestjs/common";
import { SpecialtyModule } from "./specialty/specialty.module";
import { SpecialistModule } from "./specialist/specialist.module";

@Module({
  imports: [SpecialtyModule, SpecialistModule],
})
export class DomainModule {}
