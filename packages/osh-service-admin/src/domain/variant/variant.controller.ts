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
import { VariantQueryPageDto } from "./dto/query-variant.dto";
import { VariantCreateDto } from "./dto/variant-create.dto";
import { VariantDto } from "./dto/variant.dto";
import { VariantService } from "./variant.service";

@ApiTags("Variant")
@Controller("variant")
@UseGuards(AdminRoleGuard)
export class VariantController {
  constructor(private readonly service: VariantService) {}

  @Get()
  public async get(
    @Query() query: VariantQueryPageDto,
  ): Promise<PaginatedDto<VariantDto>> {
    return this.service.get(query);
  }

  @Get(":id")
  public async getById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<VariantDto> {
    return this.service.getById(`${id}`);
  }

  @Post()
  public async create(@Body() dto: VariantCreateDto): Promise<VariantDto> {
    return this.service.create(dto);
  }

  @Put(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: VariantCreateDto,
  ): Promise<VariantDto> {
    return this.service.update(`${id}`, dto);
  }

  @Delete(":id")
  public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(`${id}`);
  }
}
