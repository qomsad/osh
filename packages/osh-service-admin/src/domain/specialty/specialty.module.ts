import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Specialty } from "./entity/specialty.entity";
import { SpecialtyController } from "./specialty.controller";
import { SpecialtyService } from "./specialty.service";

@Module({
  imports: [MikroOrmModule.forFeature([Specialty])],
  providers: [SpecialtyService],
  controllers: [SpecialtyController],
})
export class SpecialtyModule {}
