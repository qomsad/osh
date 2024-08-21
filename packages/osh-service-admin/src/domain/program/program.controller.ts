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
import { ProgramCreateDto } from "./dto/program-create.dto";
import { ProgramDto } from "./dto/program.dto";
import { ProgramQueryPageDto } from "./dto/query-program.dto";
import { ProgramService } from "./program.service";

@ApiTags("Program")
@Controller("program")
@UseGuards(AdminRoleGuard)
export class ProgramController {
  constructor(private readonly service: ProgramService) {}

  @Get()
  public async get(
    @Query() query: ProgramQueryPageDto,
  ): Promise<PaginatedDto<ProgramDto>> {
    return this.service.get(query);
  }

  @Get(":id")
  public async getById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<ProgramDto> {
    return this.service.getById(`${id}`);
  }

  @Post()
  public async create(@Body() dto: ProgramCreateDto): Promise<ProgramDto> {
    return this.service.create(dto);
  }

  @Put(":id")
  public async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: ProgramCreateDto,
  ): Promise<ProgramDto> {
    return this.service.update(`${id}`, dto);
  }

  @Delete(":id")
  public async delete(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.delete(`${id}`);
  }
}
