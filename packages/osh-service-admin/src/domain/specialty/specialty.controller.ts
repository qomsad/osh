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
import { QueryPageDto } from "../../shared/pagination/dto/query-page.dto";
import { SpecialtyCreateDto } from "./dto/specialty-create.dto";
import { SpecialtyUpdateDto } from "./dto/specialty-update.dto";
import { SpecialtyDto } from "./dto/specialty.dto";
import { SpecialtyService } from "./specialty.service";

@ApiTags("Specialty")
@Controller("specialty")
@UseGuards(AdminRoleGuard)
export class SpecialtyController {
  constructor(private readonly service: SpecialtyService) {}

  @Get()
  public async get(
    @Query() query: QueryPageDto,
  ): Promise<PaginatedDto<SpecialtyDto>> {
    return this.service.get(query);
  }

  @Get(":id")
  public async getById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<SpecialtyDto> {
    return this.service.getById(`${id}`);
  }

  @Post()
  public async create(@Body() dto: SpecialtyCreateDto): Promise<SpecialtyDto> {
    return this.service.create(dto);
  }

  @Put(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: SpecialtyUpdateDto,
  ): Promise<SpecialtyDto> {
    return this.service.update(`${id}`, dto);
  }

  @Delete(":id")
  public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(`${id}`);
  }
}
