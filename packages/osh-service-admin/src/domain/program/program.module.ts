import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { SpecialtyModule } from "../specialty/specialty.module";
import { Variant } from "../variant/entity/variant.entity";
import { Program } from "./entity/program.entity";
import { ProgramController } from "./program.controller";
import { ProgramService } from "./program.service";

@Module({
  imports: [
    MikroOrmModule.forFeature([Program]),
    MikroOrmModule.forFeature([Variant]),
    SpecialtyModule,
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
