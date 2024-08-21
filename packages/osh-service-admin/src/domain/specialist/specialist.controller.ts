import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminRoleGuard } from "../../shared/guard/admin-role.guard";
import { PaginatedDto } from "../../shared/pagination/dto/paginated.dto";
import { SpecialistQueryPageDto } from "./dto/query-specialist.dto";
import { SpecialistCreateDto } from "./dto/specialist-create.dto";
import { SpecialistUpdateDto } from "./dto/specialist-update.dto";
import { SpecialistDto } from "./dto/specialist.dto";
import { SpecialistService } from "./specialist.service";
@ApiTags("Specialist")
@Controller("specialist")
@UseGuards(AdminRoleGuard)
export class SpecialistController {
  constructor(private readonly service: SpecialistService) {}

  @Get()
  public async get(
    @Query() query: SpecialistQueryPageDto,
  ): Promise<PaginatedDto<SpecialistDto>> {
    return this.service.get(query);
  }

  @Get(":id")
  public async getById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<SpecialistDto> {
    return this.service.getById(`${id}`);
  }

  @Post()
  public async create(
    @Body() dto: SpecialistCreateDto,
  ): Promise<SpecialistDto> {
    return this.service.create(dto);
  }

  @Put(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: SpecialistUpdateDto,
  ): Promise<SpecialistDto> {
    return this.service.update(`${id}`, dto);
  }

  @Delete(":id")
  public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(`${id}`);
  }
}
