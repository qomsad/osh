import { Module } from "@nestjs/common";
import { SpecialtyModule } from "./specialty/specialty.module";

@Module({
  imports: [SpecialtyModule],
})
export class DomainModule {}
