import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository, wrap } from "@mikro-orm/postgresql";
import { NotFoundException } from "@nestjs/common";
import { Meta } from "../../shared/embedded/model/meta.embeddable";
import { PaginatedDto } from "../../shared/pagination/dto/paginated.dto";
import { QueryPageDto } from "../../shared/pagination/dto/query-page.dto";
import { requestPage } from "../../shared/pagination/helpers/request-page";
import { SpecialtyService } from "../specialty/specialty.service";
import { SpecialistCreateDto } from "./dto/specialist-create.dto";
import { SpecialistUpdateDto } from "./dto/specialist-update.dto";
import { SpecialistDto } from "./dto/specialist.dto";
import { Specialist } from "./entity/specialist.entity";

export class SpecialistService {
  constructor(
    @InjectRepository(Specialist)
    private readonly repository: EntityRepository<Specialist>,
    private readonly specialtyService: SpecialtyService,
  ) {}

  public async get(query: QueryPageDto): Promise<PaginatedDto<SpecialistDto>> {
    return await requestPage(this.repository.createQueryBuilder(), query, [
      "serviceNumber",
      "firstName",
      "lastName",
      "middleName",
    ]);
  }

  public async getObject(id: string): Promise<Specialist> {
    const entity = await this.repository.findOne({ id });
    if (!entity) {
      throw new NotFoundException(
        `Не найден специалист с идентификатором ${id}`,
      );
    }
    return entity;
  }

  public async getById(id: string): Promise<SpecialistDto> {
    return this.getObject(id);
  }

  public async create(dto: SpecialistCreateDto): Promise<SpecialistDto> {
    const { specialtyId, ...specialist } = dto;
    const specialty = await this.specialtyService.getObject(specialtyId);
    const entity = this.repository.create({
      ...specialist,
      specialty,
      meta: new Meta(),
    });
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async update(
    id: string,
    dto: SpecialistUpdateDto,
  ): Promise<SpecialistDto> {
    const entity = await this.getObject(id);
    const { specialtyId, ...specialist } = dto;
    wrap(entity).assign(specialist);
    if (specialtyId) {
      const specialty = await this.specialtyService.getObject(specialtyId);
      wrap(entity).assign({ specialty });
    }
    await this.repository.getEntityManager().flush();
    return entity;
  }

  public async delete(id: string): Promise<void> {
    const entity = await this.getObject(id);
    this.repository.getEntityManager().removeAndFlush(entity);
  }
}
