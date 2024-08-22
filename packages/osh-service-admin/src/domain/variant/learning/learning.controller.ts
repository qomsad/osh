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
import { AdminRoleGuard } from "../../../shared/guard/admin-role.guard";
import { PaginatedDto } from "../../../shared/pagination/dto/paginated.dto";
import { QueryPageDto } from "../../../shared/pagination/dto/query-page.dto";
import { LearningCreateDto } from "./dto/learning-create.dto";
import { LearningDto } from "./dto/learning.dto";
import { LearningService } from "./learning.service";

@ApiTags("VariantLearning")
@Controller("variant/:variantId/learning")
@UseGuards(AdminRoleGuard)
export class LearningController {
  constructor(private readonly service: LearningService) {}

  @Get()
  public async get(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Query() query: QueryPageDto,
  ): Promise<PaginatedDto<LearningDto>> {
    return await this.service.get(`${variantId}`, query);
  }

  @Get(":id")
  public async getById(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<LearningDto> {
    return await this.service.getById(`${variantId}`, `${id}`);
  }

  @Post()
  public async create(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Body() dto: LearningCreateDto,
  ): Promise<LearningDto> {
    return await this.service.create(`${variantId}`, dto);
  }

  @Put(":id")
  public async update(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: LearningCreateDto,
  ): Promise<LearningDto> {
    return await this.service.update(`${variantId}`, `${id}`, dto);
  }

  @Delete(":id")
  public async delete(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<void> {
    return await this.service.delete(`${variantId}`, `${id}`);
  }
}
