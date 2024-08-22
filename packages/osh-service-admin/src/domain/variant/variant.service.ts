import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, wrap } from "@mikro-orm/postgresql";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Meta } from "../../shared/embedded/model/meta.embeddable";
import { PaginatedDto } from "../../shared/pagination/dto/paginated.dto";
import { requestPage } from "../../shared/pagination/helpers/request-page";
import { ProgramService } from "../program/program.service";
import { VariantQueryPageDto } from "./dto/query-variant.dto";
import { VariantCreateDto } from "./dto/variant-create.dto";
import { VariantDto } from "./dto/variant.dto";
import { Variant } from "./entity/variant.entity";

@Injectable()
export class VariantService {
  constructor(
    @InjectRepository(Variant)
    private readonly repository: EntityRepository<Variant>,
    private readonly programService: ProgramService,
  ) {}

  public async get(
    query: VariantQueryPageDto,
  ): Promise<PaginatedDto<VariantDto>> {
    const qb = this.repository.createQueryBuilder();

    if (query.programId) {
      qb.andWhere({ program: { id: query.programId } });
    }
    return await requestPage(qb, query, ["name"]);
  }

  public async getObject(id: string): Promise<Variant> {
    const entity = await this.repository.findOne({ id });
    if (!entity) {
      throw new NotFoundException(`Не найден вариант с идентификатором ${id}`);
    }
    return entity;
  }

  public async getById(id: string): Promise<VariantDto> {
    return this.getObject(id);
  }

  public async create(dto: VariantCreateDto): Promise<VariantDto> {
    const { programId, ...variant } = dto;
    const program = await this.programService.getObject(programId);

    const entity = this.repository.create({
      ...variant,
      program,
      meta: new Meta(),
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(id: string, dto: VariantCreateDto): Promise<VariantDto> {
    const entity = await this.getObject(id);
    const { programId, ...variant } = dto;
    const program = await this.programService.getObject(programId);

    wrap(entity).assign({ ...variant, program });

    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(id: string): Promise<void> {
    const entity = await this.getObject(id);
    this.repository.getEntityManager().removeAndFlush(entity);
  }
}
