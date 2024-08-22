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
import { TrainingCreateDto } from "./dto/training-create.dto";
import { TrainingDto } from "./dto/training.dto";
import { TrainingService } from "./training.service";

@ApiTags("VariantTraining")
@Controller("variant/:variantId/training")
@UseGuards(AdminRoleGuard)
export class TrainingController {
  constructor(private readonly service: TrainingService) {}

  @Get()
  public async get(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Query() query: QueryPageDto,
  ): Promise<PaginatedDto<TrainingDto>> {
    return await this.service.get(`${variantId}`, query);
  }

  @Get(":id")
  public async getById(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Param("id", ParseIntPipe) id: number,
  ): Promise<TrainingDto> {
    return await this.service.getById(`${variantId}`, `${id}`);
  }

  @Post()
  public async create(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Body() dto: TrainingCreateDto,
  ): Promise<TrainingDto> {
    return await this.service.create(`${variantId}`, dto);
  }

  @Put(":id")
  public async update(
    @Param("variantId", ParseIntPipe) variantId: number,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: TrainingCreateDto,
  ): Promise<TrainingDto> {
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
