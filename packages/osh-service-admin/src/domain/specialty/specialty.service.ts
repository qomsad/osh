import { wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Meta } from "../../shared/embedded/model/meta.embeddable";
import { PaginatedDto } from "../../shared/pagination/dto/paginated.dto";
import { QueryPageDto } from "../../shared/pagination/dto/query-page.dto";
import { requestPage } from "../../shared/pagination/helpers/request-page";
import { SpecialtyCreateDto } from "./dto/specialty-create.dto";
import { SpecialtyUpdateDto } from "./dto/specialty-update.dto";
import { SpecialtyDto } from "./dto/specialty.dto";
import { Specialty } from "./entity/specialty.entity";

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly repository: EntityRepository<Specialty>,
  ) {}

  public async get(query: QueryPageDto): Promise<PaginatedDto<SpecialtyDto>> {
    return await requestPage(this.repository.createQueryBuilder(), query, [
      "name",
    ]);
  }

  public async getById(id: string): Promise<SpecialtyDto> {
    const entity = await this.repository.findOne({ id });
    if (!entity) {
      throw new NotFoundException(
        `Не найдена специальность с идентификатором ${id}`,
      );
    }
    return entity;
  }

  public async create(dto: SpecialtyCreateDto): Promise<SpecialtyDto> {
    const entity = this.repository.create({
      ...dto,
      meta: new Meta(),
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(
    id: string,
    dto: SpecialtyUpdateDto,
  ): Promise<SpecialtyDto> {
    const entity = await this.getById(id);
    wrap(entity).assign(dto);
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(id: string): Promise<void> {
    const entity = await this.getById(id);
    this.repository.getEntityManager().removeAndFlush(entity);
  }
}
